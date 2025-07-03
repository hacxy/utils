---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Utils"
  text: "无平台限制的Typescript实用工具库"
  tagline: 大小仅2kb的Typescript工具库
  actions:
    - theme: brand
      text: API列表
      link: /api/

features:
  - title: 开箱即用
    details: 在浏览器中加载Live2D模型仅需两步
  - title: 零依赖
    details: 基于 Vite 现代构建链实现极简交付，源码依赖与生产包完全解耦, 意味着这是一个可以被独立使用的纯js文件
  - title: 高兼容
    details: 默认集成 cubism2 与 cubism5 支持目前所有模型版本, 无需额外引入SDK
---

## 安装

```sh
npm install @hacxy/utils
```

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
