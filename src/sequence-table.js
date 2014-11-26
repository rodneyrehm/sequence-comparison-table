/*globals document */
define(function defineSequenceTableBody(require) {
  'use strict';

  var sequenceTableBody = require('./sequence-table-body');

  function sequenceTable(data, options) {
    var columnOrder = options && options.columns || Object.keys(data);
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    table.appendChild(thead);
    var tbody = sequenceTableBody(data, options);
    table.appendChild(tbody);
    var row = document.createElement('tr');
    thead.appendChild(row);

    columnOrder.unshift('');
    columnOrder.forEach(function(key) {
      var th = document.createElement('th');
      th.textContent = options.columnNames[key] || key;
      th.setAttribute('data-key', key);
      row.appendChild(th);
    });

    return table;
  }

  return sequenceTable;
});