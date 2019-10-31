// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
let _date = new Date().getTime();
import Vue from 'vue'
import App from './App'
import router from './router'
import md5 from 'js-md5';

import route from './components/route'
// import $ from 'jquery'
import axios from 'axios';


import AmazeVue from 'amaze-vue';
import 'amaze-vue/dist/amaze-vue.css';
// import VueAreaLinkage from 'vue-area-linkage';
Vue.use(AmazeVue)

import VueCookies from 'vue-cookies';
Vue.use(VueCookies)
// Vue.prototype.$cookies = VueCookies;
function cookies(Vue) {
  this.$cookies = Vue.$cookies;
  this.set = function (key, Obj) {
    // var obj = $cookies.get(key);
    var User = $cookies.get("User");
    var data = {}
    switch (key) {
      case "tologin":
        if (User && User.User_name) {
          User.User_name = "游客"
          data = User

        } else {
          Obj.User_name = "游客";
          data = Obj;
        }
        key = "User"
        break;

      // case "User":

      // break;
      default:
        data = Obj
        break;

    }


    $cookies.set(key, data, "7d"); // 7d 代表Cookies内容保存7天
  };
  this.get = function (key) {
    // var obj = $cookies.get(key);
    // var User = $cookies.get("User");
    // var data = {}
    // switch(key){
    //   case "tologin":


    //   break;

    //   // case "User":

    //   // break;
    //   default:
    //       data = obj
    //   break;

    // }

    return $cookies.get("User");
  };
};

var cookies = new cookies(Vue);
Vue.prototype.cookies = cookies;

import DatePicker from 'ant-design-vue';
// import { Button } from "ant-design-vue";
import '../static/css/antd.css';
Vue.use(DatePicker);

// 移动端
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


// import { BaiduMap } from './custom/map.js'; //百度地图
// Vue.prototype.BaiduMap = BaiduMap;

import moment from "moment";
Vue.prototype.moment = moment;
// import HighCharts from "highcharts";

import VueSocketio from 'vue-socket.io';
// Vue.use(new VueSocketio({
//   connection: 'http://192.168.1.16:8009/',   // 添加socket IO   ------测试 http://218.0.201.204:9011/
// }))
Vue.use(new VueSocketio({
  connection: 'http://101.37.156.186:8088/',   // 添加socket IO   ------测试 http://218.0.201.204:9011/
}));

Vue.use(route);//加载路由

Vue.prototype.$md5 = md5;
Vue.prototype.$http = axios;

Vue.config.productionTip = false


//数据图形化展示插件
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge.js';
import HighCharts from "highcharts";
import '../static/js/windbarb';
// import Wordcloud from 'highcharts/modules/wordcloud';
// Wordcloud(HighCharts)
HighchartsMore(HighCharts);
SolidGauge(HighCharts);



//高德地图
import AMap from 'vue-amap' //高德地图
Vue.use(AMap)

AMap.initAMapApiLoader({
  key: '8c7f091027030be413b18050578f4299',
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.15'
});
import { lazyAMapApiLoaderInstance } from 'vue-amap';
Vue.prototype.AMap = lazyAMapApiLoaderInstance;


// 全局配置，针对页面上所有图表有效
HighCharts.setOptions({
  credits: {
    enabled: false
  },
  title: {
    style: {
      color: '#666666',      //字体颜色
    }
  },
  global: { useUTC: false }, //
  tooltip: {
    borderWidth: 1,
    backgroundColor: 'none',
    shadow: true,
    style: {
      fontSize: '16px',
      color: '#666666',
    },
    pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',

    // positioner: function (labelWidth,labelHeight) {
    // 	return {
    //     x: (this.chart.chartWidth - labelWidth) / 2,
    //     y: (this.chart.chartHeight - labelHeight) / 2
    // 	};
    // }
  },
  yAxis: {
    title: {
      text: null,
      style: {
        color: '#666666',      //字体颜色
      }
    },
    gridLineWidth: '0px',
    labels: {
      format: '{value}'
    }
  },
  legend: {
    itemStyle: {
      color: '#666666',      //字体颜色
    }
  },
  chart: {
    // backgroundColor: {
    //   linearGradient: [0, 0, 500, 500],
    //   stops: [[0, "rgb(183, 218, 245,0"], [1, "rgb(20, 71, 109,0)"]]
    // },
    borderWidth: 0,
    plotBackgroundColor: "rgba(11, 36, 55, 0)",
    backgroundColor: null,
    plotShadow: false,
    plotBorderWidth: 0,
    style: {
      color: '#666666',      //字体颜色
    }

  },
});

// 移动端 title自适应设置
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  switch (to.path) {
    case '/app':
      $('#app-title').html("快速登录");
      break;
    case '/EquipmentData':
      $('#app-title').html("设备数据");
      break;
    case '/Appeal':
      $('#app-title').html("我要申诉");
      break;
    case '/PersonalCenter':
      $('#app-title').html("个人中心");
      break;
    case '/PersonalEquipment':
      $('#app-title').html("我的设备");
      break;
    case '/PersonalPunishment':
      $('#app-title').html("处罚记录");
      break;
    case '/PersonalAppeal':
      $('#app-title').html("申诉记录");
      break;

    default:
      $('#app-title').html("invoo");

  }
  if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆 

    if (true) { // 查询本地存储信息是否已经登陆 
      next();
    } else {
      next({
        path: '/Login', // 未登录则跳转至login页面 
        // query: { redirect: to.fullPath } // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面 
      });
    }
  } else {
    next();
  }
});

window.InPercentage = function (num, total) {
  var _int = parseInt(num / total * 100).toString();
  if (_int === "NaN") {
    return '0';
  } else {
    return _int.substr(0, _int.length - 1) + '0';
  }


};
Date.prototype.Format = function (fmt) { //author: meizz   
  var o = {
    "M+": this.getMonth() + 1,                 //月份   
    "d+": this.getDate(),                    //日   
    "h+": this.getHours(),                   //小时   
    "m+": this.getMinutes(),                 //分   
    "s+": this.getSeconds(),                 //秒   
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
    "S": this.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/**
 * 2019-10-29 17:21:35
 * tHeader 头部名称
 * filterVal 字段
 * tableData 内容
 * name excel名称 每日 当前时间（毫秒）
 */
window.exportToExcel = function (tHeader = [], filterVal = [], data_list = [], name = new Date().getTime(),title) {
  //excel数据导出
  require.ensure([], () => {
    //   var data_list = [
    //   {
    //     index:1,
    //     name:'name1'
    //   },
    //   {
    //     index:2,
    //     name:'name2'
    //   }
    // ]
    const {
      export_json_to_excel
    } = require('../static/js/Export2Excel_1');
    // const tHeader = ['序号','名称'];
    // const filterVal = ['index','name'];
    const list = data_list;
    const data = formatJson(filterVal, list);

    export_json_to_excel({
      title: title,
      header: tHeader,
      data:data,
      filename: name,
      autoWidth: true,
      bookType: "xlsx"
    });
  })
};
window.formatJson = function (filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

let _date1 = new Date().getTime();
console.log("app 加载：" + ((_date1 - _date) / 1000) + "秒");


