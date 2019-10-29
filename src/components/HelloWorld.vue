<template>
  <div class="hello">
   <a-button type="primary">
      Button
      <a-icon type="down" />
    </a-button>
    
    <a-date-picker @change="onChange" />
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    onChange(date, dateString) {
      this.$message.success(dateString);
      console.log(date, dateString);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
