# spyfu-vue-functional

[![Build status](https://img.shields.io/circleci/project/github/spyfu/spyfu-vue-functional.svg)](https://circleci.com/gh/spyfu/spyfu-vue-functional)
[![Coverage](https://img.shields.io/codecov/c/token/ZnYz3FuhI5/github/spyfu/spyfu-vue-functional.svg)](https://codecov.io/gh/spyfu/spyfu-vue-functional)
[![Dev dependencies](https://img.shields.io/david/dev/spyfu/spyfu-vue-functional.svg)](#)
[![npm](https://img.shields.io/npm/v/spyfu-vue-functional.svg)](https://www.npmjs.com/package/spyfu-vue-functional)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/spyfu/spyfu-vue-functional/blob/master/LICENSE)

<a name="installation"></a>
### Installation

This utility helps bind placeholder elements to functional Vue components.

```bash
# install through npm
$ npm install spyfu-vue-functional

# or with yarn
$ yarn add spyfu-vue-functional
```

<a name="basic-usage"></a>
### Basic usage

Functional Vue components are nothing more than render functions. Because of this, it can be tedious to attach pieces from your placeholder element like styles and classes. The simplest solution to this problem, is to use the `bindAll` method. This will attach all classes, styles, directives, and events to your component's dom element.

```js
import functional from 'spyfu-vue-functional';

export default {
    functional: true,
    render(h, context) {
        return <div { ...functional.bindAll(context) }>
            Hello!
        </div>;
    },
};
```

> **Note:** The above example uses JSX. To enable this syntax, [see documentation here](https://github.com/vuejs/babel-plugin-transform-vue-jsx).

If you're only interested in binding part of the placeholder element, the following methods are also available.

- `bindAttributes`
- `bindDirectives`
- `bindEventListeners`
- `bindClasses`
- `bindDynamicClasses`
- `bindStaticClasses`
- `bindStyles`
- `bindDynamicStyles`
- `bindStaticStyles`

### License

[MIT](https://github.com/spyfu/spyfu-vuex-helpers/blob/master/LICENSE)

Copyright (c) 2017-present, [SpyFu](https://spyfu.com)
