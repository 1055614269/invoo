<template>
  <div id="EquipmentData">
    <div class="body">
      <div class="logo">
        <div class="yxts">
          <h1>
            200
            <span>天</span>
          </h1>
          <span>运行总天数</span>
        </div>
        <img class="Rotation img" src="../../../static/img/gdt.png" width="128" height="128" />
      </div>
      <div class="sbsl">
        <a-row type="flex" justify="center">
          <a-col :span="6">
            <h3>
              150
              <span>台</span>
            </h3>
            <span>安装设备数</span>
          </a-col>
          <a-col :span="6">
            <h3>
              131
              <span>台</span>
            </h3>
            <span>安全运行天数</span>
          </a-col>
          <a-col :span="6">
            <h3>
              19
              <span>次</span>
            </h3>
            <span>超标次数</span>
          </a-col>
          <a-col :span="6">
            <h3>
              19
              <span>次</span>
            </h3>
            <span>处罚次数</span>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="sbsj">
      <div class="sj">
        <span style="float: left;">2019年08月26日</span>
        <span style="float: right;">10:00</span>
      </div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        <div class="gdxx" @click="$router.push({ path:`/Equipment/${item}`})" v-for="item in list" :key="item" :title="item">
          <div class="gdxx-body">
            <span style="float: left;">大桥工地{{item}}</span>
            <span class="dz" style="float: right;">杭州市江干区大桥工地</span>
          </div>
          <div class="flex">
            <a-row type="flex" justify="center">
              <a-col :span="8">
                <h2>131</h2>
                <span class="dz">PM10</span>
              </a-col>
              <a-col :span="8">
                <h2>67</h2>
                <span class="dz">PM2.5</span>
              </a-col>
              <a-col :span="8">
                <h2>266</h2>
                <span class="dz">TSP</span>
              </a-col>
            </a-row>
          </div>
        </div>
      </van-list>
    </div>

    <!-- <div v-if="show" class="stdata">
      <div class="nr-body">
        <van-nav-bar title="大桥工地" left-text="返回" left-arrow @click-left="onClickLeft" />
      </div>
    </div> -->
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  name: "EquipmentData",
  data() {
    return {
      typeName: "设备数据",
      list: [],
      show: false,
      loading: false,
      finished: false
    };
  },

  //加载后执行
  mounted() {},
  methods: {

    toUser() {},
    onInput(value) {
      //   Toast(value);
      // this.show1= false
    },
    onDelete() {
      //   Toast("删除");
      // this.show1= false
    },

    onObtain() {},
    onLoad() {
      
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 100) {
          this.finished = true;
        }
      }, 500);
    }
  },
  //加载前执行
  created() {}
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>






