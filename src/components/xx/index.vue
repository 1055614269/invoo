<template>
  <div id="xx">
    <div class="t">
      <span>通知列表（{{TotalCount}}）</span>
    </div>
    <div class="body">
      <a-collapse accordion v-if="DataList.length>0" @change="UptNewsTrue">
        <a-collapse-panel
          v-for="(_d,i) in DataList"
          :key="_d.News_NowType+'_'+_d.News_Id+'_'+i"
          @click="onread()"
        >
          <template slot="header">
            <a-badge :dot="_d.News_NowType==1">{{_d.News_Title}}</a-badge>
            <div class="text">{{_d.News_Time}}</div>
          </template>
          <p>
            {{_d.News_Content}}
            <a
              :key="key"
              v-for="(data,key) in _d.newsRelationList"
              @click="$router.push(RelationJump(data).url)"
            >{{RelationJump(data).name}}</a>
          </p>
          <span>
            <a-icon type="clock-circle" />
            {{_d.News_Time}}
            <!-- <a-icon style="margin-left: 10px;" type="eye" />201 -->
          </span>
        </a-collapse-panel>
      </a-collapse>
      <!-- <div class="qbsq">
        <div class="nr">
          <span class="bt">《关于上海2019年空气质量检测守则细则草案》</span>
          <span>
            <a-icon type="clock-circle" />2018-12-20 14：20：21
            <a-icon style="margin-left: 10px;" type="eye" />201
          </span>
        </div>
        <span class="cz">
          <div class="an">
            <div>
              <a-icon type="cloud-download" />
            </div>
            <div class="text">下载</div>
          </div>
          <div class="an">
            <div>
              <a-icon type="delete" />
            </div>
            <div class="text">删除</div>
          </div>
        </span>
      </div>-->

      <div class="button">
        <!-- loading 加载状态 -->
        <a-button v-show="TotalCount/pagesize>pageno" @click="addPageno()" icon="reload">加载更多</a-button>
        <div v-show="TotalCount/pagesize<=pageno">没有更多了</div>
        <!-- <a-button icon="reload">加载更多</a-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import util from "../../http.utils.js";
export default {
  name: "xx",
  data() {
    return {
      typeName: "消息",
      DataList: [],
      User_Id: "",
      pageno: 1,
      pagesize: 10,
      TotalCount: 0,
      TotalPage: 1
    };
  },

  //加载后执行
  mounted() {
    this.PageNews();
  },

  methods: {
    UptNewsTrue(key) {
      if (!key) return false;
      var _this = this;
      console.log(key);
      var R = key.split("_")[0];
      var id = key.split("_")[1];
      var i = key.split("_")[2];
      if (R == 1) {
        _this.DataList[i].News_NowType = 2;
        util._httpData(this, "News/UptNews", {
          news_Id: id,
          news_NowType: 2
        }).then = function() {
          if (this.state) {
    
            // _this.DataList[i].News_NowType = 2;
            // _this.$message.success("自动保存成功", 4);
          } else {
            _this.$message.error(this.message, 4);
          }
        };
      }
    },
    clickButton: function(val) {},
    PageNews: function() {
      var _this = this;
      util._httpData(this, "News/PageNews", {
        user_Id: this.User_Id,
        pageno: 1,
        pagesize: this.pagesize * this.pageno
      }).then = function() {
        if (this.state) {
          _this.DataList = this.data.Data;
          _this.TotalCount = this.data.TotalCount;
          console.log("data", _this.DataList);

          // _this.$message.success("自动保存成功", 4);
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    addPageno() {
      this.pageno += 1;
      this.PageNews();
    },
    RelationJump(_d) {
      var a = {};

      if (!_d) return "";
      switch (_d.Type) {
        case 1:
          //供应商申请信息
          switch (
            _d.State // 审核状态（1=填写资料中 2=初审审核中 3=初审审核通过 4=初审审核驳回 5：终审审核中 6：终审审核通过 7：终审审核驳回）
          ) {
            case 1:
              break;
            case 2:
              break;
            case 3:
              a.name = "提交终审信息";
              a.url = "gysrz";
              break;
            case 4:
              // a += <template><a href="/gysrz">重新提交</a></template>;
              a.name = "重新提交初审资料";
              a.url = "gysrz";
              break;
            case 6:
              break;
            case 7:
              // a += <a href="/gysrz">重新提交</a>;
              a.name = "重新提交终审资料";
              a.url = "gysrz";
              break;
          }
          break;
        case 2:
          //设备信息

          break;
        case 3:
          //工地信息

          break;
        case 4:
          break;
      }

      return a;
    }
  },
  //加载前执行
  created() {
    var User = this.$cookies.get("User");
    if (!User) return;
    this.User_Id = User.User_Id;
    // this.Role_Id = User.Role_Id;
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>



