import { createServer } from 'node:http';
import { billingConfig } from './src/billing/config.js';
import { exportInvoices, invoices } from './src/billing/invoices.js';

const server = createServer((req, res) => {
  if (req.method !== 'GET') {
    res.writeHead(405, { Allow: 'GET' }).end();
    return;
  }
  const route = new URL(req.url, 'http://localhost').pathname;
  if (route === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify({ ok: true, sampleApp: true }));
  } else if (route === '/api/invoices/export') {
    const result = exportInvoices();
    res.writeHead(result.status, { 'Content-Type': result.contentType }).end(result.body);
  } else if (route === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>YC Review Sample App</title>
      <h1>YC Review Sample App</h1><p>Fictional billing data. No payments or production deployments.</p>
      <h2>Sample invoices</h2><ul>${invoices.map(i => `<li>${i.id}: ${i.customer}, $${i.amountUsd}</li>`).join('')}</ul>
      <p>Invoice CSV export: <strong>${billingConfig.invoiceExportEnabled ? 'enabled' : 'disabled'}</strong>.</p>
      <a href="/api/invoices/export">Try invoice export</a></html>`);
  } else {
    res.writeHead(404).end('Not found');
  }
});

// Local-only sample, deliberately not an externally deployed billing service.
server.listen(3000, '127.0.0.1', () => console.log('Sample app: http://127.0.0.1:3000'));
