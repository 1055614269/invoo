<template>
  <div v-if="!isAppeal" id="PersonalAppeal">
    <div class="body">
      <div class="to">
        <div class="ss">
          <!-- <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
            <van-dropdown-item v-model="value2" :options="option2" />
          </van-dropdown-menu>-->
          <van-button @click="isDate=!isDate" round hairline class>
            <!-- {{formatter(currentDate)}} -->
            本月
            <van-icon name="arrow-down" />
          </van-button>
        </div>
        <div class="sb">
          <div class="d">申诉次数：2</div>
          <div class="d">申诉成功：2</div>
        </div>
      </div>
      <van-datetime-picker
        v-model="currentDate"
        v-show="isDate"
        style="margin-bottom: 10px;"
        type="year-month"
        @cancel="isDate=false"
        @confirm="onConfirm"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
      />
      <div class="nr">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <!--   @click="onEquipmentData('大桥工地'+item)" -->
          <div
            class="gdxx"
            @click="onAppealData('大桥工地'+item)"
            v-for="item in list"
            :key="item"
            :title="item"
          >
            <div class="gdxx-body">
              <span style="float: left;">大桥工地{{item}}</span>
              <span class="dz" style="float: right;">申诉中</span>
              <!--  :style="val.state==='1'?'color:#0bbe79':val.state==='2'?'color:#e98337':val.state==='3'?'color:red':val.state==='4'?'color:#d2d2d2':''" -->
            </div>
            <div class="flex">
              <div>设备工地：上海市徐汇区大桥工地</div>
              <div>
                处罚时间：2019年08月29日12:37:00
                <span style="float: right;">
                  处罚金额：
                  <b style="color:red">￥120</b>
                </span>
              </div>
              <div>处罚原因：噪声超标</div>
              <div>申诉原因：设备出现故障，数据不准</div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
  <div v-else-if="isAppeal" class="PersonalAppeal">
    <van-nav-bar left-text="返回" left-arrow @click-left="isAppeal=false" />
    <div class="nr">
        <div class="tb"><van-icon name="newspaper-o" /></div>
      <h1>申诉中</h1>
      <span class="d">申诉原因:设备出现故障，数据不准</span>
    </div>
    <div class="cell">
      <van-cell-group>
        <van-cell title="设备工地" value="上海市徐汇区大桥工地." />
        <van-cell title="处罚时间" value="2019年7月15日" />
        <van-cell title="处罚金额" value="￥120" />
        <van-cell title="处罚原因" value="处罚原因说明" />
        <van-cell title="超标时间" value="超标时间说明" />
        <van-cell title="超标时长" value="5.3h" />
        <van-cell title="详细地址" value="上海市徐汇区梅陇路130号" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalAppeal",
  data() {
    return {
      typeName: "申诉记录",
      list: [],
      show: false,
      loading: false,
      finished: false,

      isDate: false,
      isAppeal: false,
      AppealName: "",

      minDate: new Date(1999, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
    };
  },

  //加载后执行
  mounted() {},
  methods: {
    onConfirm(value) {
      this.isDate = false;
    },
    onDelete() {
      //   Toast("删除");
      // this.show1= false
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
      return value;
    },
    onAppealData(name) {
      this.isAppeal = true;
      this.AppealName = name;
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
  created() {}
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>






