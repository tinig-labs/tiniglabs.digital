# Acknowledgements

The tinig labs website is built on the work of others. Thank you.

## Software

| Project | Used for | License |
|---|---|---|
| [Next.js](https://github.com/vercel/next.js) | Web framework | MIT |
| [React](https://github.com/facebook/react) | User interface | MIT |
| [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) | Styling | MIT |
| [Azure Communication Services Email SDK](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-email) | Sending signup emails | MIT |
| [Azure Functions Node.js library](https://github.com/Azure/azure-functions-nodejs-library) | The signup API | MIT |
| [Azure Tables SDK](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/tables/data-tables) | Storing the waitlist and subscriber lists | MIT |
| [TypeScript](https://github.com/microsoft/TypeScript) | Type checking | Apache 2.0 |
| [ESLint](https://github.com/eslint/eslint) | Linting | MIT |

Each package's full license is in its folder under `node_modules` (or `api/node_modules`) after `npm install`. Transitive dependencies are listed in `package-lock.json` and `api/package-lock.json`.

## Typefaces

- [Figtree](https://github.com/erikdkennedy/figtree) by Erik Kennedy, under the SIL Open Font License 1.1. Used for all text.
- [Montserrat](https://github.com/JulietaUla/Montserrat) by Julieta Ulanovsky and contributors, under the SIL Open Font License 1.1. Used for the tinig labs name.

Both are served from this site through `next/font`, not loaded from Google.

## License

The website's license is the [Functional Source License](https://fsl.software), created by Sentry as part of the [Fair Source](https://fair.io) initiative.

## Hosting and services

The site and its signup API run on Azure Static Web Apps, the lists are stored in Azure Table Storage, and emails are sent with Azure Communication Services.
