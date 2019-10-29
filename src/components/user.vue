<template>
  <div id="user">
    <a-dropdown :trigger="['click']">
      <a class="ant-dropdown-link" href="#">
        <a-avatar src="https://thirdqq.qlogo.cn/g?b=sdk&k=32SCd9V0VULQWjO3T35jxw&s=140" />
        {{User_name}}
        <a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item @click="visible=true" key="0">
          <router-link to>资料修改</router-link>
        </a-menu-item>
        <a-menu-item key="1">
          <router-link to>密码修改</router-link>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3">
          <router-link to="/">退出登录</router-link>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      op: true,
      dateFormat: "YYYY-MM-DD",
      User_name: "",
      visible: false
    };
  },
  methods: {
    handleOk(e) {
      // console.log(e);
      this.visible = false;
    },
    handleChange(value) {
      console.log(value);
    },
    onChangeSr(date, dateString) {
      console.log(date, dateString);
    }
  },

  updated() {},
  mounted: function() {
    //获取用户信息
    var User = this.$cookies.get("User");
    if (User) {
      this.User_name = User.User_name;
    }
  }
};
</script>
<style scoped lang="less">
#user {
  .ant-dropdown-link {
    color: #000;
    height: 64px;
    min-width: 100px;
    // min-width: 100px;
    display: block;
    float: left;
    &:focus {
      text-decoration: none;
    }
  }
}

.xgzl {
  width: 100%;
  div {
    font-family: PingFangTC-Regular;
    font-size: 12px;
    color: #464b55;
    line-height: 34px;
    width: 100%;
    height: 34px;
    padding-left: 26px;
  }
  .sr {
    background: #f3f4f6;
    color: #9b9b9b;
    padding-left: 10px;
    /deep/.ant-input {
      border: white;
      background-color: #f3f4f6;
      color: #9b9b9b;
      line-height: 36px;
      &:focus {
        -webkit-box-shadow: 0 0 0 2px rgba(24, 144, 255, 0);
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0);
      }
    }
    /deep/.ant-select {
      padding-left: 0;
      color: #9b9b9b;
    }
    /deep/.ant-select-selection--single {
      border: #ffffff00;
      background-color: #f3f4f6;
      &:focus {
        -webkit-box-shadow: 0 0 0 2px rgba(24, 144, 255, 0);
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0);
      }
    }
    /deep/.ant-calendar-picker {
      width: 100%;
    }
  }
}
</style>