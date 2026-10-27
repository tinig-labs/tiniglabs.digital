<h1 align="center">
  <a href="https://tiniglabs.digital">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/banner-dark.svg">
      <img alt="tinig labs" src="public/banner.svg" width="520">
    </picture>
  </a>
</h1>

<p align="center">
  An independent lab releasing open models, datasets, and tools for the Philippines.
</p>

<p align="center">
  <a href="https://tiniglabs.digital">Website</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="https://tiniglabs.digital/blog">Blog</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="https://github.com/tinig-labs">GitHub</a>
</p>

<p align="center">
  <a href="LICENSE.md"><img alt="License: FSL-1.1-ALv2" src="https://img.shields.io/badge/license-FSL--1.1--ALv2-1F6B4F"></a>
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16-13261F?logo=nextdotjs&logoColor=white">
  <img alt="Node.js 22" src="https://img.shields.io/badge/node-22-1F6B4F?logo=nodedotjs&logoColor=white">
  <img alt="Azure Static Web Apps" src="https://img.shields.io/badge/Azure-Static%20Web%20Apps-13261F">
</p>

---

This is the source for [tiniglabs.digital](https://tiniglabs.digital), the website of tinig labs. *Tinig* is Filipino for voice.

The lab's first project is speech recognition for Filipino voices that today's AI gets wrong, such as speech after a stroke, with a cleft palate, or in therapy. This repository is only the website. The lab's other work is at [github.com/tinig-labs](https://github.com/tinig-labs).

## What's on the site

| Page | What it does |
|---|---|
| `/` | Explains the lab and the speech project, with a Said/Meant demo of common speech errors and the waitlist signup |
| `/blog` | talâ, the blog. Coming soon, with an email signup for the first post. |
| `/license`, `/terms`, `/privacy` | License, Terms of Service, and Privacy Policy |
| `/waitlist/unsubscribe`, `/blog/unsubscribe` | Separate unsubscribe pages for the waitlist and the blog, linked from every email |

The site is static and hosted on Azure Static Web Apps. It has no cookies or analytics. The two signup forms post to a small Azure Functions API in `api/`, which saves the signup in Azure Table Storage and sends a confirmation through Azure Communication Services.

## Quick start

```bash
npm install
npm run dev     # http://localhost:3000
```

You need Node.js 22. `npm run dev` serves every page. To run the signup API as well, see [Run it locally](DEVELOPMENT.md#run-it-locally).

## Documentation

- [DEVELOPMENT.md](DEVELOPMENT.md): project layout, how signups work, settings, and deploying to Azure Static Web Apps
- [CONTRIBUTING.md](CONTRIBUTING.md): how to report bugs and security problems, and how to propose changes
- [ACKNOWLEDGEMENTS.md](ACKNOWLEDGEMENTS.md): the software, typefaces, and services the site is built on

## License

The website code is under the [Functional Source License 1.1, Apache 2.0 Future License](LICENSE.md) (FSL-1.1-ALv2). You can use, copy, and change it for anything except a competing commercial product. Each version becomes available under Apache 2.0 two years after it's published.

The tinig labs name and logo aren't covered by the code license. Models, datasets, and tools from tinig labs each come with their own license.
