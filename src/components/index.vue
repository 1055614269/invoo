<template>
  <div id="tabBar">
    <!-- <home Keys="1"></home> -->
    <div>用户聊天测试 用户名：{{userName}}</div>
    <div class="user-s">
      <span>
        <button v-on:click="clickButtonUser('@all','@all')">@all</button>
      </span>
      <span v-for="(user,index) of Users" :key="index">
        <button v-if="userName !== user.userName" v-on:click="clickButtonUser(user.userName,user.id)">{{user.userName}}</button>
      </span>
    </div>
    <div>
      <div>发送对象：{{inputValue}}</div>
      <textarea readonly style="width:600px;height:400px;" v-model="text"></textarea>
    </div>
    <input style="text" @input="inputFun" />
    <button v-on:click="clickButton">发送消息</button>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      typeName: "首页",
      inputValue: "@all",
      Value: "",
      UserId: "@all",
      text:"",
      userName:
        "User" +
        new Date().getMilliseconds() +
        "_" +
        Math.floor(Math.random() * new Date().getMilliseconds()),
      Users: [],
      id: ""
    };
  },

  //加载后执行
  mounted() {
    // this.$socket.emit("start", loginId); //触发socket连接
 
    this.sockets[this.$socket.id] = function(_d) {
      console.log("user````````", _d);
      this.Users = _d.Users;
    };
    this.$socket.emit("start", { userName: this.userName }); //触发start
  },
  sockets: {
    connect() {
      this.id = this.$socket.id;
    },
    message(data) {
      //监听message事件，方法是后台定义和提供的
      console.log(data);
    },

    connect:function(_d) {//与socket.io连接后回调
      console.log('socket connected',_d);
    },
    login: function(_d) {
      console.log("user", _d);
      this.Users = _d.Users;
    },
    _value: function(_d) {
      let date = new Date();
      this.text+= ' [发送人：'+_d.Data.userName + (_d.Data.PrivateChat?">>>" + _d.Data.Name : "") +'] : ' + _d.Data.value + (_d.Data.PrivateChat?" [私信]":"") + ' ' +'\n' //「'+date.format('yyyy-MM-dd') + ' ' + date.toLocaleTimeString()+ '」
      console.log(_d);
    }
  },

  methods: {
    clickButton: function(val) {
      //添加按钮事件向服务端发送数据
      this.$socket.emit(this.$socket.id, { id: this.UserId, val: this.Value,userName: this.inputValue}); //监听connect事件
      // this.$socket.emit("login", "11111");
    },
    clickButtonUser: function(userName, id) {
      this.UserId = id;
      this.inputValue = userName;
    },
    inputFun(e) {
      //e.target 指向了dom元素
      this.Value = e.target.value;
      // ...
    }
  },
  //加载前执行
  created() {
    //获取本地json数据
    // let _this = this;
    // this.$http.get("./static/data.json").then(res => {
    //   //用axios的方法引入地址
    //   _this.imageList = res.data.img;
    //   //赋值
    //   console.log(res);
    // });
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>



