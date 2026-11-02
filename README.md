# YC Review sample app

A small fictional billing application for evaluating Permission Protocol through real GitHub changes and the standard product experience.

## Evaluation status

The earlier setup-incomplete warning is obsolete. On November 2, 2026, the sample pull request was visible in Permission Protocol with its summary, exact diff and matched billing rule. GitHub reported merge blocked, the App-owned approval status pending, and auto-merge off.

The gate workflow reached `NO RECEIPT: human approval required`. This is the expected unsigned result, not completed authorization. A completed live signature, signed receipt and independent verification were not exercised during this check.

These are dated observations. Check the current request and GitHub status before each evaluation.

## Run locally

Requires Node.js 24, matching CI. No dependencies, payment credentials or external services are needed.

```sh
npm test
npm start
```

Open http://127.0.0.1:3000. Invoice records and dollar amounts are invented fixtures. The app binds to localhost, has no production deployment and makes no payment calls. It is not production-ready billing software.

## Reviewer journey

1. Open [Permission Protocol](https://app.permissionprotocol.com/) and use normal authentication with the supplied reviewer credentials.
2. Open Requests and select the sample invoice-export change. Inspect the exact commit, diff, summary and matched billing rule.
3. Review the signing scope. Although the request uses a production scope label, this sample is not connected to a production service or payment provider.
4. Signing requires more than login: current signer eligibility, a passkey and successful presence verification through the ordinary product flow. An eligible reviewer can enroll their own passkey in Account & passkeys. Do not enroll a credential or make a decision on someone else's behalf.
5. Review-only evaluation can stop at signature confirmation. Enrollment alone does not authorize the action. A deliberate decision is required to produce signed evidence.

The proposed change enables CSV export for fictional invoices by changing `src/billing/config.js`. Tests should pass for either setting: passing tests do not grant authority to change protected behavior.

Signing does not merge or deploy. Keep auto-merge off. Do not treat this README as proof that a signature or downstream action has occurred.

## Gate configuration

- `.permission-protocol.yml` identifies protected billing, workflow and policy files.
- The workflow pins `permission-protocol/deploy-gate` to `ec9549dd67d09b85c67b247d8d418a7093dd4c4d` and uses fail-closed mode.
- The workflow references a repository secret. Never publish credentials.
- The required approval status is `permission-protocol/approval`, pinned to Permission Protocol GitHub App ID `3065051`. A similarly named workflow or green test run is not that approval.
- No deployment is configured. Preserve existing protection and leave unrelated repositories and installation settings unchanged.

## Repeat evaluation

Before a new evaluation, check the live request's expiry, exact head, current status and signing requirements. An unsigned request's expiry and a signed receipt's validity window are different.

Use the product's ordinary expiry recovery where offered; an eligible human must complete its verification and any fresh signing steps. Never edit TTLs or reset records. Preserve historical decisions and receipts.

A denial is a decision to preserve: address its reason with a genuine new diff and submit a fresh pull request. For another independent evaluation after approval, use a new meaningful change to the fictional sample and let the normal policy flow create its request. Keep auto-merge off.
