import { billingConfig } from './config.js';

// Synthetic fixtures only. These are not customer records or real invoices.
export const invoices = Object.freeze([
  Object.freeze({ id: 'SAMPLE-001', customer: 'Fictional Acme', amountUsd: 120 }),
  Object.freeze({ id: 'SAMPLE-002', customer: 'Fictional Orbit', amountUsd: 80 }),
]);

export function exportInvoices(config = billingConfig) {
  if (!config.invoiceExportEnabled) {
    return { status: 403, contentType: 'application/json', body: JSON.stringify({ error: 'Invoice export is disabled' }) };
  }
  return {
    status: 200,
    contentType: 'text/csv',
    body: ['id,customer,amount_usd', ...invoices.map(({ id, customer, amountUsd }) => `${id},${customer},${amountUsd}`)].join('\n') + '\n',
  };
}
