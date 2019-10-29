<template>
  <div id="home">
    <a-layout id="components-layout-demo-fixed">
      <!-- style="display: none;" -->
      <a-layout-header :style="{ position: 'fixed', zIndex: 1000, width: '100%' }">
        <img @click="onImgClick" class="logo" src="../../../static/img/logo_0.png" />
        <a-menu theme="light" mode="horizontal" v-model="Keys" @click="isKeys">
          <a-menu-item key="HomePage">首页</a-menu-item>
          <a-menu-item key="xx">
            <a-badge :dot="newsNumber>0">消息</a-badge>
          </a-menu-item>
          <!--  -->
          <a-menu-item v-show="Role_Id>2" key="gysrz">入驻申请</a-menu-item>
          <a-menu-item v-show="Role_Id==1" key="gysgl">供应商管理</a-menu-item>
          <!-- <a-menu-item > -->
          <a-sub-menu
            v-show="Role_Id<=2"
            :class="(Keys[0]==='jrcb'||Keys[0]==='lscb'||Keys[0]==='sbsj')?'xz':'_xz'"
            title="数据管理"
            key="jrcb"
          >
            <a-menu-item key="sbsj">设备数据</a-menu-item>
            <a-menu-item key="jrcb">今日超标</a-menu-item>
            <a-menu-item key="lscb">七天超标</a-menu-item>
          </a-sub-menu>
          <!-- </a-menu-item> -->

          <!-- <a-menu-item v-show="Role_Id<=2" key="gdgl">工地管理</a-menu-item>
          <a-menu-item v-show="Role_Id<=2" key="sbxx">设备信息</a-menu-item>-->
          <a-sub-menu
            v-show="Role_Id<=2"
            :class="(Keys[0]==='gdgl'||Keys[0]==='sbxx')?'xz':'_xz'"
            title="工地管理"
            key="gdgl"
          >
            <a-menu-item v-show="Role_Id<=2" key="gdgl">工地信息</a-menu-item>
            <a-menu-item v-show="Role_Id<=2" key="sbxx">设备信息</a-menu-item>
          </a-sub-menu>

          <a-menu-item v-show="Role_Id<=2" key="zdgz">重点关注</a-menu-item>
        </a-menu>
        <div class="user">
          <user />
        </div>
      </a-layout-header>
    </a-layout>

    <a-modal title="资料修改" v-model="visible" @ok="handleOk" :bodyStyle="{padding:'5px'}">
      <div class="xgzl">
        <div>昵称</div>
        <div class="sr">
          <a-input placeholder="昵称" defaultValue="PPT" />
        </div>

        <div>姓名</div>
        <div class="sr">
          <a-input placeholder="姓名" defaultValue="王小勇" />
        </div>

        <div>性别</div>
        <div class="sr">
          <!-- <a-input placeholder="性别" /> -->
          <a-select labelInValue :defaultValue="{ key: '保密' }" @change="handleChange">
            <a-select-option value="保密">保密</a-select-option>
            <a-select-option value="男">男</a-select-option>
            <a-select-option value="女">女</a-select-option>
          </a-select>
        </div>

        <div>生日</div>
        <div class="sr">
          <a-date-picker
            @change="onChangeSr"
            placeholder="生日"
            :defaultValue="moment('2015-06-06', 'YYYY-MM-DD')"
          />
        </div>

        <div>职务</div>
        <div class="sr">
          <a-input placeholder="职务" />
        </div>

        <div>部门</div>
        <div class="sr">
          <a-input placeholder="部门" />
        </div>

        <div>电话</div>
        <div class="sr">
          <a-input placeholder="电话" />
        </div>

        <div>邮箱</div>
        <div class="sr">
          <a-input placeholder="邮箱" type="email" step="1" />
        </div>
      </div>
    </a-modal>
    <!-- 聊天系统 SRTAT-->
    <div class="user_chat_content">
      <div class="user_list" @click="on_chat_Interface">
        <a-icon type="team" />
      </div>
      <div class="user_list">
        <a-popover placement="leftTop">
          <template slot="content">
            <!-- <p>Content</p>
            <p>Content</p>-->
            <div class="user_contact_list">
              <div class="uset_list_name">
                <i style="float: left;">
                  <a-avatar
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571395506097&di=776363525de1f02344c10fc83b034de7&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201504%2F13%2F20150413H5949_CWaPL.thumb.700_0.jpeg"
                  />
                </i>
                <div style="float: left;">
                  <div class="user_name_tp">
                    <a-badge status="default" />
                    离线 {{"用户1"}}
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template slot="title">
            <span>联系列表</span>
          </template>
          <a-icon type="message" />
        </a-popover>
      </div>
      <!-- <div class="user_list">
        <a-icon type="setting" />
      </div>-->
      <!-- <div class="user_chat No-On-line">
        <a-avatar src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571395506097&di=776363525de1f02344c10fc83b034de7&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201504%2F13%2F20150413H5949_CWaPL.thumb.700_0.jpeg" />
      </div>-->
    </div>
    <div class="new_user_content_list" v-if="chat_Interface" ref="dv">
      <div class="new_user_left_top" ref="_dv">
        <div class="user_top">
          <a-icon
            @click="exhibition='1'"
            :class="exhibition==='1'?'user_top_to_type':'user_top_no_type'"
            type="message"
            theme="filled"
          />
          <!-- <a-icon
            @click="exhibition='2'"
            :class="exhibition==='2'?'user_top_to_type':'user_top_no_type'"
            type="team"
          /> -->
        </div>
        <div class="left_type">
          <!-- <span>···</span> -->
          <a-icon class="Close" @click="chat_Interface=false" type="close" />
        </div>
      </div>
      <div class="new_user_left_list">
        <div v-if="exhibition==='2'" class="user_list_collection">
          <a-collapse defaultActiveKey="1" :bordered="false">
            <template v-slot:expandIcon="props">
              <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
            </template>
            <a-collapse-panel header="茵沃公司" key="1" class="customStyle">
              <ul>
                <li class="user_name_content is_current_type">
                  <div class="user_bk">
                    <i class="user_name">
                      <a-avatar
                        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571395506097&di=776363525de1f02344c10fc83b034de7&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201504%2F13%2F20150413H5949_CWaPL.thumb.700_0.jpeg"
                      />
                    </i>
                    <div class="user_name">
                      <div class="user_name_tp">用户名</div>
                      <div class="user_name_tp to_type">
                        <a-badge status="success" />在线
                      </div>
                    </div>
                  </div>
                </li>
                <li
                  v-for="(val,key) in Users"
                  :key="key"
                  @click="onChoice(val,val.id)"
                  :class="val.Choice?'user_name_content is_current_type':'user_name_content'"
                >
                  <div class="user_bk">
                    <i class="user_name">
                      <a-avatar
                        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571395506097&di=776363525de1f02344c10fc83b034de7&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201504%2F13%2F20150413H5949_CWaPL.thumb.700_0.jpeg"
                      />
                    </i>
                    <div class="user_name">
                      <div class="user_name_tp">{{val.userName}}</div>
                      <div class="user_name_tp no_type">
                        <span v-if="val.online">
                          <a-badge status="success" />在线
                        </span>
                        <span v-if="!val.online">
                          <a-badge status="default" />离线
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </a-collapse-panel>
            <a-collapse-panel header="中控集团" key="2" class="customStyle">
              <ul>
                <li class="user_name_content">
                  <div class="user_bk">
                    <i class="user_name">
                      <a-avatar
                        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571395506097&di=776363525de1f02344c10fc83b034de7&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201504%2F13%2F20150413H5949_CWaPL.thumb.700_0.jpeg"
                      />
                    </i>
                    <div class="user_name">
                      <div class="user_name_tp">用户名</div>
                      <div class="user_name_tp no_type">
                        <a-badge status="default" />离线
                      </div>
                    </div>
                  </div>
                </li>
                <li v-for="key in 2" :key="key" class="user_name_content">
                  <div class="user_bk">
                    <i class="user_name">
                      <a-avatar
                        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571395506097&di=776363525de1f02344c10fc83b034de7&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201504%2F13%2F20150413H5949_CWaPL.thumb.700_0.jpeg"
                      />
                    </i>
                    <div class="user_name">
                      <div class="user_name_tp">用户名{{key}}</div>
                      <div class="user_name_tp no_type">
                        <a-badge status="default" />离线
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </a-collapse-panel>
          </a-collapse>
        </div>

        <div v-if="exhibition==='1'" class="certain-category-search-wrapper">
          <a-auto-complete
            class="certain-category-search"
            dropdownClassName="certain-category-search-dropdown"
            :dropdownMatchSelectWidth="false"
            :dropdownStyle="{width: '300px'}"
            size="small"
            style="width: 100%"
            placeholder="名称查询"
            optionLabelProp="value"
          >
            <template slot="dataSource">
              <a-select-opt-group v-for="group in dataSource" :key="group.title">
                <span slot="label">{{group.title}}</span>
                <a-select-option v-for="opt in group.children" :key="opt.title" :value="opt.title">
                  <div style="line-height: 40px;">
                    <i style="float: left;">
                      <a-avatar
                        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571395506097&di=776363525de1f02344c10fc83b034de7&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201504%2F13%2F20150413H5949_CWaPL.thumb.700_0.jpeg"
                      />
                    </i>
                    <div style="float: left;">
                      <div class="user_name_tp">
                        {{opt.title}}
                        <!-- <a-badge status="default" />离线 -->
                        <!-- {{opt}} -->
                        <span v-if="opt.online">
                          <a-badge status="success" />在线
                        </span>
                        <span v-if="!opt.online">
                          <a-badge status="default" />离线
                        </span>
                      </div>
                    </div>
                  </div>
                </a-select-option>
              </a-select-opt-group>
              <a-select-option disabled key="all" class="show-all"></a-select-option>
            </template>
            <a-input>
              <a-icon slot="suffix" type="search" class="certain-category-icon" />
            </a-input>
          </a-auto-complete>
        </div>
        <ul v-if="exhibition==='1'" style="margin-top: 25px;">
          <!-- <li class="user_name_content is_current_type">
            <div class="user_bk">
              <i class="user_name">
                <a-avatar src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571395506097&di=776363525de1f02344c10fc83b034de7&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201504%2F13%2F20150413H5949_CWaPL.thumb.700_0.jpeg" />
              </i>
              <div class="user_name">
                <div class="user_name_tp">用户名</div>
                <div class="user_name_tp to_type">
                  <a-badge status="success" />在线
                </div>
              </div>
            </div>
          </li>-->
          <li
            v-for="(val,key) in Users"
            :key="key"
            @click="onChoice(val,val.id)"
            :class="val.Choice?'user_name_content is_current_type':'user_name_content'"
          >
            <div class="user_bk">
              <i class="user_name">
                <a-avatar
                  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571395506097&di=776363525de1f02344c10fc83b034de7&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201504%2F13%2F20150413H5949_CWaPL.thumb.700_0.jpeg"
                />
              </i>
              <div class="user_name">
                <div class="user_name_tp">{{val.userName}}</div>
                <div class="user_name_tp no_type">
                  <span v-if="val.online">
                    <a-badge status="success" />在线
                  </span>
                  <span v-if="!val.online">
                    <a-badge status="default" />离线
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="new_user_content">
        <div class="head">
          <!-- v -->
          <span class="return_left_type" @click="user_data=false" v-if="user_data">
            <a-icon type="left" />返回
          </span>

          <span v-if="userData">
            {{userData.userName}}
            <span v-if="userData.userName" class="user_name_type to_type">
              <!-- {{opt}} -->
              <span v-if="userData.online">
                <a-badge status="success" />在线
              </span>
              <span style="color:#c6c7c5" v-if="!userData.online">
                <a-badge status="default" />离线
              </span>
              <!-- <a-badge status="success" />在线 -->
            </span>
          </span>
          <div class="left_type">
            <a-dropdown :trigger="['click']">
              <span class="an1" @click>
                <!-- <b style="color:#2d75f0">.</b>
                      <b style="color:red">.</b>
                <b style="color:#00bd74">.</b>-->
                ···
              </span>
              <a-menu slot="overlay">
                <a-menu-item key="2">
                  <div
                    class="b-img3"
                    target="_blank"
                    @click="user_data=true"
                    rel="noopener noreferrer"
                  >资料</div>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </div>
        <div v-if="user_data" class="user_type_data">
          <div>
            <a-avatar
              class="user_img"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571395506097&di=776363525de1f02344c10fc83b034de7&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201504%2F13%2F20150413H5949_CWaPL.thumb.700_0.jpeg"
            />
            <div class="user_name">用户名</div>
            <div class="user_body">
              <div>
                <a-row class="data">
                  <a-col class="t-right padding-r-10 type_name" :span="10">手机号:</a-col>
                  <a-col class="t-left" :span="12">18324447823</a-col>
                </a-row>
                <a-row class="data">
                  <a-col class="t-right padding-r-10 type_name" :span="10">邮箱号:</a-col>
                  <a-col class="t-left" :span="12">18324447823@163.com</a-col>
                </a-row>
                <a-row class="data">
                  <a-col class="t-right padding-r-10 type_name" :span="10">地址:</a-col>
                  <a-col class="t-left" :span="12">浙江省杭州市江干区解放东路90号</a-col>
                </a-row>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!user_data" class="body_content">
          <div class="scroll-pull">
            <div
              v-if="userData"
              v-for="(val,i) in userData.chat_record"
              :key="i"
              :class="val.userName===userName?'wo_user_news':'user_news'"
            >
              <span class="Box">
                <span class="Box_img">
                  <a-avatar
                    v-if="val.userName!=userName"
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571395506097&di=776363525de1f02344c10fc83b034de7&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201504%2F13%2F20150413H5949_CWaPL.thumb.700_0.jpeg"
                  />
                  <a-avatar
                    v-if="val.userName===userName"
                    src="https://thirdqq.qlogo.cn/g?b=sdk&k=32SCd9V0VULQWjO3T35jxw&s=140"
                  />
                </span>
                <div class="message2">
                  {{val.value}}
                  <br />
                  <span class="Box_date">{{val.date}}</span>
                </div>
              </span>
            </div>

            <!-- <div class="wo_user_news">
              <span class="Box">
                <span class="Box_img">
                  <a-avatar src="https://thirdqq.qlogo.cn/g?b=sdk&k=32SCd9V0VULQWjO3T35jxw&s=140" />
                </span>
                <div class="message2">
                  大家好，我是小名
                  大家好，我是小名
                  <br />
                  <span class="Box_date">2019-10-16 17:52:09</span>
                </div>
              </span>
            </div>
            -->
          </div>
        </div>

        <div v-if="!user_data" class="bottom_content">
          <div class="portlet__foot"></div>
          <a-textarea @pressEnter="GO_Text" v-model="Value" placeholder="Type here..." :rows="3" />
        </div>
      </div>
    </div>
    <!-- 聊天系统 END -->

    <!-- <div id="body"> -->
    <router-view />
    <!-- </div> -->
  </div>
</template>

<script>
let x = 0;
let y = 0;
let l = 0;
let t = 0;
let isDown = false;

import util from "../../http.utils.js";
export default {
  name: "Home",
  data() {
    // var _this = this;
    //获取用户信息
    var User = this.$cookies.get("User");
    var Role_Id = 0;
    var User_Id = "0";
    if (User) {
      Role_Id = User.Role_Id;
      User_Id = User.User_Id;
    }
    var Keys = ["HomePage"];
    var route = [
      { path: "HomePage", key: "HomePage" },
      { path: "xx", key: "xx" },
      { path: "gysgl", key: "gysgl" },
      { path: "gysrz", key: "gysrz" },
      { path: "jrcb", key: "jrcb" },
      { path: "lscb", key: "lscb" },
      { path: "sbsj", key: "sbsj" },
      { path: "gdgl", key: "gdgl" },
      { path: "sbxx", key: "sbxx" },
      { path: "zdgz", key: "zdgz" }
    ];
    var _this = this;
    route.map((_d, key) => {
      if (_this.$route.name == _d.path) {
        Keys = [_d.key];
        if (_d.key === "jrcb" || _d.key === "lscb" || _d.key === "sbsj") {
          Keys.push("cbgl");
        }
      }
    });
    const dataSource = [
      {
        title: "茵沃公司",
        children: [
          {
            title: "用户名1",
            type: true
          },
          {
            title: "用户名2",
            type: false
          }
        ]
      },
      {
        title: "好易购",
        children: [
          {
            title: "用户名3",
            type: false
          },
          {
            title: "用户名4",
            type: false
          }
        ]
      },
      {
        title: "中控集团",
        children: [
          {
            title: "用户名5",
            type: false
          }
        ]
      }
    ];
    return {
      show: true,
      route: route,
      Keys: Keys,
      dateFormat: "YYYY-MM-DD",
      visible: false,
      Role_Id: Role_Id,
      User_Id: User_Id,
      newsNumber: 0,
      Interval: null,
      User_name: "",
      inputValue: "@all",
      Value: "",
      UserId: "@all",
      text: "",
      userName: "",
      Users: [],
      userData: {}, //
      chat_record: [],
      id: "",
      dataSource,
      exhibition: "1", // 1 聊天界面 2 用户集与资料
      user_data: false, // 开关 用户材料
      chat_Interface: false,
      user_chat_datas: []
    };
  },
  methods: {
    isKeys: function(_d) {
      this.$router.push({
        path: _d.key
      });
    },
    onImgClick() {
      // this.$router.push({
      //   path: 'HomePage'
      // });
      this.Keys = "HomePage";
      location.href = "#/HomePage";
    },
    handleOk(e) {
      // console.log(e);
      this.visible = false;
    },
    handleChange(value) {
      console.log(value);
    },
    onChangeSr(date, dateString) {
      console.log(date, dateString);
    },
    clickButton() {
      //事件向服务端发送数据
      this.$socket.emit(this.$socket.id, {
        id: this.userData.id,
        val: this.Value,
        userName: this.userData.userName
      }); //监听connect事件
      // this.$socket.emit("login", "11111");
    },
    GO_Text() {
      this.clickButton();
      setTimeout(() => {
        this.Value = "";
      }, 0);
    },
    clickButtonUser: function(userName, id) {
      this.UserId = id;
      this.inputValue = userName;
    },
    inputFun(e) {
      //e.target 指向了dom元素
      this.Value = e.target.value;
      // ...
    },
    onChoice(_d, id) {
      this.Users.map(val => {
        if (val.id === id) {
          val.Choice = true;
        } else {
          val.Choice = false;
        }
      });
      if (!_d.chat_record) {
        _d.chat_record = [];
      }
      this.userData = _d;
    },
    on_chat_Interface() {
      this.chat_Interface = !this.chat_Interface;
      let dv, _dv, interval;
      let dom = function() {
        //鼠标按下
        _dv.onmousedown = function(e) {
          x = e.clientX;
          y = e.clientY;
          l = dv.offsetLeft;
          t = dv.offsetTop;
          isDown = true;
          // dv.style.cursor = "move";
        };
        //鼠标移动
        window.onmousemove = function(e) {
          if (isDown == false) {
            return;
          }
          var nx = e.clientX;
          var ny = e.clientY;
          var nl = nx - (x - l);
          var nt = ny - (y - t);

          dv.style.left = nl + "px";
          dv.style.top = nt + "px";
        };
        //鼠标抬起
        _dv.onmouseup = function() {
          isDown = false;
          // dv.style.cursor = "default";
        };
      };
      if (this.chat_Interface) {
        interval = setInterval(() => {
          dv = this.$refs.dv;
          _dv = this.$refs._dv;
          if (dv) {
            dom();
            clearInterval(interval);
          }
        }, 200);
      }
    }
  },
  beforeCreate() {},
  mounted: function() {
    let _this = this;

    // if (!this.Interval) {
    //   this.Interval = setInterval(function() {
    //     util._httpData(_this, "News/GetNoReadNews", {
    //       user_Id: _this.User_Id
    //     }).then = function() {
    //       if (this.state) {
    //         _this.newsNumber = this.data;
    //       }
    //     };
    //   }, 3000);
    // }

    this.sockets[this.$socket.id] = function(_d) {
      console.log("user````````", _d);

      this.Users = _d.Users;
    };
    this.$socket.emit("start", { userName: this.userName }); //触发start

    this.Value = "";
  },

  created() {
    var User = this.$cookies.get("User");
    if (!User) {
      this.$router.push({ path: "/" });
    } else {
      // this.Role_Id = User.Role_Id;
      this.userName = User.User_name;
    }
  },

  sockets: {
    connect() {
      this.id = this.$socket.id;
    },
    message(data) {
      //监听message事件，方法是后台定义和提供的
      console.log(data);
    },

    connect: function(_d) {
      //与socket.io连接后回调
      console.log("socket connected", _d);
    },
    login: function(_d) {
      console.log("user", _d);
      this.Users = _d.Users;
      for (let index = 0; index < this.Users.length; index++) {
        if (this.Users[index].userName === this.userName) {
          this.Users.splice(index, 1);
        }
      }
      // for (let i = 0; i < this.Users.length; i++) {
      //   this.Users[i].chat_record = [];
      // }
      if (this.userData != {} && this.Users[0]) {
        this.Users[0].Choice = true;
        this.userData = this.Users[0];
      }
    },
    _value: function(_d) {
      let date = new Date();
      _d.Data.date = date.Format("yyyy-MM-dd hh:mm:ss");
      let Users = this.Users;
      for (let index = 0; index < Users.length; index++) {
        const User = Users[index];
        if (
          User.userName === _d.Data.userName ||
          User.userName === _d.Data.Name
        ) {
          // let data = JSON.parse(JSON.stringify(this.userData))

          User.chat_record.push(_d.Data);
          if (this.userData.userName === _d.Data.userName) {
            this.userData = {};
            this.userData = User;
          }

          break;
        }
      }
      // if (!this.userData.chat_record) {
      //   this.userData.chat_record = [];
      //   this.userData.chat_record.push(_d.Data);
      // } else {
      //   this.userData.chat_record.push(_d.Data);
      // }

      // this.text +=
      //   " [发送人：" +
      //   _d.Data.userName +
      //   (_d.Data.PrivateChat ? ">>>" + _d.Data.Name : "") +
      //   "] : " +
      //   _d.Data.value +
      //   (_d.Data.PrivateChat ? " [私信]" : "") +
      //   " " +
      //   "\n"; //「'+date.format('yyyy-MM-dd') + ' ' + date.toLocaleTimeString()+ '」
      console.log(_d);
    }
  },

  updated() {
    //获取用户信息

    var User = this.$cookies.get("User");
    if (!User) {
      this.$router.push({ path: "/" });
    } else {
      this.Role_Id = User.Role_Id;
      this.userName = User.User_name;
    }

    var _this = this;
    this.route.map((_d, key) => {
      if (_this.$route.name == _d.path) {
        if (_this.Keys[0] != _d.key) {
          _this.Keys = [_d.key];
        }
      }
    });
  }
};
</script>

<style scoped lang="less">
@import "./home.less";
</style>

