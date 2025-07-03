import defineEslint from '@hacxy/eslint-config';

export default defineEslint({
  typescript: true,
  yaml: true,
  rules: {
    'no-undefined': 0,
  },
  ignores: ['docs/api', 'docs/.vitepress/theme/navigation.json']
});
