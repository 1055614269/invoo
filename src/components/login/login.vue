<template>
  <div class="login">
    <div class="login-logo">
      <div>
        <img style="height: 100%" src="../../../static/img/logo_0.png" />
      </div>
      <div style="border-left: 1px solid #CFCFCF">云和智慧环保监测系统</div>
    </div>
    <div class="login-user">
      <div class="user-logo">
        <img src="../../../static/img/login_1.png" />
      </div>
      <div class="user-form">
        <div class="user" v-if="status === 1">
          <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
          >
            <a-form-item>
              <a-input
                v-decorator="[ 'UserName', { rules: [{ required: true, message: '请输入您的用户名!'}],initialValue: UserName }]"
                placeholder="请输入用户名"
              >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.35)" />
              </a-input>
            </a-form-item>
            <a-form-item validate-status="error" :help="isTs?'账号或密码错误':''">
              <a-input
                v-decorator="[ 'UserPwd', { rules: [{ required: true, message: '请输入密码!'}],initialValue: UserPwd}]"
                type="password"
                placeholder="请输入密码"
              >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.35)" />
              </a-input>
            </a-form-item>
            <a-form-item style="top: -20px">
              <a-checkbox
                style="float: left"
                v-decorator="['remember',{valuePropName: 'checked',initialValue: remember}]"
              >记住密码</a-checkbox>
              <a class="login-form-forgot" v-on:click="status=2" href="JavaScript:;">忘记密码</a>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" class="login-form-button">登录</a-button>
              <div>
                没有账号？
                <a v-on:click="status=4" href="JavaScript:;">立刻注册</a>
              </div>
            </a-form-item>
          </a-form>
          <div class="yjlr">
            <a @click="guestsLogins">一键登录</a>（游客）
          </div>
        </div>
        <div class="retrieve" v-if="status === 2">
          <a-form-item>
            <div class="zhmm">找回密码</div>
          </a-form-item>
          <a-form-item validate-status="error" :help="istelephone?'手机号码有误':''">
            <a-input
              :value="telephone"
              v-on:change="onChangeWJTelephone"
              maxlength="11"
              placeholder="请输入手机号"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <div class="yzm">
              <a-input
                maxlength="6"
                :value="TZMtelephone"
                v-on:change="onChangeTZMTelephone"
                placeholder="请输入短信验证码"
              ></a-input>
              <!-- <a class="login-form-forgot" v-on:click href="JavaScript:;">立刻获取</a> -->
              <a
                class="login-form-forgot"
                v-on:click="onWJMobile"
                :disabled="isObtain.obtain"
                href="JavaScript:;"
              >{{isObtain.text}}</a>
            </div>
          </a-form-item>

          <a-button
            type="primary"
            html-type="submit"
            v-on:click="status=3"
            class="login-form-button"
          >下一步</a-button>
        </div>
        <div class="new-password" v-if="status === 3">
          <a-form-item>
            <div class="zhmm">找回密码</div>
          </a-form-item>
          <a-form-item validate-status="error" :help="ispassword?'两次输入密码不一致':''">
            <a-input
              :defaultValue="User_password"
              :value="User_password"
              @change="onUserPassword"
              type="password"
              placeholder="请输入新密码（至少6位）"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <div class="yzm">
              <a-input
                :defaultValue="password"
                :value="password"
                @change="onPassword"
                type="password"
                placeholder="请重新输入新密码"
              ></a-input>
            </div>
          </a-form-item>

          <a-button
            type="primary"
            html-type="submit"
            class="login-form-button"
            @click="onUptPwd"
          >重置密码</a-button>
        </div>

        <div class="retrieve" v-if="status === 4">
          <a-form-item>
            <div class="zhmm">验证手机号</div>
          </a-form-item>
          <a-form-item validate-status="error" :help="addUser.isUser_telephone?'手机号码有误':''">
            <a-input
              :value="addUser.User_telephone"
              v-on:change="onChangeTelephone"
              maxlength="11"
              placeholder="请输入手机号"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <div class="yzm">
              <a-input maxlength="6" placeholder="请输入短信验证码"></a-input>
              <!-- <a class="login-form-forgot" v-on:click="onMobile" href="JavaScript:;">立刻获取</a> -->
              <a
                class="login-form-forgot"
                v-on:click="onMobile"
                :disabled="isObtain.obtain"
                href="JavaScript:;"
              >{{isObtain.text}}</a>
            </div>
          </a-form-item>

          <a-button
            type="primary"
            html-type="submit"
            v-on:click="status=5"
            class="login-form-button"
          >下一步</a-button>
        </div>
        <div class="retrieve" v-if="status === 5">
          <a-form-item>
            <div class="zhmm">填写账号信息</div>
          </a-form-item>
          <a-form-item>
            <a-input
              :defaultValue="addUser.User_name"
              :value="addUser.User_name"
              @change="onChangeName"
              placeholder="请输入用户名"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              :defaultValue="addUser.User_password"
              :value="addUser.User_password"
              @change="onChangePassword"
              type="password"
              placeholder="请输入密码（至少6位）"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              :defaultValue="addUser.password"
              :value="addUser.password"
              @change="onpassword"
              type="password"
              placeholder="请再次输入密码"
            ></a-input>
          </a-form-item>

          <a-button
            type="primary"
            html-type="submit"
            v-on:click="onAddUser"
            class="login-form-button"
            :disabled="addUser.isUser_password"
          >立即注册</a-button>
        </div>
      </div>
    </div>
    <!-- <h1>{{ name }}</h1>
    <h2>hello</h2>
    用户名：<input v-focus type="text" v-model="userName" >
    密码：<input v-focus type="text" v-model="age" >
    <br />
    <button @click="logUser">登入</button>
    <button @click="addUser">添加</button>
    <button @click="deleteUser">删除</button>
    <button @click="upUser">更新</button>
    <button @click="getUser">查询所有</button>
     <br />
    <router-link to="/">返回首页</router-link>-->

    <!-- <table border="2">
      <tr v-for="(val,i) in user" :key="i">
        <td>{{i+1}}</td>
        <td>{{val.userName}}</td>
      </tr>
    </table>-->
  </div>
</template>

<script>
import util from "../../http.utils.js";
// import { Icon, Input, Button } from "ant-design-vue";
export default {
  // name: "/",
  // components: {
  //   [Input.name]: Input,
  //   [Button.name]: Button,
  //   [Icon.name]: Icon
  // },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      name: "login",
      status: 1,
      UserName: "",
      UserPwd: "",
      telephone: "18324447823",
      istelephone: "",
      User_password: "",
      TZMtelephone: "",
      password: "",
      ispassword: false,
      addUser: {
        User_telephone: "18324447823",
        isUser_telephone: false,
        User_name: "",
        User_password: "",
        password: "",
        isUser_password: true
      },
      isTs: false,
      age: "",
      user: [],
      remember: false,
      isObtain: {
        obtain: false,
        text: "立刻获取"
      }
    };
  },
  methods: {
    tologin() {
      var user = {
        UserName: "游客"
      };
      this.cookies.set("tologin", user, "7d");
      // var user = this.cookies.get("tologin");
      this.$router.push({ path: "/HomePage" });
    },
    handleSubmit(e) {
      var _this = this;
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("登录信息: ", values);
          var UserName = values.UserName;
          var UserPwd = _this.$md5(values.UserPwd);

          this.$http
            .post(
              process.env.API_HOST + "/Login/Logins",
              {
                UserName: UserName,
                UserPwd: UserPwd
              },
              {}
            )
            .then(response => {
              var data = response.data;
              var _d = response.data.Data;
              if (data.Code === 1) {
                // _d.User_Id = values.User_Id;
                _d.UserName = values.UserName;
                _d.remember = values.remember;
                if (values.remember) {
                  _d.UserPwd = values.UserPwd;
                }
                _d.token = data.Token;
                this.isTs = false;
                this.$cookies.set("User", _d, "7d");
                this.$router.push({ path: "/HomePage" });
              } else {
                _this.isTs = true;
              }
            });
        }
      });
    },
    guestsLogins() {
      var _this = this;
      this.$http
        .post(process.env.API_HOST + "Login/GuestsLogins")
        .then(response => {
          var data = response.data;
          var _d = response.data.Data;
          if (data.Code === 1) {
            // _d.User_Id = values.User_Id;
            _d.UserName = _this.UserName;
            _d.remember = _this.remember;
            if (_d.remember) {
              _d.UserPwd = _this.UserPwd;
            }
            // _d.token = _d.Token;
            _this.isTs = false;
            _this.$message.success("游客登入成功！");
            _this.$cookies.set("User", _d, "7d");
            _this.$router.push({ path: "/HomePage" });
          } else {
            _this.isTs = true;
          }
        });
    },
    onChangeWJTelephone(e) {
      const { value } = e.target;
      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;

      this.istelephone = false;
      if (!/^1(3|4|5|7|8)\d{9}$/.test(value)) {
        // this.$message.info("手机号码有误!");
        this.istelephone = true;
      }
      if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
        this.telephone = value;
      }
    },
    onChangeTZMTelephone() {
      const { value } = e.target;
      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
      if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
        this.telephone = value;
        if (value.length === 6) {
          P = true;
        }
      }
    },
    onChangeTelephone(e) {
      const { value } = e.target;
      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
      this.addUser.isUser_telephone = false;
      if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
        this.addUser.User_telephone = value;
      }
    },
    onChangeName(e) {
      const { value } = e.target;
      this.addUser.User_name = value;
    },
    onChangePassword(e) {
      const { value } = e.target;
      this.addUser.User_password = value;
      this.addUser.isUser_password = true;
      if (this.addUser.password === this.addUser.User_password) {
        if (this.addUser.password != "" && this.addUser.User_password != "") {
          this.addUser.isUser_password = false;
        }
      }
    },

    onpassword(e) {
      const { value } = e.target;
      this.addUser.password = value;
      this.addUser.isUser_password = true;
      if (this.addUser.password === this.addUser.User_password) {
        if (this.addUser.password != "" && this.addUser.User_password != "") {
          this.addUser.isUser_password = false;
        }
      }
    },
    onUserPassword(e) {
      const { value } = e.target;
      this.User_password = value;
      this.ispassword = true;
      if (this.password === this.User_password) {
        if (this.password != "" && this.User_password != "") {
          this.ispassword = false;
        }
      }
    },
    onPassword(e) {
      const { value } = e.target;
      this.password = value;
      this.ispassword = true;
      if (this.password === this.User_password) {
        if (this.password != "" && this.User_password != "") {
          this.ispassword = false;
        }
      }
    },

    onAddUser() {
      if (this.addUser.User_name != "") {
        var _this = this;
        util._httpPost(this, "User/AddUser", {
          User_name: this.addUser.User_name,
          User_telephone: this.addUser.User_telephone,
          User_password: this.$md5(this.addUser.password)
        }).then = function() {
          if (this.state) {
            _this.status = 1;
            _this.$message.success("注册成功", 4);
            _this.addUser.User_name = "";
            _this.addUser.User_telephone = "";
            _this.addUser.password = "";
          } else {
            _this.$message.error(this.message, 4);
          }
        };
      } else {
        this.addUser.isUser_password = true;
      }
    },
    onUptPwd() {
      var _this = this;
      util._httpPost(this, "User/UptPwd", {
        usertel: this.telephone,
        pwd: this.password
      }).then = function() {
        if (this.state) {
          _this.status = 1;
          _this.$message.success(this.message, 4);
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    retrieve() {},

    onMobile() {
      if (!/^1(3|4|5|7|8)\d{9}$/.test(this.addUser.User_telephone)) {
        // this.$message.info("手机号码有误!");
        this.addUser.isUser_telephone = true;
      } else {
        var _this = this;
        var i = 0;
        var r = 60;
        this.isObtain.text = "还剩" + r + "s";
        this.isObtain.obtain = true;
        let timename = setInterval(() => {
          r -= 1;
          if (r > i) {
            this.isObtain.text = "还剩" + r + "s";
          } else if (r == i) {
            this.isObtain.obtain = false;
            this.isObtain.text = "重新获取";
            clearInterval(timename);
          }
        }, 1000);
      }
    },
    onWJMobile() {
      if (!/^1(3|4|5|7|8)\d{9}$/.test(this.telephone)) {
        // this.$message.info("手机号码有误!");
        this.istelephone = true;
      } else {
        var _this = this;
        var i = 0;
        var r = 60;
        this.isObtain.text = "还剩" + r + "s";
        this.isObtain.obtain = true;
        let timename = setInterval(() => {
          r -= 1;
          if (r > i) {
            this.isObtain.text = "还剩" + r + "s";
          } else if (r == i) {
            this.isObtain.obtain = false;
            this.isObtain.text = "重新获取";
            clearInterval(timename);
          }
        }, 1000);
      }
    }
    // getUser() {
    //   var _this = this;
    //   // util._httpData("user/getUser",{}).then = function(){
    //   //   if(this.state){
    //   //      _this.user = this.datas
    //   //   }
    //   // }
    //   util._httpPost(this,"user/getUser",{}).then(function(_d){
    //       _this.user = _d.data
    //   })
    // // },
    // logUser() {
    //   var UserName = this.UserName;
    //   var UserPwd = this.UserPwd;
    //   this.$http
    //     .post(
    //       process.env.API_HOST + "Login/Logins",
    //       {
    //         UserName: UserName,
    //         UserPwd: UserPwd
    //       },
    //       {}
    //     )
    //     .then(response => {
    //       console.log(response);
    //     });
    // }
    // addUser() {
    //   var name = this.userName;
    //   var age = this.age;
    //   this.$http
    //     .post(
    //       process.env.API_HOST + "user/addUser",
    //       {
    //         username: name,
    //         age: age
    //       },
    //       {}
    //     )
    //     .then(response => {
    //       console.log(response);
    //       this.getUser();
    //     });
    // },
    // deleteUser() {
    //   var name = this.userName;
    //   this.$http
    //     .post(
    //       process.env.API_HOST + "user/deleteUser",
    //       {
    //         username: name
    //       },
    //       {}
    //     )
    //     .then(response => {
    //       console.log(response);
    //       this.getUser();
    //     });
    // },
    // upUser() {
    //   var name = this.userName;
    //   var age = this.age;
    //   this.$http
    //     .post(
    //       process.env.API_HOST + "user/upUser",
    //       {
    //         username: name,
    //         age: age
    //       },
    //       {}
    //     )
    //     .then(response => {
    //       console.log(response);
    //       this.getUser();
    //     });
    // }
  },
  mounted() {
    //获取用户信息
    var User = this.$cookies.get("User");
    if (!User) return;
    this.remember = User.remember;
    if (User.remember) {
      this.UserName = User.UserName;
      this.UserPwd = User.UserPwd;
    }
  }
};
</script>


<style scoped lang="less">
@import "./login.less";
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
</style>



