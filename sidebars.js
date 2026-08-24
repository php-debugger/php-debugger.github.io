// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/introduction',
        'getting-started/installation',
        'getting-started/docker',
        {
          type: 'category',
          label: 'More install options',
          link: {type: 'doc', id: 'getting-started/install-options/index'},
          items: [
            'getting-started/install-options/pie',
            'getting-started/install-options/binaries',
            'getting-started/install-options/from-source',
            'getting-started/install-options/windows',
          ],
        },
        'getting-started/quick-start',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'User Guide',
      collapsed: false,
      items: [
        'user-guide/breakpoints',
        'user-guide/step-debugging',
        'user-guide/inspect-variables',
        'user-guide/watch-expressions',
        'user-guide/logging',
        'user-guide/error-handling',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: [
        'reference/cli-options',
        'reference/environment-variables',
        'reference/configuration-file',
        'reference/debug-protocol',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      collapsed: false,
      items: [
        'integrations/ide-support',
        'integrations/phpstorm',
        'integrations/vs-code',
        'integrations/neovim',
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      collapsed: false,
      items: [
        'advanced/performance',
        'advanced/remote-debugging',
        'advanced/troubleshooting',
      ],
    },
  ],
};

export default sidebars;
