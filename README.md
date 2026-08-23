# php-debugger.github.io

The code behind the public php-debugger.dev website, built with [Docusaurus](https://docusaurus.io/).

## Development

```bash
npm install
npm run start    # dev server with hot reload at http://localhost:3000
```

## Production build

```bash
npm run build    # outputs to build/, fails on broken internal links
npm run serve    # serve the production build locally (search works here)
```

## Deployment

- **Pull requests**: `.github/workflows/preview.yml` builds the site with the PR-specific base path and deploys a preview to the `gh-pages` branch under `pr-preview/pr-<N>/`.
- **Push to `main`**: `.github/workflows/deploy.yml` builds and deploys the site to the `gh-pages` branch, which GitHub Pages serves.

## Content

Documentation pages are Markdown files in `docs/`, organised by sidebar category (see `sidebars.js`). The home page is `docs/index.mdx`, composed from the React components in `src/components/`. Design mockups live in `design/` for reference.
