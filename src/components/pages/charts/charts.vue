<template>
  <div class="x-bar">
    <div :id="id" :option="option"></div>
  </div>
</template>
<script>
import HighCharts from "highcharts";
export default {
  data() {
    return {
      op: true,
      chart: null
    };
  },
  // 验证类型
  props: {
    id: {
      type: String
    },
    option: {
      type: Object
    }
    
  },
  watch: {
    option() {
      this.chart = HighCharts.chart(this.id, this.option);
    }
  },
  mounted() {
    if(this.option) this.chart = HighCharts.chart(this.id, this.option);
  },
  methods: {
    update() {
      //  return HighCharts.chart(this.id, this.option);
    }
  }
};
</script>
<style scoped lang="less">
.x-bar {
  height: 100%;
  width: 100%;
  div {
    height: 100%;
    width: 100%;
  }
}
</style>