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
cp api/local.settings.example.json api/local.settings.json   # set UNSUBSCRIBE_SECRET; ACS_CONNECTION_STRING is optional
npx azurite --location .azurite --silent                     # local Table Storage, in a second terminal
npm run dev:swa              # http://localhost:4280
```

The example settings point `STORAGE_CONNECTION_STRING` at [Azurite](https://learn.microsoft.com/azure/storage/common/storage-use-azurite), the local storage emulator, so signups are saved on your machine. Without a real `ACS_CONNECTION_STRING`, signups still save and the forms report success. Only the confirmation email fails, and that's logged.

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
  waitlist/unsubscribe/  Leave the waitlist (from the link in waitlist emails)
  blog/unsubscribe/      Unsubscribe from talâ (from the link in blog emails)
  _components/           Header, footer, brand wordmark, legal page shell, signup client
  robots.ts sitemap.ts not-found.tsx
api/                     Azure Functions app, deployed as the Static Web App's API
  src/functions/signup.ts    POST /api/waitlist and POST /api/subscribe
  src/functions/unsubscribe.ts   /api/waitlist/unsubscribe and /api/blog/unsubscribe
  src/signup.ts              Validation, saving, confirming, and unsubscribing
  src/emails.ts              What each email says
  src/email-template.ts      The HTML and plain-text layout every email uses
  src/unsubscribe.ts         Signed unsubscribe links and List-Unsubscribe headers
  src/mailer.ts              Azure Communication Services client
  src/subscribers.ts         The subscriber lists in Azure Table Storage
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

Both forms send JSON to the API with `postSignup` in `app/_components/signup.ts`. The API saves the subscriber in Azure Table Storage, then sends a confirmation email:

| Form | Endpoint | Saved to | Confirmation from | Replies go to (Zoho) |
|---|---|---|---|---|
| Waitlist (home page) | `POST /api/waitlist` | `subscribers` table, partition `waitlist` | `DoNotReply@tiniglabs.digital` | `waitlist@tiniglabs.digital` |
| Blog subscribe (`/blog/`) | `POST /api/subscribe` | `subscribers` table, partition `blog` | `DoNotReply@tiniglabs.digital` | `subscribe@tiniglabs.digital` |

The API answers `{ "ok": true }`, or `{ "ok": false, "error": "..." }` with status 400 (bad input), 429 (too many attempts), or 503 (the subscriber couldn't be saved). The error text is written for people and is shown in the form as is. A form reports success once the subscriber is saved. If only the confirmation email fails, the error is logged and the signup still counts.

The API validates the email, drops submissions that fill a hidden honeypot field, and limits each IP to 5 attempts per 10 minutes per form. The limit is kept in memory, so each Functions instance counts separately.

If you change what the forms collect or how long anything is kept, update the table in `app/privacy/page.tsx` in the same pull request.

### The subscriber list

`api/src/subscribers.ts` keeps both lists in one table (`subscribers`, created on first use):

| Column | Value |
|---|---|
| `PartitionKey` | `waitlist` or `blog` |
| `RowKey` | The email address, URL-encoded (Table Storage keys can't contain `/ \ # ?`) |
| `email` | The email address as entered, lowercased |
| `role` | `developer`, `specialist`, or `supporter` (waitlist only) |
| `subscribedAt` | When they last signed up |

Each address appears at most once per list. Signing up again updates the row, for example with a new role. Unsubscribing deletes the row, so the table only ever holds people who want email.

To see or export a list, open the storage account in the Azure portal and use **Storage browser > Tables > subscribers**, or run:

```bash
az storage entity query --connection-string "<storage connection string>" -t subscribers \
  --filter "PartitionKey eq 'waitlist'" --select email role subscribedAt -o table
```

### Email

Email on `tiniglabs.digital` is split between two services:

- **Azure Communication Services** only sends, and only as `DoNotReply@tiniglabs.digital`.
- **Zoho Mail** handles everything else: the `waitlist@` and `subscribe@` inboxes, all incoming mail (MX), and any mail sent by a person.

### Email layout

Every email is built by `renderEmail` in `api/src/email-template.ts`. The layout follows the site: an off-white page, the lowercase wordmark, a large heading, and one mint panel for the part that matters: the person's role, or talâ. Mail apps strip `<style>` and modern CSS, so the template uses tables and inline styles only. Each email also has a plain-text version.

To preview a change, build the API and write an email to a file:

```bash
npm run build:api
cd api && UNSUBSCRIBE_SECRET=$(node -e "console.log('x'.repeat(32))") node -e "
  require('fs').writeFileSync('preview.html', require('./dist/src/emails.js').waitlistConfirmation('you@example.com', 'developer').html)"
```

### Unsubscribing

Each list has its own unsubscribe page and endpoint, and every email links to the ones for its list. Unsubscribing from one list never affects the other.

| List | Page | Endpoint |
|---|---|---|
| Waitlist | `/waitlist/unsubscribe/` ("Leave the waitlist") | `/api/waitlist/unsubscribe` |
| talâ, the blog | `/blog/unsubscribe/` ("Unsubscribe from talâ") | `/api/blog/unsubscribe` |

Every email to a subscriber offers two ways to unsubscribe:

- **The mail app's own button.** The `List-Unsubscribe` and `List-Unsubscribe-Post` headers make Gmail, Yahoo, Apple Mail, and Outlook show their own Unsubscribe button. Gmail and Yahoo unsubscribe in one click by POSTing to the list's endpoint, as RFC 8058 defines. Mail apps that don't support that use the `mailto:` fallback, which sends an email to the list's Zoho inbox. Those are the only unsubscribes you handle by hand: delete the row from the table.
- **The Unsubscribe link in the footer.** It opens the list's page, which asks the person to confirm with a button. A plain visit never unsubscribes, because link scanners in mail systems open every link.

Each link carries a token: the list and email address, signed with `UNSUBSCRIBE_SECRET`. The API only accepts tokens it signed, and each endpoint only accepts its own list's tokens, so nobody can unsubscribe someone else by editing the link. The secret also means links never expire. If you change the secret, every link in emails already sent stops working.

An unsubscribe deletes the person's row for that list right away. Using the same link twice is harmless.

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
| `STORAGE_CONNECTION_STRING` | Static Web App environment variables; `api/local.settings.json` locally | yes | | Storage account connection string for the subscriber lists. `UseDevelopmentStorage=true` locally, with Azurite. |
| `SUBSCRIBERS_TABLE` | same as above | no | `subscribers` | Table name |
| `ACS_CONNECTION_STRING` | same as above | yes | | ACS resource connection string, for confirmation emails |
| `SENDER_EMAIL` | same as above | no | `DoNotReply@tiniglabs.digital` | The only ACS sender. Must be a MailFrom address on the ACS domain. |
| `WAITLIST_EMAIL` | same as above | no | `waitlist@tiniglabs.digital` | Zoho inbox for replies to waitlist emails |
| `BLOG_EMAIL` | same as above | no | `subscribe@tiniglabs.digital` | Zoho inbox for replies to blog emails |
| `UNSUBSCRIBE_SECRET` | same as above | yes | | At least 32 random characters, used to sign unsubscribe links. Without it, signups fail with the 503 error. |
| `SITE_URL` | same as above | no | `https://tiniglabs.digital` | Where unsubscribe links in emails point. Set it to the `azurestaticapps.net` address until the custom domain works. |

Never commit real values. `.env*` files (except `.env.example`) and `api/local.settings.json` are gitignored.

## Deploy to Azure Static Web Apps

`.github/workflows/azure-static-web-apps.yml` runs on every push to `main` and can be started manually from the Actions tab. It audits, lints, typechecks, and builds both the site and the API, then uploads `out/` and `api/` to the Static Web App. Pull requests aren't deployed, so no preview environment gets the production email settings.

### 1. Azure Communication Services email

Zoho Mail already handles the domain's mailboxes and incoming mail. ACS is added for sending only:

1. Create an Email Communication Service, add the custom domain `tiniglabs.digital`, and add the DNS records it gives you until the domain shows Verified:
   - **Domain verification TXT:** add it as is.
   - **DKIM and DKIM2 CNAMEs:** add them as is. They use their own selectors, so they don't clash with Zoho's DKIM record.
   - **SPF:** a domain can have only one `v=spf1` record. Add ACS to Zoho's existing record instead of creating a second one, for example `v=spf1 include:zohomail.com include:spf.protection.outlook.com ~all`. Keep whichever Zoho include your Zoho admin console shows, which depends on your Zoho region.
   - **MX:** leave it pointing at Zoho. ACS doesn't receive mail.
2. Keep only the `DoNotReply` MailFrom address (display name: `tinig labs`). Don't add `waitlist` or `subscribe` there; those addresses are Zoho inboxes.
3. Create a Communication Services resource and connect the verified domain to it (Email > Domains).
4. Copy the resource's connection string from Settings > Keys.
5. Optionally, add a DMARC record such as `_dmarc  TXT  v=DMARC1; p=none; rua=mailto:<a Zoho inbox>` to monitor that both services pass SPF and DKIM.

### 2. Storage account for the subscriber lists

```bash
RG=tiniglabs-rg; STORAGE=<storage-account-name>   # 3-24 lowercase letters and digits, globally unique
az group create -n $RG -l southeastasia
az storage account create -n $STORAGE -g $RG -l southeastasia --sku Standard_LRS \
  --kind StorageV2 --min-tls-version TLS1_2 --allow-blob-public-access false
az storage account show-connection-string -n $STORAGE -g $RG -o tsv
```

The API creates the `subscribers` table the first time someone signs up. At this size, Table Storage costs a few cents a month.

### 3. Static Web App

```bash
APP=<static-web-app-name>
az staticwebapp create -n $APP -g $RG -l eastasia --sku Free

# Read by the API at runtime. Static Web Apps stores these encrypted.
az staticwebapp appsettings set -n $APP -g $RG --setting-names \
  "STORAGE_CONNECTION_STRING=<storage connection string>" \
  "ACS_CONNECTION_STRING=<ACS connection string>" \
  "UNSUBSCRIBE_SECRET=$(openssl rand -hex 32)"

# Deployment token for GitHub Actions
az staticwebapp secrets list -n $APP -g $RG --query properties.apiKey -o tsv
```

`eastasia` is the closest Static Web Apps region to the Philippines. The Free plan covers the site, the managed API, and custom domains. Move to the Standard plan if you want the connection string as a Key Vault reference instead of an app setting.

### 4. GitHub

1. Create an environment named `production` and limit it to the `main` branch (Settings > Environments > Deployment branches), so forks and other branches can't deploy.
2. In that environment, add the secret `AZURE_STATIC_WEB_APPS_API_TOKEN` with the token from step 3.

### 5. Custom domain

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
