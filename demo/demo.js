require.config({
  paths: {
    // since there are no dependencies,
    // no paths need to be mapped
  }
});

require([
  '../src/sequence-table'
], function (sequenceTable) {
  'use strict';

  var sourceData = {
    expected: ['alpha', 'bravo', 'charlie', 'delta'],
    first: ['alpha', 'charlie', 'delta'],
    second: ['bravo', 'charlie', 'delta', 'echo'],
    third: ['alpha', 'alpha', 'charlie', 'alpha', 'delta'],
  };

  var table = sequenceTable(sourceData, {
    // same options as sequenceTableBody() and:
    columnNames: {
      expected: 'expected',
      first: 'first list',
      second: 'second list',
      third: 'third list',
    },
    // manually define order of columns (defaults to Object.keys(sourceData))
    columns: ['expected', 'first', 'second', 'third'],
    // callback to mutate generated table-cell
    cell: function(td, options) {
      var expected = options.indexes.expected[options.sequenceIndex] !== null;
      var exists = options.dataIndex !== null;
      td.setAttribute('data-expected', expected === exists ? 'yes' : 'no');
    },
  });

  document.body.replaceChild(table, document.getElementById('table'));
  document.getElementById('source').textContent = JSON.stringify(sourceData, null, 2);

});