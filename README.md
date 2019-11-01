
# invoo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# npm install --save vant 
vant 安装 如cpm安装失败 可以尝试使用cnpm


# 当前项目使用的框架与组件
``` bash
# 如果你的网络环境不佳，推荐使用 cnpm。

# css框架 Ant Design of Vue
npm install ant-design-vue --save  或 yarn add ant-design-vue
网址：https://vue.ant.design/docs/vue/introduce/

#less
npm install less less-loader --save  或 yarn add less less-loader

#axios
npm install axios --save  或 yarn add axios

#jquery
npm install jquery --save  或 yarn add jquery


```

# 注意事项 node_modules 修改
``` bash
#安装了npm install --save xlsx-style
会报错：This relative module was not found: ./cptable in ./node_modules/xlsx-style@0.8.13@xlsx-style/dist/cpexcel.js
可以直接修改源码：
在\node_modules\xlsx-style\dist\cpexcel.js 807行 的 var cpt = require(’./cpt’ + ‘able’); 改成 var cpt = cptable;

```

