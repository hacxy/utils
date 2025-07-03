import fs from 'node:fs';
import { MarkdownTheme, MarkdownThemeContext } from 'typedoc-plugin-markdown';

function handleFormatSidebar(nav) {
  return nav.map(item => {
    let items = [];
    if (item.children && item.children.length) {
      items = handleFormatSidebar(item.children);
    }
    const link = item.path && `api/${item.path}`;
    return { text: item.title, items, link };
  });
}

export function load(app) {
  app.renderer.postRenderAsyncJobs.push(async renderer => {
    // The navigation JSON structure is available on the navigation object.
    const navigation = handleFormatSidebar(renderer.navigation);

    // This can be parsed to something else or written straight to a file:
    fs.writeFileSync('./docs/.vitepress/theme/navigation.json', JSON.stringify(navigation));
  });
  // 在转换阶段过滤构造函数
  // app.converter.on(Converter.EVENT_CREATE_DECLARATION, () => {
  //   // if (
  //   //   reflection.kindString === 'Constructor' // 根据 kindString 判断
  //   //   || reflection.name === 'constructor' // 或根据名称判断
  //   // ) {
  //   //   reflection.flags.setFlag('exclude', true); // 标记为排除
  //   //   context.project.removeReflection(reflection); // 主动移除
  //   // }
  // });
  // app.renderer.on(MarkdownPageEvent.END, page => {
  //   page.contents = page.contents.replace(/## Default/g, '## 默认值');
  //   // page.contents = page.contents.replace(/## Usage/g, '## 用法');
  //   // page.contents = page.contents.replace(/## Deprecated/g, '## 已弃用');
  //   // page.contents = page.contents.replace(/## Example/g, '## 示例');
  //   // page.contents = page.contents.replace(/#### Parameters/g, '#### 参数');
  //   // page.contents = page.contents.replace(/Parameter/g, '参数名');
  //   // page.contents = page.contents.replace(/Type/g, '类型');
  //   // page.contents = page.contents.replace(/Default value/g, '默认值');
  //   // page.contents = page.contents.replace(/Description/g, '描述');
  //
  //   // page.contents = page.contents.replace(/#### Returns/g, '#### 返回值类型');
  //
  //   // page.contents = page.contents.replace(/## Properties/g, '');
  //   // page.contents = page.contents.replace(/## Methods/g, '## 方法');
  //   // page.contents = page.contents.replace(/## Enumeration Members/g, '');
  //   // page.contents = page.contents.replace('[`MotionPreload`](../enumerations/MotionPreload.md)', '[`MotionPreload`](../../guide/motion/index.md)');
  //   // page.contents = page.contents.replace(/\[`Emits`\]\(\.\.\/interfaces\/Emits\.md\)/g, '[`Emits`](../../guide/model/event.md)');
  //   // switch (page.model.name) {
  //   //   case 'Options':
  //   //     page.contents = page.contents.replace(/## Properties/g, '');
  //   //     break;
  //   //   default:
  //   //     page.contents = page.contents.replace(/## Properties/g, '## 选项');
  //   //     break;
  //   // }
  // });

  app.renderer.defineTheme('themeExpand', MyMarkdownTheme);
}

class MyMarkdownTheme extends MarkdownTheme {
  getRenderContext(page) {
    return new MyMarkdownThemeContext(this, page, this.application.options);
  }
}

class MyMarkdownThemeContext extends MarkdownThemeContext {
  // customise partials
  partials = {
    ...this.partials,
    // pageTitle: () => {
    //   // switch (this.page.model.name) {
    //   //   case 'MenusOptions':
    //   //     return '菜单选项';
    //   //   case '# Options':
    //   //     return '';
    //   //   case 'StatusBarOptions':
    //   //     return '状态条选项';
    //   //   case 'TipsOptions':
    //   //     return '提示框选项';
    //   //   case 'ModelOptions':
    //   //     return '模型选项';
    //   //   case 'loadOml2d':
    //   //     return '组件加载';
    //   //   case 'Oml2dProperties':
    //   //     return '实例对象中的属性';
    //   //   case 'Oml2dMethods':
    //   //     return '实例对象中的方法';
    //   //   case 'Oml2dEvents':
    //   //     return '实例对象中的事件';
    //   //   default:
    //   //     return '';
    //   // }
    // }
  };
}
