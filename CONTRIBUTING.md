# Contributing

Thanks for helping with the tinig labs website. This repository is only the website at [tiniglabs.digital](https://tiniglabs.digital). Models, datasets, and tools live in their own repositories under [github.com/tinig-labs](https://github.com/tinig-labs).

tinig labs is run by one developer, so replies can take a few days.

## What's welcome

- Bug fixes, broken links, and typos
- Accessibility fixes: keyboard use, screen readers, contrast, reduced motion
- Corrections to Filipino, Tagalog, or other Philippine-language text, and to the speech examples on the home page
- Performance and security improvements

For a new page, a new feature, or a change to the visual design, open an issue first so we can agree on it before you spend time on it.

## Reporting a bug

Open an issue with:

- the page URL
- what you expected and what happened
- your browser and device
- a screenshot, if it's visual

## Reporting a security problem

Don't open a public issue. Report it privately through the repository's **Security** tab (**Report a vulnerability**). Include the steps to reproduce it and what an attacker could do.

## Making a change

1. Fork the repository and create a branch from `main`.
2. Set up the project with the steps in [DEVELOPMENT.md](DEVELOPMENT.md).
3. Make your change. Keep each pull request to one change.
4. Run the checks:

   ```bash
   npm run lint
   npm run typecheck
   npm run build
   npm run build:api
   ```

5. Open a pull request that says what changed and why. For visual changes, add screenshots at phone and desktop widths.

### Checklist

- [ ] Lint, typecheck, and build pass
- [ ] Interactive elements work with a keyboard and show a focus state
- [ ] Animation respects `prefers-reduced-motion`
- [ ] Layout works at 360px wide without horizontal scrolling
- [ ] Copy follows the style below
- [ ] If the change affects what the signup forms collect, `app/privacy/page.tsx` is updated too

## Writing style

- Sentence case for headings and buttons
- "tinig labs" is always lowercase and rendered with the `Brand` component
- Short, plain sentences. Buttons say what they do, and errors say how to fix the problem.
- Don't promise release dates or features that aren't built

## Licensing your contribution

The website code is under the [Functional Source License 1.1, Apache 2.0 Future License](LICENSE.md). By opening a pull request, you agree that your contribution is licensed under the same terms, and that you have the right to contribute it.

## Conduct

Be kind and assume good faith. Harassment or discrimination of any kind gets you removed from the project.
