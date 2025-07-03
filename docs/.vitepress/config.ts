import type { ThemeConfig } from 'vitepress-theme-mild';
import { defineConfigWithTheme } from 'vitepress';
import baseConfig from 'vitepress-theme-mild/config';
import pkgInfo from '../../package.json';

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  title: 'Utils',
  description: 'Utils documentation',
  extends: baseConfig,
  ignoreDeadLinks: true,
  themeConfig: {
    outline: [2, 3],
    // https://vitepress.dev/reference/default-theme-config
    // logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/', activeMatch: '/guide/' },
      { text: 'api', link: '/api/', activeMatch: '/api/' },
      // { text: '参考', link: '/api/interfaces/Options.md' , activeMatch: '/api/'},
      { text: pkgInfo.version, items: [
        {
          text: '更新日志',
          link: 'https://github.com/hacxy/utils/releases'
        }
      ] }
    ],
    sidebar: {
      '/guide/': 'auto',
      '/api/': 'auto'
    },
    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2024-Present <a href="https://github.com/hacxy">Hacxy</a>',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hacxy/l2d' }
    ]
  }
});
