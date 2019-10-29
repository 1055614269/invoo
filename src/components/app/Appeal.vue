<template>
  <div id="Appeal">
    <div class="explain">
      <h2>申诉申请</h2>
      <span>申诉规则说明站位申诉规则说明站位申诉规则说明站位申诉规则说明站位申诉规则说明站位申诉规则说明站位</span>
    </div>
    <div class="body">
      <span>申诉原因描述</span>
      <div class="field">
        <van-field
          v-model="message"
          type="textarea"
          placeholder="请输入申诉原因"
          rows="1"
          maxlength="200"
          :autosize="{ maxHeight: 120, minHeight: 120 }"
        />
        <span>{{message.length}}/200</span>
      </div>
       <span>请提供证明照片</span>
       <div class="uploader">
           <!-- :after-read="afterRead" -->
           <van-uploader upload-text="相机/相册" v-model="fileList" multiple/>
       </div>
       <van-button class="button" type="danger">立即提交</van-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  name: "Appeal",
  data() {
    return {
      typeName: "我要申诉",
      message:'',
      fileList: [
        { url: 'https://img.yzcdn.cn/vant/cat.jpeg' },
        // Uploader 根据文件后缀来判断是否为图片文件
      ]
    };
  },

  //加载后执行
  mounted() {},
  methods: {
    onInput(value) {

    },
    onDelete() {},
     afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    }
  },
  //加载前执行
  created() {}
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>






