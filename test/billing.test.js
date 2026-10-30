import test from 'node:test';
import assert from 'node:assert/strict';
import { exportInvoices, invoices } from '../src/billing/invoices.js';

test('disabled export does not disclose invoice fixtures', () => {
  const result = exportInvoices({ invoiceExportEnabled: false });
  assert.equal(result.status, 403);
  assert.equal(JSON.parse(result.body).error, 'Invoice export is disabled');
  assert.ok(!result.body.includes(invoices[0].customer));
});

test('enabled export returns all synthetic invoices as CSV', () => {
  const result = exportInvoices({ invoiceExportEnabled: true });
  assert.equal(result.status, 200);
  assert.equal(result.contentType, 'text/csv');
  assert.deepEqual(result.body.trim().split('\n'), [
    'id,customer,amount_usd',
    'SAMPLE-001,Fictional Acme,120',
    'SAMPLE-002,Fictional Orbit,80',
  ]);
});
