// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/* The released version is shown in the navbar and quoted in sample output on the
   docs. Read it from the extension's latest GitHub release at build time so a
   rebuild is all it takes to pick up a new release, rather than hunting down
   every place a version is written down.

   FALLBACK_VERSION keeps builds working when the API cannot be reached -- offline,
   or rate limited, since this is an unauthenticated request. It is only a
   backstop: bump it when it drifts too far from reality. */
const FALLBACK_VERSION = '0.3.0';

/* Stand-in written into the navbar config below and swapped for the real version
   in createConfig, so the version lives in exactly one place. */
const VERSION_PLACEHOLDER = '__VERSION__';

async function latestDebuggerVersion() {
  const url =
    'https://api.github.com/repos/php-debugger/php-debugger/releases/latest';
  try {
    const response = await fetch(url, {
      headers: {Accept: 'application/vnd.github+json'},
    });
    if (!response.ok) {
      console.warn(
        `[version] GitHub returned ${response.status}; falling back to ${FALLBACK_VERSION}`,
      );
      return FALLBACK_VERSION;
    }
    const {tag_name: tag} = await response.json();
    return typeof tag === 'string' ? tag.replace(/^v/, '') : FALLBACK_VERSION;
  } catch (error) {
    console.warn(
      `[version] could not reach GitHub (${error.message}); falling back to ${FALLBACK_VERSION}`,
    );
    return FALLBACK_VERSION;
  }
}

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
            to: '/user-guide/starting-the-debugger',
            label: 'Guide',
            position: 'left',
          },
          {
            to: '/reference/cli-options',
            label: 'Reference',
            position: 'left',
          },
          {
            to: '/integrations/ide-support',
            label: 'Integrations',
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
            label: VERSION_PLACEHOLDER,
            position: 'right',
            items: [
              {
                label: `${VERSION_PLACEHOLDER} (latest)`,
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
        additionalLanguages: ['php', 'ini', 'bash', 'powershell'],
      },
    }),
};

export default async function createConfig() {
  const debuggerVersion = await latestDebuggerVersion();
  const navbar = config.themeConfig.navbar;
  return {
    ...config,
    /* Available to pages via useDocusaurusContext().siteConfig.customFields. */
    customFields: {...config.customFields, debuggerVersion},
    themeConfig: {
      ...config.themeConfig,
      navbar: {
        ...navbar,
        items: navbar.items.map((item) =>
          item.type === 'dropdown' && item.label === VERSION_PLACEHOLDER
            ? {
                ...item,
                label: `v${debuggerVersion}`,
                items: item.items.map((sub) =>
                  sub.label === `${VERSION_PLACEHOLDER} (latest)`
                    ? {...sub, label: `v${debuggerVersion} (latest)`}
                    : sub,
                ),
              }
            : item,
        ),
      },
    },
  };
}
