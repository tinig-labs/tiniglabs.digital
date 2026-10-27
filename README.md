# tiniglabs.digital

The website for tinig labs: open datasets, models, and tools for Filipino speech.

Built with Next.js 16 (App Router), React 19, and Tailwind CSS 4. Signup emails go through Azure Communication Services (ACS).

## Develop

```bash
npm install
cp .env.example .env.local   # fill in ACS_CONNECTION_STRING to send real email
npm run dev                  # http://localhost:3000
npm run lint
npm run typecheck
```

Without `ACS_CONNECTION_STRING`, the pages work but both forms return "Couldn't sign you up right now."

## How signups work

Both forms call server actions in `app/actions.ts`, which send two emails through ACS:

| Form | Sent from | Record copy to | Confirmation to |
|---|---|---|---|
| Waitlist (home page) | `waitlist@tiniglabs.digital` | `waitlist@tiniglabs.digital` | the person signing up |
| Blog subscribe (`/blog`) | `subscribe@tiniglabs.digital` | `subscribe@tiniglabs.digital` | the person signing up |

The record copy is the signup list: its subject line is `Waitlist: <role>, <email>` or `Blog subscriber: <email>`, and its Reply-To is the subscriber. A form only reports success once ACS accepts the record copy. If just the confirmation fails, the error is logged and the signup still counts.

The actions validate the email on the server, drop submissions that fill a hidden honeypot field, and limit each IP to 5 attempts per 10 minutes per form. The limit is kept in memory, so each instance counts separately.

## Build and run in production

```bash
npm run build      # next build, then copies public/ and .next/static into .next/standalone
npm start          # node .next/standalone/server.js
```

`.next/standalone` is self-contained, so that folder is all a server needs.

### Environment variables

| Name | Required | Default | Purpose |
|---|---|---|---|
| `ACS_CONNECTION_STRING` | yes | | ACS resource connection string. Store in Key Vault. |
| `WAITLIST_EMAIL` | no | `waitlist@tiniglabs.digital` | Waitlist sender and record inbox |
| `BLOG_EMAIL` | no | `subscribe@tiniglabs.digital` | Blog sender and record inbox |
| `NEXT_PUBLIC_SITE_URL` | no | `https://tiniglabs.digital` | Canonical origin for metadata, `robots.txt`, `sitemap.xml`. Read at build time. |
| `PORT` / `HOSTNAME` | no | `3000` / `0.0.0.0` | Azure sets `PORT`. Set `HOSTNAME` in the startup command (below). |

## Deploy to Azure App Service

`.github/workflows/azure-webapp.yml` runs on every push to `main` (or manually from the Actions tab). It audits, lints, typechecks, builds, zips `.next/standalone`, signs in to Azure with OIDC, and deploys.

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

In GitHub, create an environment named `production` and add the repository variables `AZURE_WEBAPP_NAME`, `AZURE_CLIENT_ID` (the `APP_ID` above), `AZURE_TENANT_ID`, and `AZURE_SUBSCRIPTION_ID`.

### 4. Custom domain

```bash
az webapp config hostname add -g $RG --webapp-name $APP --hostname tiniglabs.digital
az webapp config ssl create -g $RG -n $APP --hostname tiniglabs.digital
```

Add the DNS records Azure asks for (a TXT `asuid` record plus an A or CNAME record) first.

## Before launch

- Footer links for GitHub, License, Terms of Service, and Privacy Policy still point to `#` (`app/_components/site-footer.tsx`). Since the site now collects email addresses, publish a privacy policy.
- Unsubscribing is by replying to the confirmation email. Once real posts go out, use a sending setup with a one-click unsubscribe link.
