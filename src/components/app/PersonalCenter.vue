<template>
  <div id="PersonalCenter">
    <div v-if="!isUserDaya" class="body">
      <div class="to">
        <van-image @click="isUserDaya=true" round width="7rem" height="7rem" :src="userImg" />
        <h2 @click="isUserDaya=true">杭州茵沃股份有限公司</h2>
        <span class="qm">签名站位签名站位签名站位签名站位签名站位签名站位签名站位</span>
        <div class="sb">
          <a-row class="flex-data" type="flex" justify="center">
            <a-col :span="6">
              <h2>
                2
                <span class="dz">个</span>
              </h2>
              <span class="dz">工地数</span>
            </a-col>
            <a-col :span="6">
              <h2>
                7
                <span class="dz">台</span>
              </h2>
              <span class="dz">正常设备</span>
            </a-col>
            <a-col class="jt" :span="6">
              <h2>
                2
                <span class="dz">台</span>
              </h2>
              <span class="dz">故障设备</span>
            </a-col>
            <a-col :span="6">
              <router-link to="/PersonalEquipment">
                <h2>
                  <van-icon name="desktop-o" />
                </h2>
                <span class="dz">我的设备</span>
              </router-link>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="cell">
        <van-cell-group>
          <router-link to="/PersonalPunishment">
            <van-cell icon="description" title="处罚记录" is-link />
          </router-link>
          <router-link to="/PersonalAppeal">
            <van-cell icon="description" title="申诉记录" is-link />
          </router-link>
        </van-cell-group>
      </div>
      <div class="cell">
        <van-cell-group>
          <van-cell icon="phone-o" title="联系客服" is-link />
        </van-cell-group>
      </div>
    </div>

    <div v-if="isUserDaya" class="userData">
      <van-nav-bar left-text="返回" left-arrow @click-left="isUserDaya=false" />
      <div class="cell">
        <van-cell title="头像" center>
          <van-image round width="7rem" height="7rem" :src="userImg" />
        </van-cell>
      </div>
      <div class="cell">
        <van-cell-group>
          <van-cell title="公司名称" value="杭州茵沃股份有限公司" />
          <van-cell title="签名" @click="dialogShow=true" :value="message" is-link />
          <van-cell title="手机号" value="18324447823" />
        </van-cell-group>
      </div>
      <van-button class="button" type="danger">退出登录</van-button>

      <van-dialog v-model="dialogShow" @confirm="onInput" title="编辑签名" show-cancel-button>
        <div class="qm">
          <van-cell-group class="field">
            <van-field
              v-model="message"
              type="textarea"
              placeholder="请输入签名"
              rows="1"
              maxlength="30"
              autosize
            />
          </van-cell-group>
          <van-icon name="info" />
          <span>签名字数不超过30字，建议签名能体现公司特点</span>
        </div>
      </van-dialog>
    </div>
  </div>
 
</template>

<script>
export default {
  name: "PersonalCenter",
  data() {
    return {
      typeName: "个人中心",
      userImg: "https://img.yzcdn.cn/vant/cat.jpeg",
      isUserDaya: false,
      dialogShow: false,
      message: "签名站位"
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
    }
  },
  //加载前执行
  created() {}
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>






