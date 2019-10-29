<template>
  <div id="BigScreen">
      <div class="login-logo">
        <div>
          <img style="height: 100%" src="../../../static/img/logo_0.png" />
        </div>
        <div style="border-left: 1px solid rgb(232, 232, 232)">上海市扬尘在线监测数据平台</div>
        <div class="fh"> <a-button type="primary" @click="$router.push('/HomePage')">进入系统</a-button></div>
      </div>

      <div class="body">
          <div class="dt">

          </div>
           <div class="ts">

          </div>
          <div class="data-tu">

          </div>
           <div class="data-tu margin023">

          </div>
           <div class="data-tu">

          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "BigScreen",
  data() {
    return {
      typeName: "BigScreen"
    };
  },

  //加载后执行
  mounted() {},
  methods: {},
  //加载前执行
  created() {}
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>



