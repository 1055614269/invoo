<template>
  <div id="App">
    <div class="body">
      <a-form-item>
        <!-- <a-icon type="user" />
        <a-input placeholder="请输入手机号"></a-input>-->
        <a-input
          placeholder="请输入手机号"
          :value="value"
          @touchstart.native.stop="show = true;show1 = false;"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.35)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <div class="yzm">
          <a-input
            placeholder="请输入短信验证码"
            :value="phone"
            @touchstart.native.stop="show1 = true;show = false;"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.35)" />
          </a-input>
          <a
            class="login-form-forgot"
            v-on:click="onObtain"
            :disabled="isObtain.obtain"
            href="JavaScript:;"
          >{{isObtain.text}}</a>
        </div>
      </a-form-item>

      <van-number-keyboard :show="show" v-model="value" :maxlength="11" @blur="show = false" />
      <van-number-keyboard
        :show="show1"
        theme="custom"
        v-model="phone"
        :maxlength="6"
        close-button-text="登录"
        @blur="show1 = false"
        @input="onInput"
        @delete="onDelete"
      />
      <div class="zs">
        <a-icon type="info-circle" style="color:#2d98ff" />请登录用户确认已经成为入驻供应商，否则无法使用该功能，请优先前往pc端入驻
      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="toUser" class="login-form-button">立即登录</a-button>
      </a-form-item>
    </div>
    <!-- <van-popup v-model="show2">本功能只对已入驻的供应商开放，如果想使用该功能，请前往电脑端申请入驻，申请入驻链接: http://www.1234.com</van-popup> -->
  </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
  name: "App",
  data() {
    return {
      typeName: "app",
      username: "",
      phone: "",
      value: "",
      show: false,
      show1: false,
      show2: false,
      isObtain: {
        obtain: false,
        text: "立刻获取"
      }
    };
  },

  //加载后执行
  mounted() {

  },
  methods: {
    toUser() {
    //   show2 = true;
      Dialog.alert({
        message: "本功能只对已入驻的供应商开放，如果想使用该功能，请前往电脑端申请入驻，申请入驻链接: http://www.1234.com"
      }).then(() => {
        // on close
      });
    },
    onInput(value) {
      //   Toast(value);
      // this.show1= false
    },
    onDelete() {
      //   Toast("删除");
      // this.show1= false
    },

    onObtain() {
      var _this = this;
      var i = 0;
      var r = 60;
      _this.isObtain.text = "还剩" + r + "s";
      _this.isObtain.obtain = true;
      let timename = setInterval(() => {
        r -= 1;
        if (r > i) {
          _this.isObtain.text = "还剩" + r + "s";
        } else if (r == i) {
          _this.isObtain.obtain = false;
          _this.isObtain.text = "重新获取";
          clearInterval(timename);
        }
      }, 1000);
    }
  },
  //加载前执行
  created() {}
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>






