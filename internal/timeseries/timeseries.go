package timeseries

import (
	"errors"
	"sync"

	"github.com/vinceanalytics/vince/internal/encoding"
	"github.com/vinceanalytics/vince/internal/location"
	"github.com/vinceanalytics/vince/internal/models"
	"github.com/vinceanalytics/vince/internal/shards"
	"github.com/vinceanalytics/vince/internal/util/oracle"
	xt "github.com/vinceanalytics/vince/internal/util/translation"
	"github.com/vinceanalytics/vince/internal/util/trie"
)

type Timeseries struct {
	db *shards.DB
	lo *location.Location
	ba *batch

	trie struct {
		sync.RWMutex
		tr *trie.Trie
	}
}

func New(db *shards.DB, lo *location.Location) *Timeseries {
	ts := &Timeseries{db: db, lo: lo}
	ts.trie.tr = trie.NewTrie(oracle.DataPath)
	tr := newTranslation(db.Get(), ts.trie.tr.Put)
	tr.onAssign = func(key []byte, uid uint64) {
		ts.trie.Lock()
		ts.trie.tr.Put(key, uid)
		ts.trie.Unlock()
	}
	ts.ba = newbatch(db, tr)
	return ts
}

var _ xt.Translator = (*Timeseries)(nil)

func (ts *Timeseries) Translate(field models.Field, value []byte) uint64 {
	ts.trie.RLock()
	defer ts.trie.RUnlock()
	return ts.trie.tr.Get(encoding.TranslateKey(field, value))
}

func (ts *Timeseries) Get() *shards.DB {
	return ts.db
}

func (ts *Timeseries) Location() *location.Location {
	return ts.lo
}

// Close releases resources and removes buffers used.
func (ts *Timeseries) Close() error {
	return errors.Join(
		ts.ba.translate.Release(),
		ts.trie.tr.Release(),
	)
}

// Save persist all buffered events into pebble key value store. This method is
// not safe for cocunrrent use. It is intended to be called in the same goroutine
// that calls (*Timeseries)Add.
//
// The goal is to ensure almost lock free ingestion path ( with exception of
// translation with uses RWMutex)
func (ts *Timeseries) Save() error {
	return ts.ba.save()
}

// Add process m and batches it. It must be called in the same goroutine as
// (*Timeseries)Save
//
// When we reach a shard boundary, existing batch will be saved before adding m.
// m []byte fields must not be modified because we use reference during  translation
// A safe usage is to release m imediately after calling this method and reset it
// by calling
//
//	*m = models.Model{}
func (ts *Timeseries) Add(m *models.Model) error {
	return ts.ba.add(m)
}