/*globals document */
define(function defineSequenceTableBody(require) {
  'use strict';

  var sequenceTableBody = require('./sequence-table-body');

  function sequenceTable(data, options) {
    var columnOrder = options && options.columns || Object.keys(data);
      /*jshint laxbreak: true */
    var columnCallback = typeof options.columnNames === 'function' && options.columnNames || function(th, key) {
      th.textContent = options.columnNames[key] || key;
    };

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
      th.setAttribute('data-key', key);
      row.appendChild(th);
      columnCallback(th, key);
    });

    return table;
  }

  return sequenceTable;
});