# Development

How the tinig labs website is built, run, and deployed. For how to propose changes, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Requirements

- Node.js 20.9 or later (production runs Node 22)
- npm

## Run it locally

```bash
npm install
cp .env.example .env.local   # optional: fill in ACS_CONNECTION_STRING to send real email
npm run dev                  # http://localhost:3000
```

Without `ACS_CONNECTION_STRING`, every page works but both signup forms return "Couldn't sign you up right now." That's expected; you only need it to test email.

## Checks

Run these before opening a pull request. CI runs the same ones before every deploy.

```bash
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev --audit-level=high
```

## Stack

- [Next.js 16](https://nextjs.org) App Router with Cache Components, React 19, TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Azure Communication Services](https://learn.microsoft.com/azure/communication-services/) for signup email
- Azure App Service (Linux, Node 22) for hosting

Next.js 16 changed many APIs. Before writing Next code, read the matching guide in `node_modules/next/dist/docs/` (see [AGENTS.md](AGENTS.md)).

## Project layout

```
app/
  page.tsx               Home page, with the Said/Meant demo and the waitlist form
  blog/                  talâ, the blog (coming soon) and its subscribe form
  license/ terms/ privacy/   Legal pages; /license renders LICENSE.md at build time
  actions.ts             Server actions behind both signup forms
  _components/           Header, footer, brand wordmark, legal page shell
  _server/               Server-only code: email sending and rate limiting
  api/health/            Health check for App Service
  robots.ts sitemap.ts not-found.tsx
public/logo.svg          The tinig labs mark
scripts/prepare-standalone.mjs   Copies static assets into the standalone build
```

## Design conventions

- Colors are CSS variables in `app/globals.css`: `--gatas` (background), `--tinta` (ink), `--abo` (secondary text), `--pandan` (actions), `--mint` (surfaces). Use them instead of new hex values.
- Body text is Figtree. The name "tinig labs" is always lowercase and always set in Montserrat through the `Brand` component in `app/_components/brand.tsx`.
- Copy is short and in sentence case. Buttons say what happens ("Join the waitlist"), and errors say how to fix the problem.
- Every interactive element needs a visible keyboard focus state, and animation must respect `prefers-reduced-motion`.

## How signups work

Both forms call server actions in `app/actions.ts`, which send two emails through ACS:

| Form | Sent from | Record copy to | Confirmation to |
|---|---|---|---|
| Waitlist (home page) | `waitlist@tiniglabs.digital` | `waitlist@tiniglabs.digital` | the person signing up |
| Blog subscribe (`/blog`) | `subscribe@tiniglabs.digital` | `subscribe@tiniglabs.digital` | the person signing up |

The record copy is the signup list. Its subject line is `Waitlist: <role>, <email>` or `Blog subscriber: <email>`, and its Reply-To is the subscriber. A form only reports success once ACS accepts the record copy. If only the confirmation fails, the error is logged and the signup still counts.

The actions validate the email on the server, drop submissions that fill a hidden honeypot field, and limit each IP to 5 attempts per 10 minutes per form. The limit is kept in memory, so each instance counts separately.

If you change what the forms collect or how long anything is kept, update the table in `app/privacy/page.tsx` in the same pull request.

## Build and run in production

```bash
npm run build      # next build, then copies public/ and .next/static into .next/standalone
npm start          # node .next/standalone/server.js
```

`.next/standalone` is self-contained, so that folder is all a server needs.

### Environment variables

| Name | Required | Default | Purpose |
|---|---|---|---|
| `ACS_CONNECTION_STRING` | yes, in production | | ACS resource connection string. Keep it in Key Vault. |
| `WAITLIST_EMAIL` | no | `waitlist@tiniglabs.digital` | Waitlist sender and record inbox |
| `BLOG_EMAIL` | no | `subscribe@tiniglabs.digital` | Blog sender and record inbox |
| `NEXT_PUBLIC_SITE_URL` | no | `https://tiniglabs.digital` | Canonical origin for metadata, `robots.txt`, and `sitemap.xml`. Read at build time. |
| `PORT` / `HOSTNAME` | no | `3000` / `0.0.0.0` | Azure sets `PORT`. Set `HOSTNAME` in the startup command (below). |

Never commit real values. `.env*` files are gitignored, except `.env.example`.

## Deploy to Azure App Service

`.github/workflows/azure-webapp.yml` runs on every push to `main` and can be started manually from the Actions tab. It audits, lints, typechecks, builds, zips `.next/standalone`, signs in to Azure with OIDC, and deploys. No Azure password is stored in GitHub.

### 1. Azure Communication Services email

1. Create an Email Communication Service, add the custom domain `tiniglabs.digital`, and add the SPF, DKIM, and DKIM2 DNS records it gives you until the domain shows Verified. The domain already hosts mailboxes, so merge the SPF into its existing TXT record (one `v=spf1` record, with `include:spf.protection.outlook.com` added) instead of creating a second one.
2. Under the domain's MailFrom addresses, add `waitlist` and `subscribe` (display name: `tinig labs`).
3. Create a Communication Services resource and connect the verified domain to it (Email > Domains).
4. Copy the resource's connection string from Settings > Keys.

### 2. App Service

```bash
RG=tiniglabs-rg; APP=<app-name>; KV=<keyvault-name>
az group create -n $RG -l southeastasia
az appservice plan create -g $RG -n tiniglabs-plan --is-linux --sku B1
az webapp create -g $RG -p tiniglabs-plan -n $APP --runtime "NODE:22-lts"

# Azure sets HOSTNAME to the container name, so bind to all interfaces explicitly
az webapp config set -g $RG -n $APP \
  --startup-file "HOSTNAME=0.0.0.0 node server.js" \
  --always-on true --http20-enabled true --min-tls-version 1.2 --ftps-state Disabled
az webapp update -g $RG -n $APP --https-only true
az webapp config set -g $RG -n $APP --generic-configurations '{"healthCheckPath": "/api/health"}'

# Keep the ACS connection string in Key Vault, read with the app's managed identity
az webapp identity assign -g $RG -n $APP
az keyvault create -g $RG -n $KV --enable-rbac-authorization true
az keyvault secret set --vault-name $KV -n acs-connection-string --value "<connection string>"
az role assignment create --role "Key Vault Secrets User" \
  --assignee $(az webapp identity show -g $RG -n $APP --query principalId -o tsv) \
  --scope $(az keyvault show -n $KV --query id -o tsv)

# The zip is prebuilt; don't let Azure run npm install/build on it
az webapp config appsettings set -g $RG -n $APP --settings \
  SCM_DO_BUILD_DURING_DEPLOYMENT=false NEXT_TELEMETRY_DISABLED=1 \
  "ACS_CONNECTION_STRING=@Microsoft.KeyVault(VaultName=$KV;SecretName=acs-connection-string)"
```

### 3. GitHub OIDC

```bash
az ad app create --display-name tiniglabs-github-deploy
APP_ID=$(az ad app list --display-name tiniglabs-github-deploy --query "[0].appId" -o tsv)
az ad sp create --id $APP_ID
az ad app federated-credential create --id $APP_ID --parameters '{
  "name": "github-production",
  "issuer": "https://token.actions.githubusercontent.com",
  "subject": "repo:<owner>/<repo>:environment:production",
  "audiences": ["api://AzureADTokenExchange"]
}'
az role assignment create --role "Website Contributor" --assignee $APP_ID \
  --scope $(az webapp show -g $RG -n $APP --query id -o tsv)
```

In GitHub, create an environment named `production` and add the repository variables `AZURE_WEBAPP_NAME`, `AZURE_CLIENT_ID` (the `APP_ID` above), `AZURE_TENANT_ID`, and `AZURE_SUBSCRIPTION_ID`. Limit the `production` environment to the `main` branch so pull requests from forks can't deploy.

### 4. Custom domain

```bash
az webapp config hostname add -g $RG --webapp-name $APP --hostname tiniglabs.digital
az webapp config ssl create -g $RG -n $APP --hostname tiniglabs.digital
```

Add the DNS records Azure asks for (a TXT `asuid` record plus an A or CNAME record) first.

## Before launch

- Have the Terms of Service (`app/terms/page.tsx`) and Privacy Policy (`app/privacy/page.tsx`) reviewed by a lawyer.
- Unsubscribing is by replying to the confirmation email. Once real posts go out, use a sending setup with a one-click unsubscribe link.
