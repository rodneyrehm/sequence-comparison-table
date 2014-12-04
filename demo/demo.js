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

  var source = document.getElementById('source');
  function getSourceData() {
    try {
      return JSON.parse(source.value);
    } catch(e) {
      alert('Invalid JSON!\n' + e.message);
      return;
    }
  }

  function updateTable() {
    var sourceData = getSourceData();
    var table = sequenceTable(sourceData);
    document.body.replaceChild(table, document.getElementById('table'));
  }

  var sourceData = getSourceData();
  var table = sequenceTable(sourceData, {
    // [optional] define order of columns (defaults to Object.keys(sourceData))
    columns: ['expected', 'first', 'second', 'third'],
    // [optional] define the columns' readable names (defaults to keys of sourceData)
    columnNames: {
      first: 'first list',
      second: 'second list',
      third: 'third list',
    },
    // [optional] group columns
    columnGroups: {
      // expand empty group to "expected" data set
      '': ['', 'expected'],
      // single column group
      'group 1': ['first'],
      // multi column group
      'group 2': ['second', 'third'],
    },
    // [optional] callback to mutate generated table-cell
    cell: function(td, options) {
      var expected = options.indexes.expected[options.sequenceIndex] !== null;
      var exists = options.dataIndex !== null;
      td.setAttribute('data-expected', expected === exists ? 'yes' : 'no');
    },
  });

  table.id = 'table';
  document.body.replaceChild(table, document.getElementById('table'));
  document.getElementById('update').addEventListener('click', updateTable);

});