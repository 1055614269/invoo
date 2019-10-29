<template>
  <div v-if="apply" id="gysgl-nr">
    <div class="top">
      <div class="qbsq">
        <div class="img">
          <a-avatar
            :size="64"
            src="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=368757964,337856628&fm=202&mola=new&crop=v1"
          />
        </div>
        <div class="nr">
          <span class="bt">{{data.Provider_name}}</span>
          <span>{{data.Provider_type}}</span>
          <!-- <div>传承美好生活</div> -->
        </div>
      </div>
    </div>

    <div class="body">
      <div class="top">公司信息</div>
      <div class="content">
        <div class="nr">
          <span class="mc">法人代表姓名</span>
          <div class="n">{{data.Legal_Name}}</div>
        </div>
        <div class="nr">
          <span class="mc">法人代表身份证</span>
          <div class="n">{{data.Legal_IdCard}}</div>
        </div>
        <div class="nr">
          <span class="mc">供应商地址</span>
          <div class="n">{{data.Provider_Address}}</div>
        </div>
        <div class="nr">
          <span class="mc">营业执照号码</span>
          <div class="n">{{data.Bussiness_LicenseNum}}</div>
        </div>
        <div class="nr">
          <span class="mc">营业执照</span>
          <div class="n">
            <img
              @click="ongetImg(img)"
              v-for="img in Bussiness_LicensePhoto"
              :src="img"
              alt="example"
              slot="cover"
            />
          </div>
        </div>

        <div class="nr">
          <span class="mc">身份证照片</span>
          <div class="n">
            <img
              v-for="img in Legal_ICPhoto"
              @click="ongetImg(img)"
              :src="img"
              alt="example"
              slot="cover"
            />
          </div>
        </div>
        <div class="nr">
          <span class="mc">手持身份证</span>
          <div class="n">
            <!-- <img
              alt="example"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565275338187&di=dd1375b0071e1df0fc3c392dde5142e4&imgtype=0&src=http%3A%2F%2Fi0.sinaimg.cn%2Fdy%2Fcr%2F2008%2F1119%2F947155991.jpg"
              slot="cover"
            />-->
            <img
              v-for="img in Legal_TakeICPicture"
              @click="ongetImg(img)"
              :src="img"
              alt="example"
              slot="cover"
            />
          </div>
        </div>
        <div class="nr">
          <span class="mc">邮箱</span>
          <div class="n">{{data.Legal_Email}}</div>
        </div>
      </div>
    </div>
    <div v-if="data.Audit_State==2" class="bot">
      <a-button @click="visible=true">驳回</a-button>
      <a-button :disabled="isPassProvider" @click="PassProvider('1')" type="primary">
        <a-icon v-show="isPassProvider" type="loading" />通过
      </a-button>
    </div>

    <div v-if="data.Audit_State==5" class="body">
      <div class="top"></div>

      <div class="content">
        <div class="nr">
          <span class="mc">供应商申请表</span>
          <div class="n">
            <!-- <img
              alt="example"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565275614399&di=dbe9846999cd5513a606f4571d15180b&imgtype=0&src=http%3A%2F%2Ftxt25-2.book118.com%2F2017%2F0422%2Fbook101147%2F101146322.png"
              slot="cover"
            />-->
            <br />
            <div v-for="url in Provice_Reason">
              <a-icon type="link" />
              <a target="_Blank" :href="url">{{url.split("/")[url.split("/").length-1]}}</a>
            </div>
            <!-- <img
              v-for="img in Provice_Reason"
              :src="img"
              @click="ongetImg(img)"
              alt="example"
              slot="cover"
            />-->
          </div>
        </div>

        <div class="nr">
          <span class="mc">性能检测报告</span>
          <div class="n">
            <!-- <img
              alt="example"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565275579335&di=ce5360044029396fd55531e695346e17&imgtype=0&src=http%3A%2F%2Fdocs.ebdoor.com%2FImage%2FCompanyCertificate%2F11%2F118168.jpg"
              slot="cover"
            />-->
            <br />
            <div v-for="url in Emmagee_TestResult">
              <a-icon type="link" />
              <a target="_Blank" :href="url">{{url.split("/")[url.split("/").length-1]}}</a>
            </div>
            <!-- <img
              v-for="img in Emmagee_TestResult"
              @click="ongetImg(img)"
              :src="img"
              alt="example"
              slot="cover"
            />-->
          </div>
        </div>
      </div>
    </div>

    <div class="bot">
      <a-button v-if="data.Audit_State==5" @click="visible=true">驳回</a-button>
      <a-button
        v-if="data.Audit_State==5"
        :disabled="isPassProvider"
        @click="PassProvider('2')"
        type="primary"
      >
        <a-icon v-show="isPassProvider" type="loading" />通过
      </a-button>
      <a-button @click="apply=false">返回</a-button>
    </div>

    <a-modal title="驳回原因" centered v-model="visible" @ok="handleOk" :bodyStyle="{}">
      <a-textarea v-model="No_Pass_Reason" placeholder="请输入驳回原因" :rows="6" />
    </a-modal>

    <div class="bm" :style="ToImg?'':'display: none'">
      <div>
        <span>
          <a-icon @click="ToImg=!ToImg" type="close-circle" />
        </span>
        <div>
          <a-button @click="downloadImg(isImgURL)" type="primary">原图下载</a-button>
        </div>

        <img alt="example" :src="isImgURL" slot="cover" />
      </div>
    </div>
  </div>

  <div v-else-if="!apply" id="gysgl">
    <div class="t">
      <!-- <span @click="record='全部申请'" :class="record=='全部申请'?'record':''">我的申请</span> -->
      <!-- <span @click="$router.push('/gysrz');record='立即申请'" :class="record=='立即申请'?'record':''">立即申请</span> -->
      <!-- <span @click="record='待审核'" :class="record=='待审核'?'record':''">待审核</span>
      <span @click="record='已通过'" :class="record=='已通过'?'record':''">已通过</span>
      <span @click="record='已驳回'" :class="record=='已驳回'?'record':''">已驳回</span>-->
      <a-select defaultValue="我的申请" class="xzq" @change="handleChange">
        <a-select-option @click="PageProvider(0)" value="我的申请">所有申请</a-select-option>
        <a-select-option @click="PageProvider(1)" value="待审核">待审核</a-select-option>
        <a-select-option @click="PageProvider(2)" value="已通过">已通过</a-select-option>
        <a-select-option @click="PageProvider(3)" value="已驳回">已驳回</a-select-option>
      </a-select>
      <div class="fb" @click>
        <a-icon type="cloud-upload" />发布
      </div>
    </div>
    <div class="body">
      <div v-for="(val,i) in dataList" class="qbsq">
        <div class="img">
          <a-avatar
            :size="64"
            src="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=368757964,337856628&fm=202&mola=new&crop=v1"
          />
        </div>
        <div @click="apply=!apply; ToDate(val)" class="nr">
          <span class="bt">{{val.Provider_name}}</span>
          <span>
            <a-icon type="clock-circle" />
            {{val.Apply_Time}}
          </span>
        </div>
        <span class="cz">
          <!-- （1=填写资料中 2=初审审核中 3=初审审核通过 4=初审审核驳回 5：终审审核中 6：终审审核通过 7：终审审核驳回） -->
          <a-button
            v-if="(val.Audit_State==2&&(Role_Id==1 || Role_Id==2))"
            @click="apply=!apply; ToDate(val)"
          >初审查看</a-button>
          <a-button
            v-if="(val.Audit_State==5&&(Role_Id==1 || Role_Id==2))"
            @click="apply=!apply; ToDate(val)"
          >终审查看</a-button>

          <div v-if="val.Audit_State==3">待终审</div>
          <div v-if="val.Audit_State==6">审核通过</div>
          <div v-if="(val.Audit_State==2&&Role_Id>2)">待初审</div>
          <div v-if="(val.Audit_State==5&&Role_Id>2)">待终审</div>
          <div v-if="val.Audit_State==4">
            初审审核驳回
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{val.No_Pass_Reason}}</span>
              </template>
              <a-icon type="question-circle" />
            </a-tooltip>
          </div>
          <div v-if="val.Audit_State==7">
            终审审核驳回
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{val.No_Pass_Reason}}</span>
              </template>
              <a-icon type="question-circle" />
            </a-tooltip>
          </div>
        </span>
      </div>

      <div class="button">
        <!-- loading 加载状态 -->
        <a-button v-if="TotalCount/pagesize>pageno" @click="addPageno()" icon="reload">加载更多</a-button>
        <div v-else>没有更多了</div>
      </div>
    </div>
  </div>
</template>

<script>
import util from "../../http.utils.js";
export default {
  name: "gysgl", //供应商管理
  data() {
    return {
      typeName: "供应商管理",
      current: 1,
      record: "全部申请",
      apply: false,
      visible: false,
      ToImg: false,
      isImgURL: "",
      dataList: [],
      isPassProvider: false,
      data: {
        Provider_name: "", //	供应商名称
        Provider_type: "", //供应商类型
        Legal_Name: "", //法人姓名
        Legal_IdCard: "", //法人身份证号
        Bussiness_LicenseNum: "", //营业执照号码
        Provider_Address: "", //供应商地址
        Legal_Email: "", //法人邮箱
        Bussiness_LicensePhoto: [], // 营业执照图片
        Legal_ICPhoto: [], //法人身份证正面照
        Legal_TakeICPicture: [], //手持身份证照片
        Provice_Reason: [], // 供应商申请图片
        Emmagee_TestResult: [], // 性能检测报告
        Audit_State: "",
        provider_Id: "" //ID
      },
      No_Pass_Reason: "",
      pageno: 1,
      pagesize: 5,
      TotalCount: 0,
      TotalPage: 1
    };
  },

  methods: {
    ToDate(data) {
      this.data.Provider_name = data.Provider_name;
      this.data.Provider_type = data.Provider_type;
      this.data.Legal_Name = data.Legal_Name;
      this.data.Legal_IdCard = data.Legal_IdCard;
      this.data.Bussiness_LicenseNum = data.Bussiness_LicenseNum;
      this.data.Provider_Address = data.Provider_Address;
      this.data.Legal_Email = data.Legal_Email;
      this.data.Audit_State = data.Audit_State;
      this.data.provider_Id = data.Provider_Id;
      if (data.Bussiness_LicensePhoto) {
        this.Bussiness_LicensePhoto = data.Bussiness_LicensePhoto.split(",");
      }
      if (data.Legal_ICPhoto) {
        this.Legal_ICPhoto = data.Legal_ICPhoto.split(",");
      }
      if (data.Legal_TakeICPicture) {
        this.Legal_TakeICPicture = data.Legal_TakeICPicture.split(",");
      }
      if (data.Provice_Reason) {
        this.Provice_Reason = data.Provice_Reason.split(",");
      }
      if (data.Emmagee_TestResult) {
        this.Emmagee_TestResult = data.Emmagee_TestResult.split(",");
      }
    },
    handleOk() {
      var type = "1";
      this.apply = false;
      this.visible = false;
      if (this.data.Audit_State === 5) {
        type = "2";
      }
      this.NoPassProvider(type);
    },

    downloadImg(url) {
      // this.ToImg = false;
      var alink = document.createElement("a");
      alink.href = url;
      // alink.download = "二维码"; //图片名
      alink.click();
    },
    ongetImg(ImgURL) {
      this.ToImg = true;
      this.isImgURL = ImgURL;
    },
    PageProvider(orderMark = 0) {
      var _this = this;
      util._httpData(this, "Provider/PageProvider", {
        user_Id: this.User_Id,
        provider_Id: this.data.provider_Id,
        pageno: 1,
        pagesize: this.pagesize * this.pageno,
        orderMark: orderMark //（0：全部，1：待审核，2：已通过，3:已驳回）
      }).then = function() {
        if (this.state) {
          // for(var i in this.data.Data){
          //     _this.dataList.push(this.data.Data[i])
          // }
          _this.dataList = this.data.Data;
          // _this.pageno = this.data.pageno;
          // _this.pagesize = this.data.pagesize;
          _this.TotalCount = this.data.TotalCount;
          console.log("data", _this.dataList);

          // _this.$message.success("自动保存成功", 4);
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    PassProvider(type) {
      var _this = this;
      this.isPassProvider = true;
      util._httpData(this, "Provider/PassProvider", {
        provider_Id: this.data.provider_Id,
        user_Id: this.User_Id,
        type: type
      }).then = function() {
        if (this.state) {
          _this.apply = false;
          _this.isPassProvider = false;
          _this.PageProvider();
          _this.$message.success(this.message, 4);
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    addPageno() {
      this.pageno += 1;
      this.PageProvider();
    },
    NoPassProvider(type) {
      var _this = this;
      util._httpData(this, "Provider/NoPassProvider", {
        user_Id: this.User_Id,
        provider_Id: this.data.provider_Id,
        No_Pass_Reason: this.No_Pass_Reason,
        type: type
      }).then = function() {
        if (this.state) {
          _this.apply = false;
          _this.PageProvider();
          _this.$message.success(this.message, 4);
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    }
  },
  //加载前执行
  created() {
    var User = this.$cookies.get("User");
    if (!User) return;
    this.User_Id = User.User_Id;
    this.Role_Id = User.Role_Id;
  },
  //加载后执行
  mounted() {
    this.PageProvider();
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>



