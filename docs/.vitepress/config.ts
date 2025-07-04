import type { ThemeConfig } from 'vitepress-theme-mild';
import { defineConfigWithTheme } from 'vitepress';
import baseConfig from 'vitepress-theme-mild/config';
import pkgInfo from '../../package.json';
import navigation from './theme/navigation.json';

export default defineConfigWithTheme<ThemeConfig>({
  title: 'Utils',
  description: 'Typescript utils',
  extends: baseConfig,
  ignoreDeadLinks: true,
  themeConfig: {
    outline: [2, 3],
    // https://vitepress.dev/reference/default-theme-config
    logo: '/typescript.svg',
    nav: [
      { text: 'API', link: '/api/', activeMatch: '/api/' },
      {
        text: pkgInfo.version, items: [
          {
            text: '更新日志',
            link: 'https://github.com/hacxy/utils/releases'
          }
        ]
      }
    ],
    sidebar: {
      '/api/': navigation
    },
    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2024-Present <a href="https://github.com/hacxy">Hacxy</a>',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hacxy/utils' }
    ]
  }
});
