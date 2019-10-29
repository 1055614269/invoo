<template>
  <div v-if="!isEquipment" id="PersonalEquipment">
    <div class="body">
      <div class="to">
        <div class="ss">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
            <van-dropdown-item v-model="value2" :options="option2" />
          </van-dropdown-menu>
        </div>
        <div class="sb">
          <span>
            正常
            <span class="d">
              <span class="_d">7</span>台
            </span>
          </span>
          <span>
            故障
            <span class="d">
              <span class="_d">2</span>台
            </span>
          </span>
        </div>
      </div>
      <div class="nr">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <!--  @click="$router.push({ path:`/Equipment/${item}`})"/> -->
          <div
            class="gdxx"
            @click="onEquipmentData('大桥工地'+item)"
            v-for="item in list"
            :key="item"
            :title="item"
          >
            <div class="gdxx-body">
              <span style="float: left;">大桥工地{{item}}</span>
              <span class="dz" style="float: right; color:#0bbe79">正常</span>
              <!--  :style="val.state==='1'?'color:#0bbe79':val.state==='2'?'color:#e98337':val.state==='3'?'color:red':val.state==='4'?'color:#d2d2d2':''" -->
            </div>
            <div class="flex">
              <div>设备工地：上海市徐汇区大桥工地</div>
              <div>
                正常运行天数：120天
                <span style="float: right;">超标次数：12</span>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
  <div v-else-if="isEquipment" class="PersonalEquipment">
    <van-nav-bar left-text="返回" left-arrow @click-left="isEquipment=false" />
    <div class="nr">
      <h1>{{EquipmentName}}</h1>
      <span class="d">上海市徐汇区大桥工地</span>
    </div>
    <div class="cell">
      <van-cell-group>
        <van-cell title="设备状态" value="正常" />
        <van-cell title="超标次数" value="12" />
        <van-cell title="正常运行天数" value="120" />
        <van-cell title="详细地址" value="上海市徐汇区梅陇路130号" />
        <van-cell title="安装时间" value="2019年04月29日" />
        <van-cell title="维修次数" value="1" />
      </van-cell-group>
    </div>
  </div>
</template>


<script>
export default {
  name: "PersonalEquipment",
  data() {
    return {
      typeName: "我的设备",
      list: [],
      show: false,
      loading: false,
      finished: false,

      value1: 0,
      value2: "a",
      option1: [
        { text: "全部工地", value: 0 },
        { text: "杭州市", value: 1 },
        { text: "上海市", value: 2 }
      ],
      option2: [
        { text: "全部设备", value: "a" },
        { text: "正常设备", value: "b" },
        { text: "故障设备", value: "c" },
        { text: "超标设备", value: "d" },
        { text: "离线设备", value: "e" }
      ],

      isEquipment: false,
      EquipmentName: ""
    };
  },

  //加载后执行
  mounted() {},
  methods: {
    onInput(value) {

      //   Toast(value);
      // this.show1= false
    },
    onDelete() {
      //   Toast("删除");
      // this.show1= false
    },
    onEquipmentData(name) {
      this.isEquipment = true;
      this.EquipmentName = name;
    },
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
  created() {
    for (var i = 0; i < 100; i++) {
      this.option1.push({ text: "杭州市" + i, value: i + 2 });
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>






