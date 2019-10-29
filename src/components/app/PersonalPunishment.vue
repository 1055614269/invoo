<template>
  <div v-if="!isPunishment" id="PersonalPunishment">
    <div class="body">
      <div class="to">
        <div class="ss">
          <van-button @click="isDate=!isDate" round hairline class>
            本月
            <van-icon name="arrow-down" />
          </van-button>
        </div>
        <div class="sb">
          <div class="d">次数：2</div>
          <div class="d">金额：800</div>
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
    </div>
    <div class="nr">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!--  @click="onAppealData('大桥工地'+item)" -->
        <div
          class="gdxx"
          @click="onPunishmentData('大桥工地'+item)"
          v-for="item in list"
          :key="item"
          :title="item"
        >
          <!-- <div class="gdxx-body">
            <span style="float: left;">大桥工地{{item}}</span>
            <span class="dz" style="float: right;">申诉中</span>
             :style="val.state==='1'?'color:#0bbe79':val.state==='2'?'color:#e98337':val.state==='3'?'color:red':val.state==='4'?'color:#d2d2d2':''"
          </div>-->
          <van-row>
            <van-col class="imgType" span="4">
              <van-image @click="isUserDaya=true" round width="4rem" height="4rem" :src="userImg" />
            </van-col>
            <van-col span="14">
              <div class="flex">
                <div class="tob">
                  <div class="zt">
                    <h2>大桥工地 {{item}}</h2>
                  </div>
                </div>
                <div class="xnr">
                  <div class="zt">噪声超标</div>
                </div>
                <div class="d zt">上海市徐汇区大桥工地 &nbsp;&nbsp; 今天 10:17</div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="dj">
                <span>
                  <h2>
                    <b>￥120</b>
                  </h2>
                  <!-- $120 -->
                </span>
                <span style="color:red">未缴纳</span>

                <span style="float: right;">
                  <van-icon name="arrow" />
                </span>
              </div>
            </van-col>
          </van-row>
          <!-- <div class="imgType"></div> -->
        </div>
      </van-list>
    </div>
  </div>

  <div v-else-if="isPunishment" class="PersonalPunishment">
    <van-nav-bar left-text="返回" left-arrow @click-left="isPunishment=false" />
    <div class="nr">
      <h1>{{PunishmentName}}</h1>
      <span class="d">
        <h2>
          ￥120
        </h2>
      </span>
      <span style="color:red">未缴纳</span>
    </div>
    <div class="cell">
      <van-cell-group>
        <van-cell title="处罚原因" value="噪音超标" />
        <van-cell title="设备工地" value="上海市徐汇区大桥工地" />
        <van-cell title="处罚时间" value="2019年7月16日" />
        <van-cell title="超标时间" value="2019年7月16日15:30" />
        <van-cell title="超标时长" value="5.3h" />
        <van-cell title="详细地址" value="上海市徐汇区梅陇路130号" />
      </van-cell-group>
    </div>

        <van-button class="button" type="danger">立即缴款</van-button>
  </div>
</template>

<script>
export default {
  name: "PersonalPunishment",
  data() {
    return {
      typeName: "处罚记录",
      list: [],
      show: false,
      loading: false,
      finished: false,

      isDate: false,
      minDate: new Date(1999, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),

      userImg: "https://img.yzcdn.cn/vant/cat.jpeg",

      isPunishment: false,
      PunishmentName: ""
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
    onConfirm(value) {
      this.isDate = false;
    },
    onPunishmentData(name) {
      this.isPunishment = true;
      this.PunishmentName = name;
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
      return value;
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






