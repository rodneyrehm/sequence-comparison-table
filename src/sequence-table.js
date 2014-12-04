/*globals document */
define(function defineSequenceTableBody(require) {
  'use strict';

  var sequenceTableBody = require('./sequence-table-body');

  function addColumnGroups(row, data) {
    var groups = Object.keys(data);
    groups.unshift('');
    groups.forEach(function(key) {
      var colspan = data[key] && data[key].length || 1;
      var previous = row.children[row.children.length -1];
      if (previous && previous.textContent === key) {
        previous.colSpan += colspan;
        return;
      }

      var th = document.createElement('th');
      th.textContent = key;
      th.colSpan = colspan;
      row.appendChild(th);
    });
  }

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

    if (options.columnGroups) {
      addColumnGroups(row, options.columnGroups);
      row = document.createElement('tr');
      thead.appendChild(row);
    }

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