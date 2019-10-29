<template>
   
  <div>
     <!-- <div style="height: 64px"> -->
      <!-- <home Keys="2" ></home> -->
    <!-- </div> -->
    <!-- <a-button type="primary">
      Button
      <a-icon type="down" />
    </a-button>

    <a-date-picker @change="onChange" />-->

    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="Tab 1" key="1"> >>>>>>>> {{userName}}</a-tab-pane>
      <a-tab-pane tab="Tab 2" key="2" forceRender>2</a-tab-pane>
      <a-tab-pane tab="Tab 3" key="3">3</a-tab-pane>
    </a-tabs>

    <x-chart id="highcharts" class="high" :option="option"></x-chart>
    <x-chart id="high" class="high" :option="option1"></x-chart>
    <x-chart id="high2" class="high" :option="option2" ref="option2"></x-chart>
    <x-chart id="high3" class="high" :option="option3"></x-chart>

    <div>
      萤石云视频在线demo 测试
      如果无法自动播放
      浏览器地址输入： 【chrome://flags/#autoplay-policy】
      「Autoplay policy」 下的参数修改为 No user gesture is required
      <div class="hint">
        <textarea id="url" placeholder="这里输入直播地址">{{'http://hls01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.hd.m3u8'}}</textarea>
        <div class="btn-container">
          <button id="init">初始化播放</button>
          <button id="stop">结束</button>
        </div>
        <video id="myPlayer" autoplay src controls playsinline webkit-playsinline></video>
      </div>
    </div>

    <div class="wk">
      <div class="dt">
        <div
          v-for="(item ,i) in MapPlug_in"
          :key="i"
          v-on:click="onClickDZ(item)"
          class="dropdown"
          :style="i==0?'border-left: 0px':''"
        >
          <span class="glyphicon glyphicon-filter"></span>

          <span class="text_red" v-if="i == 0">{{item.type}}</span>
          <a-icon class="text_red" v-if="i != 0" :type="item.icon" />

          <span>{{item.val}}</span>
          <a-icon class="biao" v-if="!item.selected" type="down" />
          <a-icon class="biao" v-if="item.selected" type="up" />
          <div v-if="item.selected" class="dropdown-content">
            <p
              :style="val.selected?'color: red':''"
              v-for="(val,int) in item.datas"
              :key="int"
              v-on:click="onClickName(val,i==0,item)"
            >
              {{val.type}} {{val.name}}
              <a-icon v-if="val.selected" type="check" />
            </p>
          </div>
        </div>
      </div>
      <div class="kd" id="allmap" ref="allmap"></div>
    </div>
  </div>
</template>

<script>
// 导入chart组件
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
var myvue = {};
import util from "../http.utils.js";
import ezuikit from "../../static/js/ezuikit";
import XChart from "@/components/pages/charts/charts";
export default {
  name: "Highcharts",
  components: {
    XChart
  },
  data() {
    return {
      userName:'',
      loading: false,
      imageUrl: "",
      //地图插件
      kg: false,
      hackReset: false,
      MapPlug_in: [
        {
          val: "杭州市",
          icon: "filter",
          selected: false,
          type: "1",
          datas: [
            { name: "杭州市", selected: true, type: "" },
            { name: "上海市", selected: false, type: "" },
            { name: "北京市", selected: false, type: "" },
            { name: "青铜峡", selected: false, type: "" },
            { name: "乌鲁木齐", selected: false, type: "" },
            { name: "余杭区", selected: false, type: "" },
            { name: "于洪区", selected: false, type: "" },
            { name: "哈尔滨", selected: false, type: "" }
          ]
        },
        {
          val: "设备筛选",
          icon: "filter",
          selected: false,
          datas: [
            { name: "不限", selected: true },
            { name: "超标", selected: false },
            { name: "离线", selected: false }
          ]
        },
        {
          val: "场景选择",
          icon: "select",
          selected: false,
          datas: [
            { name: "建筑工地", selected: true },
            { name: "堆场码头", selected: false },
            { name: "混凝土场地", selected: false },
            { name: "搅拌场", selected: false }
          ]
        }
      ],
      map: null,

      option: {},
      data: [
        {
          name: "安装，实施人员",
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        },
        {
          name: "工人",
          data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        }
      ],
      other: {
        title: {
          //大标题
          text: "2010 ~ 2016 年太阳能行业就业人员发展情况"
        },
        yAxis: {
          title: {
            text: ""
          }
        }
      },
      option1: {
        chart: {
          type: "column"
        },
        title: {
          text: "月平均降雨量"
        },
        xAxis: {
          categories: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: "降雨量 (mm)"
          }
        },
        tooltip: {
          // head + 每个 point + footer 拼接成完整的 table
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            borderWidth: 0
          }
        },
        series: [
          {
            name: "东京",
            data: [
              49.9,
              71.5,
              106.4,
              129.2,
              144.0,
              176.0,
              135.6,
              148.5,
              500,
              194.1,
              95.6,
              54.4
            ]
          }
        ]
      },
      option2: {},
      option2_: {
        chart: {
          zoomType: "x"
        },
        title: {
          text: "测试图"
        },
        xAxis: {
          type: "datetime",
          dateTimeLabelFormats: {
            millisecond: "%H:%M:%S",
            second: "%H:%M:%S",
            minute: "%H:%M",
            hour: "%H:%M",
            day: "%m-%d",
            week: "%m-%d",
            month: "%Y-%m",
            year: "%Y"
          }
        },
        tooltip: {
          dateTimeLabelFormats: {
            millisecond: "%H:%M:%S",
            second: "%H:%M:%S",
            minute: "%H:%M",
            hour: "%H:%M",
            day: "%Y-%m-%d",
            week: "%m-%d",
            month: "%Y-%m",
            year: "%Y"
          }
        },
        yAxis: {
          title: {
            text: ""
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0, "#1989f5"], [1, "rgba(255, 255, 255, 0.1)"]]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series: [
          {
            type: "area",
            name: "测试数据",
            data: []
          }
        ]
      },
      option3: {
        chart: {
          type: "solidgauge"
        },
        title: {
          text: "自定义样式测试",
          style: {
            fontSize: "24px",
            color: "silver"
          }
        },
        tooltip: {
          borderWidth: 0,
          backgroundColor: "none",
          shadow: false,
          style: {
            fontSize: "16px",
            color: "silver"
          },
          pointFormat:
            '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
          positioner: function(labelWidth, labelHeight) {
            return {
              x: (this.chart.chartWidth - labelWidth) / 2,
              y: (this.chart.chartHeight - labelHeight) / 2
            };
          }
        },
        pane: {
          startAngle: 0,
          endAngle: 360,
          background: [
            {
              // Track for Move
              outerRadius: "112%",
              innerRadius: "36%",
              backgroundColor: "rgba(90, 99, 109, 0.1)",
              borderWidth: 0
            }
          ]
        },
        yAxis: {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: []
        },
        legend: {
          cursor: "pointer",
          linecap: "pointer"
          //  itemStyle:{ "color": "red" },
        },
        plotOptions: {
          solidgauge: {
            borderWidth: "30px",
            dataLabels: {
              enabled: false
            },
            stickyTracking: false,
            showInLegend: true
          }
        },

        series: [
          {
            name: "Move",
            borderColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0, "#ff0000"], [1, "#ff9393"]]
            },
            data: [
              {
                color: {
                  linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                  },
                  stops: [[0, "#ff0000"], [1, "#ff9393"]]
                },
                radius: "100%",
                innerRadius: "100%",
                y: 80
              }
            ]
          },
          {
            name: "Exercise",
            borderColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0, "#2cfb00"], [1, "#a8ff95"]]
            },
            data: [
              {
                color: {
                  linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                  },
                  stops: [[0, "#2cfb00"], [1, "#a8ff95"]]
                },
                radius: "75%",
                innerRadius: "75%",
                y: 65
              }
            ]
          },
          {
            name: "Stand",
            borderColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0, "#efff00"], [1, "#f8ff96"]]
            },
            data: [
              {
                color: {
                  linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                  },
                  stops: [[0, "#efff00"], [1, "#f8ff96"]]
                },
                radius: "50%",
                innerRadius: "50%",
                y: 50
              }
            ]
          }
        ]
      }
    };
  },

  beforeCreate: function() {
    myvue = this;
   
  },
  methods: {
    callback(key) {
      console.log(key);
    },

    onChange(date, dateString) {
      this.$message.success(dateString);
      console.log(date, dateString);
    },
    onClickDZ(item) {
      item.selected = !item.selected;
    },
    onClickName(val, Y, item) {
      var map = this.map;
      item.datas.map((_d, key) => {
        _d.selected = false;
      });
      if (Y) {
        item.val = val.name;
        item.type = val.type;
        util.CitySearch(val.name).then(response => {
          var data = response.data.result;
          map.centerAndZoom(
            new BMap.Point(data.location.lng, data.location.lat),
            13
          );
        });
      }
      val.selected = true;
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
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
    }
  },
  mounted: function() {
    let _this = this;
    this.userName = this.$route.params.userName;
    myvue.other.title.text = "2010 ~ 2016 年太阳能行业就业人员发展情况";
    myvue.other.series = myvue.data; //数据
    myvue.other.yAxis.title.text = "就业人数"; //数据
    myvue.option = myvue.other;

    // $.getJSON(
    //   "https://data.jianshukeji.com/jsonp?filename=json/usdeur.json&callback=?",
    //   function(data) {

    let interval = null;
    clearInterval(interval);
    myvue.option2_.series[0].data.push([
      new Date().getTime(),
       (Math.floor(Math.random() * new Date().getMilliseconds()))<100?null:Math.floor(Math.random() * new Date().getMilliseconds())
    ],[
      new Date().getTime()-36e5,
      (Math.floor(Math.random() * new Date().getMilliseconds()))<100?null:Math.floor(Math.random() * new Date().getMilliseconds())
    ],[
      new Date().getTime()-(36e5*2),
       (Math.floor(Math.random() * new Date().getMilliseconds()))<100?null:Math.floor(Math.random() * new Date().getMilliseconds())
    ],[
      new Date().getTime()-(36e5*3),
      (Math.floor(Math.random() * new Date().getMilliseconds()))<100?null:Math.floor(Math.random() * new Date().getMilliseconds())
    ],[
      new Date().getTime()-(36e5*4),
      (Math.floor(Math.random() * new Date().getMilliseconds()))<100?null:Math.floor(Math.random() * new Date().getMilliseconds())
    ],[
      new Date().getTime()-(36e5*5),
      (Math.floor(Math.random() * new Date().getMilliseconds()))<100?null:Math.floor(Math.random() * new Date().getMilliseconds())
    ],[
      new Date().getTime()-(36e5*6),
      (Math.floor(Math.random() * new Date().getMilliseconds()))<100?null:Math.floor(Math.random() * new Date().getMilliseconds())
    ]); //数据
    myvue.option2 = myvue.option2_; //数据
    interval = setInterval(() => {
      var data = [
        new Date().getTime(),
       (Math.floor(Math.random() * new Date().getMilliseconds()))<100?null:Math.floor(Math.random() * new Date().getMilliseconds())
      ];
      try {
         if (_this.$refs.option2) {
        var series = _this.$refs.option2.chart.series[0];
        series.addPoint(data, true, true);
      }
      } catch (err) {
        //在这里处理错误
      }
     
    }, 1000);

    this.MapPlug_in[0].datas.map((_d, key) => {
      util.Meteorological(_d.name, json => {
        var data = JSON.parse(json).data;
        if (data && data.forecast) {
          _d.type = data.forecast[0].type;
          if (_d.selected) {
            _this.MapPlug_in[0].type = data.forecast[0].type;
          }
        }
      });
    });
    //  var player = unll;
    var url = $("#url")
      .val()
      .trim();
    $("#myPlayer").attr("src", url);
    // $("#init").click()
    var player = new EZUIKit.EZUIPlayer("myPlayer");
    $("#init").click(function() {
      var url = $("#url")
        .val()
        .trim();
      $("#myPlayer").attr("src", url);
      player = new EZUIKit.EZUIPlayer("myPlayer");
    });
    $("#stop").click(function() {
      player.stop();
    });


    this.$nextTick(function() {
      myvue.BaiduMap.init().then(BMap => {
        let map = new BMap.Map(this.$refs.allmap); // 创建Map实例
        this.map = map;
        // map.setMapStyle({ style: "googlelite" }); // {style:'googlelite'} { styleJson: styleJson }
        map.setMapStyle({
          styleId: "404aab9977b56a8658b70eb85fbd70ab" //404aab9977b56a8658b70eb85fbd70ab
        });
        // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
        // map.addControl(new BMap.MapTypeControl({ //添加地图类型控件
        //     mapTypes: [
        //         BMAP_NORMAL_MAP,
        //         BMAP_HYBRID_MAP
        //     ]
        // }));
        // map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
        // map.enableScrollWheelZoom(true);  //开启鼠标滚轮缩放
        // var map = new BMap.Map("container"); 120.218471 30.214333

        util.CitySearch(this.MapPlug_in[0].val).then(response => {
          var data = response.data.result;
          map.centerAndZoom(
            new BMap.Point(data.location.lng, data.location.lat),
            13
          );
        });
        // map.centerAndZoom(new BMap.Point(116.413384, 39.910925), 13); //初始化地图,设置中心点坐标和地图级别

        var ctrl_sca = new BMap.ScaleControl({
          anchor: BMAP_ANCHOR_BOTTOM_LEFT
        });
        map.addControl(ctrl_sca);

        // map.addControl(new BMap.NavigationControl()); //地图平移缩放控件PC端默认位于地图左上方，它包含控制地图的平移和缩放的功能。移动端提供缩放控件，默认位于地图右下方。
        // map.addControl(new BMap.OverviewMapControl()); //添加缩略地图控件，默认位于地图右下方，是一个可折叠的缩略地图。
        // map.addControl(new BMap.ScaleControl()); //比例尺控件，默认位于地图左下方，显示地图的比例关系。
        // map.addControl(new BMap.MapTypeControl()); //地图类型控件，默认位于地图右上方。
        // map.addControl(new BMap.GeolocationControl()); //定位控件，针对移动端开发，默认位于地图左下方。
        // map.addControl(new BMap.CopyrightControl());     //版权控件，默认位于地图左下方。

        map.enableScrollWheelZoom();
        var marker = new BMap.Marker(new BMap.Point(120.22551, 30.252087));
        map.addOverlay(marker);
        var marker1 = new BMap.Marker(new BMap.Point(120.21551, 30.253082));
        map.addOverlay(marker1);

        map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
        map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard(); //启用键盘上下左右键移动地图

        var opts1 = { width: 300 };

        // marker.openInfoWindow(infoWindow);

        marker.addEventListener("click", function() {
          var licontent = "<b>测试地址11111</b><br>";
          licontent +=
            "<span><strong>地址：</strong>杭州地区 测试测试测试测试</span><br>";
          licontent +=
            "<span><strong>电话：</strong>(010)63095718,(010)63095630</span><br>";
          var infoWindow = new BMap.InfoWindow(licontent, opts1);

          marker.openInfoWindow(infoWindow);
        });
        marker1.addEventListener("click", function() {
          var div1 = document.createElement("div");
          div1.classList.add("dropdown");
          div1.innerHTML = "aaaaaaaaaa";
          div1.addEventListener("click", function() {
            alert("aaaaa");
          });

          var licontent =
            "<a href='javascript:alert(" +
            toString(div1.innerHTML) +
            "))'>测试地址22222</a><br>";
          licontent +=
            "<span><strong>地址：</strong>杭州地区 测试测试测试测试</span><br>";
          licontent +=
            "<span><strong>电话：</strong>(010)63095718,(010)63095630</span><br>";

          var infoWindow = new BMap.InfoWindow(licontent, opts1);

          marker1.openInfoWindow(infoWindow);
        });

        // map.setCurrentCity("杭州"); // 设置地图显示的城市 此项是必须设置的
        // map.enableScrollWheelZoom(true);  //开启鼠标滚轮缩放
      });
    });
  }
};
</script>
<style scoped lang="less">
@import "./index.less";
.high {
  width: 100%;
  height: 500px;
  margin: 40px auto;
}
#allmap {
  height: 600px;
}
</style>
