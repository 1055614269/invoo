<template>
  <div id="app">
    <!-- <a-switch checkedChildren="白色" unCheckedChildren="深色" v-on:click="clickColor" defaultChecked /> -->
    <!-- <img src="./assets/logo.png"> -->
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>


<script>
import "./App.css";
// import Vue from 'vue'
// import DatePicker from 'ant-design-vue';

import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
// Vue.use(DatePicker);
export default {
  name: "App",
  data() {
    return {
      locale: zhCN
    };
  },
  methods: {
    clickColor: function(Y) {
      if (Y) {
        document.body.style.setProperty("--themeColor", "#fff");
      } else {
        document.body.style.setProperty("--themeColor", "#2b2d51");
      }
    }
  }
};
</script>

<style scoped lang="less">
@import "./App.less";


</style>

