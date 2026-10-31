# YC Review sample app

A small fictional billing application for evaluating Permission Protocol using real GitHub changes and, once connected, real approval requests and signed receipts.

**Setup is not complete.** The repository must be connected to the isolated YC Review workspace, a repository-scoped `PP_API_KEY` configured, and GitHub protection verified before this is a working end-to-end evaluation. A workflow file alone does not prove enforcement. Do not transfer the existing permission-protocol organization installation to the reviewer workspace.

## Run locally

Requires Node.js 24 (matching the setup environment and CI). No dependencies, payment credentials, or external services are needed.

```sh
npm test
npm start
```

Open http://127.0.0.1:3000. Invoice records and dollar amounts are invented fixtures. The app binds to localhost, has no production deployment, and makes no payment calls. It is not production-ready billing software.

## Review scenario

The proposed change enables CSV export for the fictional invoices by changing `src/billing/config.js`. Tests should pass for either setting: passing tests do not grant authority to change protected behavior.

Once setup is verified, the reviewer should see the real request in the YC Review workspace, inspect the exact change and its policy context, authorize or deny it, then inspect the resulting signed evidence. Approval concerns only this sample repository; it does not move money or deploy a real service. Normal platform signer requirements still apply.

## Gate configuration

- `.permission-protocol.yml` identifies protected billing, workflow, and policy files.
- The gate workflow pins `permission-protocol/deploy-gate` to `ec9549dd67d09b85c67b247d8d418a7093dd4c4d`, the upstream main revision verified by Test run 40588912673. The moving `v2` tag still has a GitHub expression-length packaging defect. The pinned client fails closed without a valid repository key.
- The required approval status must be `permission-protocol/approval`, pinned to Permission Protocol GitHub App ID `3065051`. A similarly named workflow or green test run is not that approval.
- No auto-merge or deployment is configured.
