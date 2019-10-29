import Vue from 'vue';
//组件测试
Vue.component('child',{
    props:['name'],
    template:'<span>{{name}}</span>'
  })