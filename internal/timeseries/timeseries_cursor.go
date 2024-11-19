package timeseries

import (
	"bytes"
	"encoding/binary"
	"math"

	"github.com/cockroachdb/pebble"
	"github.com/gernest/roaring"
	"github.com/vinceanalytics/vince/internal/encoding"
	"github.com/vinceanalytics/vince/internal/models"
	"github.com/vinceanalytics/vince/internal/ro2"
	"github.com/vinceanalytics/vince/internal/util/assert"
)

type Cursor struct {
	it     *pebble.Iterator
	lo, hi encoding.Key
}

func (cu *Cursor) Release() {
	*cu = Cursor{}
}

func (cu *Cursor) SetIter(it *pebble.Iterator) {
	cu.it = it
}

func (cu *Cursor) Reset(field models.Field) bool {
	cu.lo.Reset()
	cu.hi.Reset()
	cu.lo.Write(field, 0)
	cu.hi.Write(field, math.MaxUint64)
	return cu.it.SeekGE(cu.lo[:]) && cu.Valid()
}

func (cu *Cursor) Valid() bool {
	return cu.it.Valid() &&
		bytes.Compare(cu.it.Key(), cu.hi[:]) == -1
}

func (cu *Cursor) Next() bool {
	return cu.it.Next() && cu.Valid()
}

func (cu *Cursor) Value() (uint64, *roaring.Container) {
	key := cu.it.Key()
	return binary.BigEndian.Uint64(key[len(key)-8:]), ro2.DecodeContainer(cu.it.Value())
}

func (cu *Cursor) BitLen() uint64 {
	return cu.Max() / ShardWidth
}

func (cu *Cursor) Max() uint64 {
	if !cu.it.SeekLT(cu.hi[:]) {
		return 0
	}
	key := cu.it.Key()
	if bytes.Compare(key, cu.lo[:]) == -1 {
		return 0
	}
	ck := binary.BigEndian.Uint64(key[len(key)-8:])
	value := ro2.LastValue(cu.it.Value())
	return uint64((ck << 16) | uint64(value))
}

func (cu *Cursor) ApplyFilter(key uint64, filter roaring.BitmapFilter) (err error) {
	if !cu.Seek(key) {
		return
	}
	var minKey roaring.FilterKey

	for ; cu.Valid(); cu.it.Next() {
		dk := cu.it.Key()
		ckey := binary.BigEndian.Uint64(dk[len(dk)-8:])
		key := roaring.FilterKey(ckey)
		if key < minKey {
			continue
		}
		// Because ne never delete, we are sure that no empty container is ever
		// stored. We pass 1 as cardinality to signal that there is bits ina container.
		//
		// Filters only use this to check for empty containers.
		res := filter.ConsiderKey(key, 1)
		if res.Err != nil {
			return res.Err
		}
		if res.YesKey <= key && res.NoKey <= key {
			data := ro2.DecodeContainer(cu.it.Value())
			res = filter.ConsiderData(key, data)
			if res.Err != nil {
				return res.Err
			}
		}
		minKey = res.NoKey
		if minKey > key+1 {
			if !cu.Seek(uint64(minKey)) {
				return nil
			}
		}
	}
	return nil

}

func (cu *Cursor) Seek(key uint64) bool {
	ls := cu.lo[:]
	binary.BigEndian.PutUint64(ls[len(ls)-8:], key)
	return cu.it.SeekGE(ls) && cu.Valid()
}

func (cu *Cursor) OffsetRange(offset, start, endx uint64) *roaring.Bitmap {
	assert.True(lowbits(offset) == 0)
	assert.True(lowbits(start) == 0)
	assert.True(lowbits(endx) == 0)

	other := roaring.NewSliceBitmap()
	off := highbits(offset)
	hi0, hi1 := highbits(start), highbits(endx)
	if !cu.Seek(hi0) {
		return other
	}
	for ; cu.Valid(); cu.it.Next() {
		key := cu.it.Key()
		ckey := binary.BigEndian.Uint64(key[len(key)-8:])
		if ckey >= hi1 {
			break
		}
		other.Containers.Put(off+(ckey-hi0), ro2.DecodeContainer(cu.it.Value()).Clone())
	}
	return other

}

func highbits(v uint64) uint64 { return v >> 16 }
func lowbits(v uint64) uint16  { return uint16(v & 0xFFFF) }