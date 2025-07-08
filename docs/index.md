---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
hero:
  name: "Utils"
  text: "JavaScript工具库"
  tagline: 大小不到10kb且具备强类型
  actions:
    - theme: brand
      text: API列表
      link: /api/
    - theme: alt
      text: github
      link: https://github.com/hacxy/utils
features:
  - title: 轻量
    icon: 🪽
    details: 大小不到10kb
  - title: 平台无关
    icon: 🌈
    details: 与平台无关,在任意可运行javascript的平台中都可使用
  - title: 强类型
    icon: ✨
    details: 所有方法将正确的推断出返回值类型
---

## 安装

::: code-group

```sh [npm]
npm install @hacxy/utils
```

```sh [yarn]
yarn add @hacxy/utils
```

```sh [pnpm]
pnpm add @hacxy/utils
```

```sh [bun]
bun add @hacxy/utils
```

:::

## 使用

```ts
import { arrayIncludes } from '@hacxy/utils';

const arr = [1, 2, 3];
arrayIncludes(arr, 1); // => true;
```

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  --vp-home-hero-image-background-image: linear-gradient(-45deg,rgba(131, 222, 253, 0.6) 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
  .image-bg{
    z-index: -1;
  }
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
