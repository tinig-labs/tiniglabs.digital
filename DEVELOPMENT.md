# Development

How the tinig labs website is built, run, and deployed. For how to propose changes, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Requirements

- Node.js 22 (20.9 or later works for the site; the API runs on Node 22)
- npm
- To run the signup API locally: [Azure Functions Core Tools v4](https://learn.microsoft.com/azure/azure-functions/functions-run-local)

## Run it locally

Pages only:

```bash
npm install
npm run dev                  # http://localhost:3000
```

The signup forms post to `/api/*`, which `next dev` doesn't serve, so they show "Couldn't sign you up right now." To run the site and the API together through the Static Web Apps CLI:

```bash
npm install --prefix api
cp api/local.settings.example.json api/local.settings.json   # fill in ACS_CONNECTION_STRING
npm run dev:swa              # http://localhost:4280
```

Without a real `ACS_CONNECTION_STRING`, the API still runs and the forms show the same error, which is the expected behavior when email can't be sent.

## Checks

Run these before opening a pull request. CI runs the same ones before every deploy.

```bash
npm run lint
npm run typecheck
npm run build
npm run build:api
npm audit --omit=dev --audit-level=high
```

## Stack

- [Next.js 16](https://nextjs.org) App Router, exported as static files (`output: "export"`), React 19, TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Azure Functions](https://learn.microsoft.com/azure/azure-functions/) (Node.js v4 programming model) for the signup API
- [Azure Communication Services](https://learn.microsoft.com/azure/communication-services/) for signup email
- [Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/) for hosting the site and the API together

Next.js 16 changed many APIs. Before writing Next code, read the matching guide in `node_modules/next/dist/docs/` (see [AGENTS.md](AGENTS.md)). The site is a static export, so pages can't use server actions, cookies, request headers, rewrites, or `next.config` headers. Anything that needs a server goes in `api/`.

## Project layout

```
app/
  page.tsx               Home page, with the Said/Meant demo and the waitlist form
  blog/                  talâ, the blog (coming soon) and its subscribe form
  license/ terms/ privacy/   Legal pages; /license renders LICENSE.md at build time
  _components/           Header, footer, brand wordmark, legal page shell, signup client
  robots.ts sitemap.ts not-found.tsx
api/                     Azure Functions app, deployed as the Static Web App's API
  src/functions/signup.ts    POST /api/waitlist and POST /api/subscribe
  src/signup.ts              Validation and the emails each form sends
  src/mailer.ts              Azure Communication Services client
  src/rate-limit.ts          Per-IP attempt limit
public/
  staticwebapp.config.json   Security headers, 404 page, caching, API runtime
  logo.svg banner.svg banner-dark.svg
swa-cli.config.json      Local Static Web Apps CLI setup used by npm run dev:swa
```

## Design conventions

- Colors are CSS variables in `app/globals.css`: `--gatas` (background), `--tinta` (ink), `--abo` (secondary text), `--pandan` (actions), `--mint` (surfaces). Use them instead of new hex values.
- Body text is Figtree. The name "tinig labs" is always lowercase and always set in Montserrat through the `Brand` component in `app/_components/brand.tsx`.
- Copy is short and in sentence case. Buttons say what happens ("Join the waitlist"), and errors say how to fix the problem.
- Every interactive element needs a visible keyboard focus state, and animation must respect `prefers-reduced-motion`.

## How signups work

Both forms send JSON to the API with `postSignup` in `app/_components/signup.ts`:

| Form | Endpoint | Sent from | Record copy to | Confirmation to |
|---|---|---|---|---|
| Waitlist (home page) | `POST /api/waitlist` | `waitlist@tiniglabs.digital` | `waitlist@tiniglabs.digital` | the person signing up |
| Blog subscribe (`/blog/`) | `POST /api/subscribe` | `subscribe@tiniglabs.digital` | `subscribe@tiniglabs.digital` | the person signing up |

The API answers `{ "ok": true }`, or `{ "ok": false, "error": "..." }` with status 400 (bad input), 429 (too many attempts), or 503 (email couldn't be sent). The error text is written for people and is shown in the form as is.

The record copy is the signup list. Its subject line is `Waitlist: <role>, <email>` or `Blog subscriber: <email>`, and its Reply-To is the subscriber. A form only reports success once ACS accepts the record copy. If only the confirmation fails, the error is logged and the signup still counts.

The API validates the email, drops submissions that fill a hidden honeypot field, and limits each IP to 5 attempts per 10 minutes per form. The limit is kept in memory, so each Functions instance counts separately.

If you change what the forms collect or how long anything is kept, update the table in `app/privacy/page.tsx` in the same pull request.

## Build

```bash
npm run build       # static site in out/
npm run build:api   # API in api/dist/
```

To preview the static build without the API, serve `out/` with any static file server, for example `npx serve out`.

### Settings

| Name | Where | Required | Default | Purpose |
|---|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `.env.local` or the CI environment, at build time | no | `https://tiniglabs.digital` | Canonical origin for metadata, `robots.txt`, and `sitemap.xml` |
| `ACS_CONNECTION_STRING` | Static Web App environment variables; `api/local.settings.json` locally | yes | | ACS resource connection string |
| `WAITLIST_EMAIL` | same as above | no | `waitlist@tiniglabs.digital` | Waitlist sender and record inbox |
| `BLOG_EMAIL` | same as above | no | `subscribe@tiniglabs.digital` | Blog sender and record inbox |

Never commit real values. `.env*` files (except `.env.example`) and `api/local.settings.json` are gitignored.

## Deploy to Azure Static Web Apps

`.github/workflows/azure-static-web-apps.yml` runs on every push to `main` and can be started manually from the Actions tab. It audits, lints, typechecks, and builds both the site and the API, then uploads `out/` and `api/` to the Static Web App. Pull requests aren't deployed, so no preview environment gets the production email settings.

### 1. Azure Communication Services email

1. Create an Email Communication Service, add the custom domain `tiniglabs.digital`, and add the SPF, DKIM, and DKIM2 DNS records it gives you until the domain shows Verified. The domain already hosts mailboxes, so merge the SPF into its existing TXT record (one `v=spf1` record, with `include:spf.protection.outlook.com` added) instead of creating a second one.
2. Under the domain's MailFrom addresses, add `waitlist` and `subscribe` (display name: `tinig labs`).
3. Create a Communication Services resource and connect the verified domain to it (Email > Domains).
4. Copy the resource's connection string from Settings > Keys.

### 2. Static Web App

```bash
RG=tiniglabs-rg; APP=<static-web-app-name>
az group create -n $RG -l southeastasia
az staticwebapp create -n $APP -g $RG -l eastasia --sku Free

# Read by the API at runtime. Static Web Apps stores these encrypted.
az staticwebapp appsettings set -n $APP -g $RG --setting-names \
  "ACS_CONNECTION_STRING=<connection string>"

# Deployment token for GitHub Actions
az staticwebapp secrets list -n $APP -g $RG --query properties.apiKey -o tsv
```

`eastasia` is the closest Static Web Apps region to the Philippines. The Free plan covers the site, the managed API, and custom domains. Move to the Standard plan if you want the connection string as a Key Vault reference instead of an app setting.

### 3. GitHub

1. Create an environment named `production` and limit it to the `main` branch (Settings > Environments > Deployment branches), so forks and other branches can't deploy.
2. In that environment, add the secret `AZURE_STATIC_WEB_APPS_API_TOKEN` with the token from step 2.

### 4. Custom domain

`tiniglabs.digital` is an apex domain, so validate it with a TXT record:

```bash
az staticwebapp hostname set -n $APP -g $RG --hostname tiniglabs.digital --validation-method dns-txt-token
az staticwebapp hostname show -n $APP -g $RG --hostname tiniglabs.digital --query validationToken -o tsv
```

1. Add the token as a TXT record on `@`.
2. Point the apex at the app's default hostname (`az staticwebapp show -n $APP -g $RG --query defaultHostname -o tsv`) with an ALIAS or ANAME record. Static Web Apps doesn't give apex domains a fixed IP, so a plain A record won't work.
3. Optionally, add `www` as a CNAME to the same hostname and set it up the same way with `--validation-method cname-delegation`.

Static Web Apps issues and renews the TLS certificate itself.

## Before launch

- Have the Terms of Service (`app/terms/page.tsx`) and Privacy Policy (`app/privacy/page.tsx`) reviewed by a lawyer.
- Unsubscribing is by replying to the confirmation email. Once real posts go out, use a sending setup with a one-click unsubscribe link.
