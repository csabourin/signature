# Signature

SharePoint Framework web part for generating bilingual National Capital
Commission email signatures. Users complete or review their profile details,
preview the signature, choose the English/French display order, and copy the
HTML signature for use in Outlook.

## Overview

The main implementation is a React-based SPFx web part:

- Web part: `src/webparts/signatureGenerator/SignatureGeneratorWebPart.ts`
- React component: `src/webparts/signatureGenerator/components/SignatureGenerator.tsx`
- Assets: `src/webparts/signatureGenerator/assets`
- Legacy static generator: `signature/generator.html`

The web part uses Microsoft Graph `/me` to prefill user information where
available, including display name, email address, job title, mobile phone,
business phone extension, and `extensionAttribute1` for the French role.

## Technology

- SharePoint Framework `1.22.2`
- React `17`
- Fluent UI React `8`
- TypeScript `5.8`
- Heft build tooling

## Prerequisites

- Node.js `>=22.14.0 <23.0.0`
- npm
- Access to a Microsoft 365 tenant with SharePoint
- A SharePoint App Catalog for deployment

## Install

```bash
npm install
```

## Run Locally

```bash
npm run start
```

The local workbench is configured in `config/serve.json` and runs on
`https://localhost:4321`.

## Build

```bash
npm run build
```

This runs a production Heft test/build and packages the SharePoint solution.
The generated package path is:

```text
sharepoint/solution/signature.sppkg
```

## Scripts

```bash
npm run start
npm run build
npm run clean
npm run eject-webpack
```

## Microsoft Graph Permission

The package requests the following delegated Microsoft Graph permission:

```text
User.Read
```

After deploying the package, approve the API permission request from the
SharePoint admin center if the tenant has not already granted it.

## Deployment

1. Run `npm run build`.
2. Upload `sharepoint/solution/signature.sppkg` to the tenant App Catalog.
3. Deploy the solution.
4. Approve the `User.Read` API permission request if required.
5. Add the **Email Signature Generator** web part to a SharePoint page.

The solution is configured with `skipFeatureDeployment: true`, so it can be
available tenant-wide after deployment.

## Notes

- Signature copy uses the Clipboard API and writes both HTML and plain text
  when supported by the browser.
- If Microsoft Graph data cannot be loaded, the web part falls back to the
  current SharePoint page context user name and email.
- The `signature/` folder contains an older standalone HTML/Vue generator and
  supporting assets.
