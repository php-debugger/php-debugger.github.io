// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PHP Debugger',
  tagline: 'Zero-overhead debugging for PHP',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://php-debugger.github.io',
  // Overridable so PR preview builds can be served from a sub-path
  baseUrl: process.env.BASE_URL || '/',

  organizationName: 'php-debugger',
  projectName: 'php-debugger.github.io',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        docsRouteBasePath: '/',
        indexBlog: false,
        indexPages: false,
        highlightSearchTermsOnTargetPage: true,
      }),
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        logo: {
          alt: 'PHP Debugger — zero-overhead debugging',
          // The navbar is theme-inverted, so the white lockup goes on the
          // light mode (dark bar) and the dark lockup on dark mode (light bar).
          src: 'img/php-debugger-lockup-white.png',
          srcDark: 'img/php-debugger-lockup.png',
        },
        items: [
          {
            to: '/getting-started/introduction',
            label: 'Docs',
            position: 'left',
          },
          {
            to: '/user-guide/breakpoints',
            label: 'Guide',
            position: 'left',
          },
          {
            to: '/reference/cli-options',
            label: 'Reference',
            position: 'left',
          },
          {
            to: '/reference/debug-protocol',
            label: 'API',
            position: 'left',
          },
          {
            href: 'https://github.com/php-debugger/php-debugger/releases',
            label: 'Changelog',
            position: 'left',
          },
          {
            href: 'https://github.com/php-debugger/php-debugger',
            label: 'GitHub',
            position: 'left',
          },
          {
            type: 'dropdown',
            label: 'v1.3.0',
            position: 'right',
            items: [
              {
                label: 'v1.3.0 (latest)',
                href: 'https://github.com/php-debugger/php-debugger/releases/latest',
              },
              {
                label: 'All releases',
                href: 'https://github.com/php-debugger/php-debugger/releases',
              },
            ],
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['php', 'ini', 'bash'],
      },
    }),
};

export default config;
