<template>
  <div id="gysrz">
    <!-- <div class="login-logo">
      <div>
        <img style="height: 100%" src="../../../static/img/logo_0.png" />
      </div>
      <div style="border-left: 1px solid rgb(232, 232, 232)">供应商入驻申请</div>
      <div class="fh">
        <user />
      </div>
    </div>-->

    <div class="xxi">
      <div id="gysgl-nr">
        <div class="top" v-if="current>=0">
          <div class="qbsq">
            <a-steps :current="current">
              <a-step title="填写申请信息" />
              <a-step title="等待初审" />
              <a-step title="初审结果" />
              <a-step title="等待终审" />
              <a-step title="申请结果" />
            </a-steps>
          </div>
        </div>

        <div class="body" v-if="current==-1">
          <div class="content" style="height: 480px;">
            <div class="img-tb">
              <img style="width: 90%" src="../../../static/img/sqsq1.svg" />
            </div>
            <H1 class="bt">入驻申请</H1>
            <span class="zs">供应商入驻说明站位供应商入驻说明站位供应商入驻说明站位</span>
            <div class="ant">
              <a-button @click="ApplyProvider" type="primary">立即申请</a-button>
            </div>
          </div>
        </div>

        <div class="body" v-if="current==0">
          <div class="top">公司信息</div>
          <div class="content">
            <div class="nr">
              <span class="mc">供应商名称</span>
              <span class="n">
                <a-input
                  :value="Provider_name"
                  @change="(e)=>{Provider_name=e.target.value}"
                  placeholder="请输入供应商名称（保持与营业执照上的一致）"
                />
              </span>
            </div>
            <div class="nr">
              <span class="mc">供应商类型</span>
              <span class="n">
                <!-- <a-input
                  :value="Provider_type"
                  @change="(e)=>{Provider_type=e.target.value}"
                  maxlength="50"
                  placeholder="供应商类型"
                />-->

                <!-- </a-select> -->
                <a-select
                  mode="tags"
                  :value="Provider_type"
                  placeholder="供应商类型"
                  style="width: 50%"
                  :defaultValue="Provider_type"
                  @change="handleChange"
                >
                  <a-select-option v-for="(val,i) in providerType" :key="val">{{val}}</a-select-option>
                </a-select>
              </span>
            </div>
            <div class="nr">
              <span class="mc">姓名</span>
              <span class="n">
                <a-input
                  :value="Legal_Name"
                  @change="(e)=>{Legal_Name=e.target.value}"
                  placeholder="请输入法人姓名（保持与营业执照上的一致）"
                />
              </span>
            </div>

            <div class="nr">
              <span class="mc">身份证</span>
              <span class="n">
                <a-form-item
                  :validate-status="
                /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(Legal_IdCard)
                ?'':Legal_IdCard.length>=18?'error':''
                "
                  :help="
                /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(Legal_IdCard)
                ?'':Legal_IdCard.length>=18?'身份证号码有误':''
                "
                >
                  <a-input
                    :value="Legal_IdCard"
                    @change="(e)=>{Legal_IdCard=e.target.value;}"
                    placeholder="请输入身份证"
                  />
                </a-form-item>
              </span>
            </div>
            <div class="nr">
              <span class="mc">手机号</span>
              <span class="n">
                <p class="fl">
                  <a-input placeholder="手机号" :value="phone" @change="(e)=>{phone=e.target.value}" />

                  <!-- <a-input  icon="success" placeholder="验证码" /> -->
                  <!-- <a-icon type="Success" /> -->
                  <!-- <a-icon type="check-circle" /> -->
                  <!-- <a-icon  class="yzm" slot="addonAfter"  theme="twoTone" twoToneColor="#52c41a"/> -->
                  <!-- </a-input> -->

                  <a-form-item v-if="disabled" has-feedback validate-status="success">
                    <a-input id="success" style="width: 20%;" placeholder="验证码" />
                  </a-form-item>

                  <!-- <a-input id="success" placeholder="验证码"  /> -->

                  <!-- <a-input v-if="disabled" style="width: 30%;" placeholder="验证码" /> -->

                  <a-button @click="sendcode" type="primary">{{btntxt}}</a-button>

                  <!-- <a-button @click="sendcode" type="primary">{{btntxt}}</a-button> -->
                </p>

                <!-- <a-input
                  :value="Legal_Name"
                  @change="(e)=>{Legal_Name=e.target.value}"
                  placeholder
                />-->
              </span>
            </div>
            <div class="nr">
              <span class="mc">供应商地址</span>
              <span class="n">
                <a-input
                  :value="Provider_Address"
                  @change="(e)=>{Provider_Address=e.target.value}"
                  placeholder="请输入公司注册地址"
                />
              </span>
            </div>
            <div class="nr">
              <span class="mc">营业执照号码</span>
              <span class="n">
                <a-input
                  :value="Bussiness_LicenseNum"
                  @change="(e)=>{Bussiness_LicenseNum=e.target.value}"
                  placeholder="请输入营业执照号码（保持与营业执照上的一致）"
                />
              </span>
            </div>
            <div class="nr">
              <span class="mc">营业执照</span>
              <span class="n">
                <div class="clearfix">
                  <!--     :data="{pra:{nser_Id:User_Id,type:5}}" -->
                  <a-upload
                    :action="API_HOST + 'Provider/UploadProvider?para='+JSON.stringify({'type':'3','user_Id':User_Id+''})"
                    listType="picture-card"
                    :fileList="Bussiness_LicensePhoto"
                    @preview="handlePreview1"
                    @change="handleChange1"
                  >
                    <div v-if="Bussiness_LicensePhoto.length < 1">
                      <a-icon type="plus" />
                      <div class="ant-upload-text">上传营业执照</div>
                    </div>
                  </a-upload>
                  <a-modal :visible="previewVisible1" :footer="null" @cancel="handleCancel1">
                    <img alt="example" style="width: 100%" :src="previewImage1" />
                  </a-modal>
                </div>
                <span class="zs">便于平台审核，尺寸大小不超过300*300</span>
              </span>
            </div>

            <div class="nr">
              <span class="mc">身份证照片</span>
              <span class="n">
                <div class="clearfix">
                  <a-upload
                    :action="API_HOST + 'Provider/UploadProvider?para='+JSON.stringify({'type':'1','user_Id':User_Id+''})"
                    listType="picture-card"
                    :fileList="Legal_ICPhoto"
                    @preview="handlePreview2"
                    @change="handleChange2"
                  >
                    <div v-if="Legal_ICPhoto.length < 2">
                      <a-icon type="plus" />
                      <div class="ant-upload-text">上传身份证照片</div>
                    </div>
                  </a-upload>
                  <a-modal :visible="previewVisible2" :footer="null" @cancel="handleCancel2">
                    <img alt="example" style="width: 100%" :src="previewImage2" />
                  </a-modal>
                </div>
                <span class="zs">上传正反面一共2张照片，便于平台审核，尺寸大小不超过300*300</span>
              </span>
            </div>
            <div class="nr">
              <span class="mc">手持身份证</span>
              <span class="n">
                <div class="clearfix">
                  <a-upload
                    :action="API_HOST + 'Provider/UploadProvider?para='+JSON.stringify({'type':'2','user_Id':User_Id+''})"
                    listType="picture-card"
                    :fileList="Legal_TakeICPicture"
                    @preview="handlePreview3"
                    @change="handleChange3"
                  >
                    <div v-if="Legal_TakeICPicture.length < 1">
                      <a-icon type="plus" />
                      <div class="ant-upload-text">上传手持身份证</div>
                    </div>
                  </a-upload>
                  <a-modal :visible="previewVisible3" :footer="null" @cancel="handleCancel3">
                    <img alt="example" style="width: 100%" :src="previewImage3" />
                  </a-modal>
                </div>

                <span class="zs">便于平台审核，请确保人物与身份证清晰可辨认，尺寸大小不超过300*300</span>
              </span>
            </div>
            <div class="nr">
              <span class="mc">邮箱</span>
              <span class="n">
                <a-form-item
                  :validate-status="
                /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(Legal_Email)
                ?'':Legal_Email?'error':''
                "
                  :help="
                /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(Legal_Email)
                ?'':Legal_Email?'邮箱格式错误':''
                "
                >
                  <a-input
                    :value="Legal_Email"
                    @change="(e)=>{Legal_Email=e.target.value}"
                    placeholder="请输入邮箱"
                  />
                </a-form-item>
              </span>
            </div>
          </div>
        </div>

        <div class="body" v-if="current==1 || current==3">
          <div class="content" style="height: 440px;">
            <div class="img-tb">
              <img style="width: 100%" src="../../../static/img/shz1.svg" />
            </div>
            <div class="ztm">审核中</div>
            <div class="ztmxx">申请材料于2019-08-15提交，审核时间预计需要2个工作日，请耐心等待</div>
            <div class="ztmxx">
              带有公司公章的申请表模板下载:
              <a>点击下载</a>
            </div>
          </div>
        </div>
        <div class="body" v-if="current==2">
          <div class="top">初审结果</div>
          <div class="content" style="height: 380px;">
            <!-- <div class="img-tb">
              <img style="width: 100%" />

              <a-icon type="close-circle" />
            </div>-->
            <div class="img-tb">
              <img style="width: 100%" />
              <a-icon class="error" v-if="Audit_State===4" type="close-circle" />
              <a-icon v-if="Audit_State===3" type="check-circle" />
            </div>
            <div v-if="Audit_State===3" class="ztm">恭喜您，初审成功</div>
            <div v-if="Audit_State===3" class="ztmxx">请上传报表信息</div>

            <div v-if="Audit_State===4" class="ztm">很遗憾，初审失败</div>
            <div v-if="Audit_State===4" class="ztmxx">{{community_reason}}</div>
            <a-button v-if="Audit_State===4" @click="ReAddProvider('1')" type="primary">重新申请初审</a-button>
          </div>

          <div v-if="Audit_State===3" class="content">
            <div class="nr">
              <span class="mc">供应商申请表</span>
              <span class="n">
                <span class="zs">
                  请上传带有公司公章的申请表
                  <a>模板下载</a>
                </span>
                <div class="clearfix">
                  <a-upload
                    :action="API_HOST + 'Provider/UploadProvider?para='+JSON.stringify({'type':'4','user_Id':User_Id+''})"
                    :defaultFileList="Provice_Reason"
                    @preview="handlePreview4"
                    @change="handleChange4"
                  >
                    <a-button>
                      <a-icon type="upload" />上传申请表
                    </a-button>
                  </a-upload>
                </div>
              </span>
            </div>
            <div class="nr">
              <span class="mc">性能检测报告</span>
              <span class="n">
                <div class="clearfix">
                  <a-upload
                    :action="API_HOST + 'Provider/UploadProvider?para='+JSON.stringify({'type':'5','user_Id':User_Id+''})"
                    :defaultFileList="Emmagee_TestResult"
                    @preview="handlePreview5"
                    @change="handleChange5"
                  >
                    <a-button>
                      <a-icon type="upload" />上传性能检测报告
                    </a-button>
                  </a-upload>
                </div>
                <!-- <span class="zs">便于平台审核，尺寸大小不超过300*300</span> -->
              </span>
            </div>
          </div>
        </div>
        <div class="body" v-if="current==4">
          <div class="content" style="height: 440px;">
            <div class="img-tb">
              <img style="width: 100%" />
              <a-icon class="error" v-if="Audit_State===7" type="close-circle" />
              <a-icon v-if="Audit_State===6" type="check-circle" />
            </div>
            <div v-if="Audit_State===6" class="ztm">恭喜您，审核成功</div>
            <div v-if="Audit_State===6" class="ztmxx">请等待通知</div>

            <div v-if="Audit_State===7" class="ztm">很遗憾，申请失败</div>
            <div v-if="Audit_State===7" class="ztmxx">{{community_reason}}</div>
            <a-button v-if="Audit_State===7" @click="ReAddProvider('2')" type="primary">重新申请</a-button>
          </div>
        </div>
        <!-- current==1 || current==-1 || current == 4 -->
        <div class="body" v-if="false">
          <div class="content" style="height: 480px;">
            <H2 class="bt">了解我们-3大优势</H2>
            <div class="body-nr">
              <div class="ys">
                <div class="img-tb">
                  <img style="width: 100%" />
                </div>
                <H3>优势1</H3>
                <span>优势1解释说明文案占位，解释说明文案占位，解释说明文案占位，解释说明文案占位，解释说明文案占位 解释说明文案占位，解释说明文案占位，解释说明文案占位，解释说明文案占位，解释说明文案占位</span>
              </div>
              <div class="ys">
                <div class="img-tb">
                  <img style="width: 100%" />
                </div>
                <H3>优势1</H3>
                <span>优势1解释说明文案占位，解释说明文案占位，解释说明文案占位，解释说明文案占位，解释说明文案占位 解释说明文案占位，解释说明文案占位，解释说明文案占位，解释说明文案占位，解释说明文案占位</span>
              </div>
              <div class="ys">
                <div class="img-tb">
                  <img style="width: 100%" />
                </div>
                <H3>优势1</H3>
                <span>优势1解释说明文案占位，解释说明文案占位，解释说明文案占位，解释说明文案占位，解释说明文案占位 解释说明文案占位，解释说明文案占位，解释说明文案占位，解释说明文案占位，解释说明文案占位</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bot" v-if="current==0">
          <a-button @click="CommitProvider('1')" :disabled="isCommitProvider" type="primary">
            <a-icon v-if="isCommitProvider" type="loading" />确定提交
          </a-button>
        </div>
        <div class="bot" v-if="current==2 && Audit_State===3">
          <a-button @click="CommitProvider('2')" :disabled="isCommitProvider" type="primary">
            <a-icon v-if="isCommitProvider" type="loading" />确定提交
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
import util from "../../http.utils.js";
export default {
  name: "gysrz",
  data() {
    return {
      typeName: "gysrz",
      current: -1, //

      gyslx: [],

      providerType: [],

      Provider_name: "", //供应商名称

      Provider_type: [], //供应商类型

      Legal_Name: "", //法人姓名

      Legal_IdCard: "", // 法人身份证号

      Bussiness_LicenseNum: "", //营业执照号码

      Provider_Address: "", //供应商地址

      Legal_Email: "", //法人邮箱

      Audit_State: 0,

      community_reason: "",

      User_Id: "", //处理人

      API_HOST: "",

      isCommitProvider: false,

      previewVisible1: false,
      previewImage1: "",
      Bussiness_LicensePhoto: [
        // {
        //   uid: "-1",
        //   name: "xxx.png",
        //   status: "done",
        //   url:
        //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        // }
      ],
      previewVisible2: false,
      previewImage2: "",
      Legal_ICPhoto: [],

      previewVisible3: false,
      previewImage3: "",
      Legal_TakeICPicture: [],

      previewVisible4: false,
      previewImage4: "",
      Provice_Reason: [],

      previewVisible5: false,
      previewImage5: "",
      Emmagee_TestResult: [],

      disabled: false,
      time: 0,
      btntxt: "获取验证码",
      timeout: null,

      email: "",
      phone: ""
    };
  },

  //加载后执行
  mounted() {},
  methods: {
    //验证手机号码部分
    sendcode() {
      if (this.timeout) return this.$message.info("请稍后再试！", 4);
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
      if (this.phone == "") {
        this.$message.error("请输入手机号码！", 4);
      } else if (!reg.test(this.phone)) {
        this.$message.error("手机格式不正确！", 4);
      } else {
        this.time = 60;
        this.disabled = true;
        this.timer();
      }
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + "s后重新获取";
        this.timeout = setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "重新获取";
        clearTimeout(this.timeout);
        this.timeout = null;
        // this.disabled = false;
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJPG && isLt2M;
    },

    handleCancel1() {
      this.previewVisible1 = false;
    },
    handlePreview1(file) {
      this.previewImage1 = file.url || file.thumbUrl;
      this.previewVisible1 = true;
    },
    DeletePhotoProvider({ file, fileList, DataLength, type }) {
      var list = "";
      var _this = this;

      if (file.status === "done") {
        if (file.response.Code === "0") {
          file.status = "error";
        }
        var url = file.response.Data;

        fileList.map((_d, i) => {
          if (_d.name === file.name) {
            file.thumbUrl = url;
            file.url = url;
          }
        });
      }
      fileList.map((_d, i) => {
        if (list === "") {
          list += _d.url;
        } else {
          list += "," + _d.url;
        }
      });
      if (fileList.length < DataLength) {
        util._httpData(_this, "Provider/DeletePhotoProvider", {
          user_Id: _this.User_Id,
          url: list,
          type: type
        }).then = function() {
          if (this.state) {
            _this.$message.success(this.message, 4);
          } else {
            _this.$message.error(this.message, 4);
          }
        };
      }
    },
    handleChange1({ file, fileList }) {
      console.log("file>>>>>>>>>>>>", file);
      this.DeletePhotoProvider({
        file,
        fileList,
        DataLength: this.Bussiness_LicensePhoto.length,
        type: "3"
      });
      this.Bussiness_LicensePhoto = fileList;
    },

    handleCancel2() {
      this.previewVisible2 = false;
    },
    handlePreview2(file) {
      this.previewImage2 = file.url || file.thumbUrl;
      this.previewVisible2 = true;
    },
    handleChange2({ file, fileList }) {
      this.DeletePhotoProvider({
        file,
        fileList,
        DataLength: this.Legal_ICPhoto.length,
        type: "1"
      });
      this.Legal_ICPhoto = fileList;
    },

    handleCancel3() {
      this.previewVisible3 = false;
    },
    handlePreview3(file) {
      this.previewImage3 = file.url || file.thumbUrl;
      this.previewVisible3 = true;
    },
    handleChange3({ file, fileList }) {
      this.DeletePhotoProvider({
        file,
        fileList,
        DataLength: this.Legal_TakeICPicture.length,
        type: "2"
      });
      this.Legal_TakeICPicture = fileList;
    },

    handleCancel4() {
      this.previewVisible4 = false;
    },
    handlePreview4(file) {
      this.previewImage4 = file.url || file.thumbUrl;
      this.previewVisible4 = true;
    },
    handleChange4({ file, fileList }) {
      this.DeletePhotoProvider({
        file,
        fileList,
        DataLength: this.Provice_Reason.length,
        type: "4"
      });
      this.Provice_Reason = fileList;
    },

    handleCancel5() {
      this.previewVisible5 = false;
    },
    handlePreview5(file) {
      this.previewImage5 = file.url || file.thumbUrl;
      this.previewVisible5 = true;
    },
    handleChange5({ file, fileList }) {
      this.DeletePhotoProvider({
        file,
        fileList,
        DataLength: this.Emmagee_TestResult.length,
        type: "5"
      });
      this.Emmagee_TestResult = fileList;
    },
    CommitProvider(type) {
      debugger;
      var _this = this;
      // this.$confirm({
      //   title: "请确定信息无误后提交",
      //   content: h => <div style="color:red;">Some descriptions</div>,
      //   onOk() {
      var email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      var cP = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

      if (!cP.test(this.Legal_IdCard)) {
        //身份证号（18位）正则
        _this.$message.error("身份证号码格式错误", 4);
        return false;
      } else if (!email.test(this.Legal_Email)) {
        _this.$message.error("邮箱格式错误", 4);
        return false;
      }
      if (
        this.Provider_name &&
        this.Provider_type.length > 0 &&
        this.Legal_Name &&
        this.Bussiness_LicenseNum &&
        this.Provider_Address &&
        this.Legal_Email &&
        this.Bussiness_LicensePhoto.length > 0 &&
        this.Legal_ICPhoto.length > 1 &&
        this.Legal_TakeICPicture.length > 0

        // this.Provice_Reason.length > 0 &&
        // this.Emmagee_TestResult.length > 0
      ) {
        this.isCommitProvider = true;
        util._httpData(_this, "Provider/UpdateProvider", {
          Provider_name: _this.Provider_name,
          Provider_type: _this.Provider_type.toString(),
          Legal_Name: _this.Legal_Name,
          Legal_IdCard: _this.Legal_IdCard,
          Bussiness_LicenseNum: _this.Bussiness_LicenseNum,
          Provider_Address: _this.Provider_Address,
          Legal_Email: _this.Legal_Email,
          User_Id: _this.User_Id
        }).then = function() {
          if (this.state) {
            util._httpData(_this, "Provider/CommitProvider", {
              user_Id: _this.User_Id,
              type: type
            }).then = function() {
              if (this.state) {
                var User = _this.$cookies.get("User");
                var current = 1;
                if (type === "2") {
                  current = 3;
                }
                User.Provider_State = current;
                _this.$cookies.set("User", User);
                _this.current = current;

                // _this.$message.success("自动保存成功", 4);
              } else {
                _this.$message.error(this.message, 4);
                // _this.$message.success("提交失败", 4);
              }
              _this.isCommitProvider = true;
            };
          }
        };
      } else {
      }
      //   },
      //   onCancel() {},
      //   class: "test"
      // });
    },
    ApplyProvider() {
      var _this = this;
      // this.current = 0;
      // if(this.current === -1 ) return false;

      util._httpData(this, "Provider/ApplyProvider", {
        user_Id: this.User_Id
      }).then = function() {
        if (this.state) {
          var User = _this.$cookies.get("User");
          User.Provider_State = 0;
          _this.$cookies.set("User", User);
          _this.current = 0;
          _this.$message.success(this.message, 4);

          util._httpData(
            _this,
            "ProviderType/GetProviderType",
            {}
          ).then = function() {
            if (this.state) {
              // _this.providerType = this.datas;
              for (var i in this.datas) {
                _this.providerType.push(this.datas[i].Providertype_name);
              }
            }
          };

          // _this.$message.success("自动保存成功", 4);
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },

    UpdateProvider() {
      // Provider_name: "", //供应商名称

      // Provider_type: "", //供应商类型

      // Legal_Name: "", //法人姓名

      // Legal_IdCard: "",// 法人身份证号

      // Bussiness_LicenseNum: "", //营业执照号码

      // Provider_Address: "", //供应商地址

      // Legal_Email: "", //法人邮箱

      // User_Id: "", //处理人
      if (
        this.Provider_name ||
        this.Provider_type ||
        this.Legal_Name ||
        this.Legal_IdCard ||
        this.Bussiness_LicenseNum ||
        this.Provider_Address ||
        this.Legal_Email
      ) {
        var _this = this;
        util._httpData(this, "Provider/UpdateProvider", {
          Provider_name: this.Provider_name,
          Provider_type: this.Provider_type,
          Legal_Name: this.Legal_Name,
          Legal_IdCard: this.Legal_IdCard,
          Bussiness_LicenseNum: this.Bussiness_LicenseNum,
          Provider_Address: this.Provider_Address,
          Legal_Email: this.Legal_Email,
          User_Id: this.User_Id
        }).then = function() {
          if (this.state) {
            // _this.$message.success("自动保存记录", 4);
          }
        };
      }
    },
    ReAddProvider(type) {
      var _this = this;
      // this.current = 0;
      util._httpData(this, "Provider/ReAddProvider", {
        provider_Id: this.provider_Id,
        user_Id: this.User_Id,
        type: type
      }).then = function() {
        if (this.state) {
          var User = _this.$cookies.get("User");
          var current = 0;
          if (type === "2") {
            current = 2;
            _this.Audit_State = 3;
          }
          // _this.FirstProvider();
          User.Provider_State = current;
          _this.$cookies.set("User", User);
          _this.current = current;
        }
      };
    },
    handleChange(value) {
      this.Provider_type = value;

      console.log(`Selected: ${this.Provider_type}`);
    },
    FirstProvider() {
      var _this = this;
      if (this.current === -1) return false;
      // if (this.current === 0 || this.current === 1 || this.current === 2) {
      util._httpData(this, "Provider/FirstProvider", {
        user_Id: this.User_Id
      }).then = function() {
        if (this.state) {
          var data = this.data;
          _this.Provider_name = data.Provider_name || "";
          _this.Provider_type = data.Provider_type.split(",") || "";
          _this.Legal_Name = data.Legal_Name || "";
          _this.Legal_IdCard = data.Legal_IdCard || "";
          _this.Bussiness_LicenseNum = data.Bussiness_LicenseNum || "";
          _this.Provider_Address = data.Provider_Address || "";
          _this.Legal_Email = data.Legal_Email || "";
          _this.Audit_State = data.Audit_State || "";
          _this.provider_Id = data.Provider_Id || "";

          _this.community_reason = data.No_Pass_Reason || "";
          _this.current = data.Provider_State;
          if (data.Bussiness_LicensePhoto) {
            var list = data.Bussiness_LicensePhoto.split(",");
            for (var i in list) {
              _this.Bussiness_LicensePhoto.push({
                uid: i,
                name: "xxx.png",
                status: "done",
                url: list[i]
              });
            }
          }
          if (data.Legal_ICPhoto) {
            var list = data.Legal_ICPhoto.split(",");
            for (var i in list) {
              _this.Legal_ICPhoto.push({
                uid: i,
                name: "xxx.png",
                status: "done",
                url: list[i]
              });
            }
          }
          if (data.Legal_TakeICPicture) {
            var list = data.Legal_TakeICPicture.split(",");
            for (var i in list) {
              _this.Legal_TakeICPicture.push({
                uid: i,
                name: "xxx.png",
                status: "done",
                url: list[i]
              });
            }
          }
          if (data.Provice_Reason) {
            var list = data.Provice_Reason.split(",");

            for (var i in list) {
              var name = list[i].split("/")[list[i].split("/").length - 1];
              _this.Provice_Reason.push({
                uid: i,
                name: name,
                status: "done",
                url: list[i]
              });
            }
          }
          if (data.Emmagee_TestResult) {
            var list = data.Emmagee_TestResult.split(",");
            for (var i in list) {
              var name = list[i].split("/")[list[i].split("/").length - 1];

              _this.Emmagee_TestResult.push({
                uid: i,
                name: name,
                status: "done",
                url: list[i]
              });
            }
          }

          util._httpData(
            _this,
            "ProviderType/GetProviderType",
            {}
          ).then = function() {
            if (this.state) {
              // _this.providerType = this.datas;
              for (var i in this.datas) {
                _this.providerType.push(this.datas[i].Providertype_name);
              }
            }
          };

          // _this.$message.success("自动保存记录", 4);
        }
      };
    }
  },
  //加载前执行
  created() {},
  mounted() {
    //获取用户信息
    var User = this.$cookies.get("User");
    if (!User) return;
    this.User_Id = User.User_Id;
    this.current = User.Provider_State;

    // this.current = 0;
    this.API_HOST = process.env.API_HOST;
    this.FirstProvider();
    // setInterval(this.UpdateProvider, 60000);
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>






