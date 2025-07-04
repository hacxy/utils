---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
hero:
  name: "Utils"
  text: "无平台限制的Typescript实用工具库"
  tagline: Typescript工具库, 大小不超过10kb
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
    details: 纯js文件不超过10kb大小
  - title: 不依赖平台
    icon: 🌈
    details: 任意可以运行javscript的平台均可使用, 如:Nodejs、浏览器
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
arrayIncludes(input, 1); // => true;
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
