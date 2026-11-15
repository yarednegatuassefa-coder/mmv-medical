import test from 'node:test';
import assert from 'node:assert/strict';
import { csvCell, serializeCsv } from '../src/lib/csv-safety.js';

test('neutralizes spreadsheet formula prefixes, including leading whitespace and controls', () => {
  for (const value of ['=1+1', '+SUM(A1:A2)', '@SUM(A1)', '-1+1', ' \t=cmd']) {
    assert.equal(csvCell(value), "'" + value);
  }
});

test('preserves ordinary text and numeric values', () => {
  assert.equal(csvCell('Patient enquiry'), 'Patient enquiry');
  assert.equal(csvCell(-125.5), '-125.5');
  assert.equal(csvCell('0'), '0');
  assert.equal(csvCell(null), '');
});

test('quotes cells and escapes embedded quotes, commas, and newlines', () => {
  assert.equal(
    serializeCsv([['Name', 'Notes'], ['A, B', 'Said "hello"\nnext']]),
    '"Name","Notes"\n"A, B","Said ""hello""\nnext"'
  );
});
