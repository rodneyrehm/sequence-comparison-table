# Sequence Comparison Table

Tools to help making sense of sequences. I use this for visualizing the sequence of events across browsers, amongst other things.

```js
// input sequence data
var sourceData = {
  first: ['alpha', 'charlie', 'delta'],
  second: ['bravo', 'charlie', 'delta', 'echo'],
  third: ['alpha', 'alpha', 'charlie', 'alpha', 'delta'],
};

// work through the sequences
var mapSequences = require('./map-sequences');
var mapped = mapSequences(sourceData);

// resulting data structure
mapped === {
  // merged sequence (maintaining order, dealing with duplicates)
  sequence: ['alpha', 'bravo', 'alpha', 'charlie', 'alpha', 'delta', 'echo'],
  // mapping input data indexes:
  // indexInSourceData === table.indexes[indexInTableRows]
  indexes: {
    first: [0, null, null, 1, null, 2, null],
    second: [null, null, 0, 1, null, 2, 3],
    third: [0, 1, null, 2, 3, 4, null],
  }
};

// translate sequences to a <tbody>
var sequenceTableBody = require('./sequence-table-body');
var tbody = sequenceTableBody(sourceData, {
  // manually define order of columns (defaults to Object.keys(sourceData))
  columns: ['first', 'second', 'third'],
  // callback to mutate generated table-cell
  cell: function(td, options) {
    // options
    //  .sequence        === mapped.sequence
    //  .indexes         === mapped.indexes
    //  .sequenceIndex   current index of mapped.sequence
    //  .sequenceItem    === mapped.sequence[ options.sequenceIndex ]
    //  .data            === sourceData
    //  .dataIndex       current index of sourceData[ options.dataKey ]
    //  .dataKey         current index of sourceData

    // the sequenceItem maps to the sourceData in the following way:
    // options.sequenceItem === (options.data[ options.dataKey ][ options.dataIndex ] || null)
  },
  // callback to mutate generated table-row
  row: function(tr, options) {
    // options
    //  .sequence        === mapped.sequence
    //  .indexes         === mapped.indexes
    //  .sequenceIndex   current index of mapped.sequence
    //  .sequenceItem    === mapped.sequence[ options.sequenceIndex ]
    //  .data            === sourceData
    //  .columns         === [
    //    options.indexes.first[ options.sequenceIndex ],
    //    options.indexes.second[ options.sequenceIndex ],
    //    options.indexes.third[ options.sequenceIndex ]
    //  ]
  },
});

// translate sequences to a <table>
var sequenceTable = require('./sequence-table');
var table = sequenceTable(sourceData, {
  // same options as sequenceTableBody() and:
  columnNames: {
    first: 'some',
    second: 'more',
    third: 'data',
  }
});
```

## Changelog

### 0.1.0 (November 26th 2014) ###

* initial release


## License

sequence-comparison-table.js is published under the [MIT License](http://opensource.org/licenses/mit-license).