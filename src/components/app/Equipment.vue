<template>
  <div id="Equipment">
    <div class="stdata">
      <div class="nr-body">
        <van-nav-bar :title="'大桥工地' + id" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="tj">
          <a-row type="flex" justify="center">
            <a-col :span="6">
              <span @click="onDateType('日')" class="dz">日</span>
            </a-col>
            <a-col :span="6">
              <span @click="onDateType('周')" class="dz">周</span>
            </a-col>
            <a-col :span="6">
              <span @click="onDateType('月')" class="dz">月</span>
            </a-col>
            <a-col :span="6">
              <span @click="onDateType('年')" class="dz">年</span>
            </a-col>
          </a-row>
          <div class="date">
            <span class="date-bj">
              <van-icon name="arrow-left" />
            </span>
            <span class="sj">{{dateType=="日"?dateChoice:dateChoice + '至' + dateChoice_}}</span>
            <span class="date-bj">
              <van-icon name="arrow" />
            </span>
          </div>
          <div></div>
        </div>
        <div class="tx">
          <div class="tsk"></div>
          <x-chart id="highcharts1" class="high" :option="option"></x-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Dialog } from "vant";

// 日期，在原有日期基础上，增加days天数
function setToDate(date, days = 0, type) {
  var date = new Date(date);
   
  switch (type) {
    case "r":
         date.setDate(date.getDate() + days);
      break;
    case "y":
        date.setMonth(date.getMonth() + days);
      break;
    case "n":
        date.setFullYear(date.getFullYear() + days);
      break;
  }

  var month = date.getMonth() + 1;
  var day = date.getDate();
  return (
    date.getFullYear() + "-" + getFormatDate(month) + "-" + getFormatDate(day)
  );
}

// 日期月份/天的显示，如果是1位数，则在前面加上'0'
function getFormatDate(arg) {
  if (arg == undefined || arg == "") {
    return "";
  }
  var re = arg + "";
  if (re.length < 2) {
    re = "0" + re;
  }
  return re;
}
var data = [
  [new Date().getTime() - 50000000, 3],
  [new Date().getTime() - 40000000, 4],
  [new Date().getTime() - 30000000, 6],
  [new Date().getTime() - 20000000, 4],
  [new Date().getTime() - 10000000, 2],
  [new Date().getTime(), 3]
];
var data2 = [
  [new Date().getTime() - 50000000, 1],
  [new Date().getTime() - 40000000, 5],
  [new Date().getTime() - 30000000, 9],
  [new Date().getTime() - 20000000, 3],
  [new Date().getTime() - 10000000, 5],
  [new Date().getTime(), 7]
];
var data3 = [
  [new Date().getTime() - 50000000, 4],
  [new Date().getTime() - 40000000, 5],
  [new Date().getTime() - 30000000, 2],
  [new Date().getTime() - 20000000, 7],
  [new Date().getTime() - 10000000, 4],
  [new Date().getTime(), 4]
];
import util from "../../http.utils.js";
import XChart from "@/components/pages/charts/charts";
import HighCharts from "highcharts";
export default {
  name: "Equipment",
  components: {
    XChart
  },
  data() {
    return {
      typeName: "工地信息",
      id: 1,
      list: [],
      dateType: "日",
      dateChoice: setToDate(new Date()),
      dateChoice_: setToDate(new Date()),
      option: {
        chart: {
          type: "areaspline" //spline
        },
        title: {
          text: ""
        },
        subtitle: {
          text: ""
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
          },
          labels: {
            rotation: -45 // 设置轴标签旋转角度
          }
        },
        yAxis: {
          title: {
            text: ""
          }
        },
        colors: ["#F7374F"],
        legend: {
          verticalAlign: "top",
          y: -17,
          floating: true,
          borderWidth: 0
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
              stops: [[0, "#F7374F50 "], [1, "#ffffff01"]]
            },
            marker: {
              radius: 1
            },
            lineWidth: 2,
            states: {
              hover: {
                lineWidth: 2
              }
            }
          }
        },
        tooltip: {
          dateTimeLabelFormats: {
            millisecond: "%H:%M:",
            second: "%H:%M:",
            minute: "%H:%M",
            hour: "%H:%M",
            day: "%m-%d",
            week: "%m-%d",
            month: "%Y-%m",
            year: "%Y"
          },
          // //   crosshairs: {
          // //     type: "y"
          // //   },
          //   containerTpl: '<div class="m-tooltip-hide">' + "{point.key}</div>",
          // headerFormat:
          //   '<span style="font-size:10px">{point.key}</span><table>',
          //   //   pointFormat:
          //   //     '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          //   //     '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',

          shared: true,
          // useHTML: true,
          borderWidth: 0,
          backgroundColor: "#00000070",
          outside: true,
          //   shadow: true,
          style: {
            fontSize: "16px",
            color: "#000"
          },
          headerFormat:
            "<span style='color: #3c3c3c'>{point.key} </span><table>",
          pointFormat:
            '<tr><td style="color: {series.color};"><span style=" color: {point.color}; font-weight: bold; fontSize: "12px""> {series.name}: </span></td>' +
            '<td style="text-align: right"><b><span style=" color: {point.color}; font-weight: bold">{point.y} </span></b></td></tr>',
          footerFormat: "</table>",
          //   formatter: function(_d) {
 
          //     var d = new Date(this.x);
          //     var hour = d.getHours();
          //     var minute = d.getMinutes();
          //     var second = d.getSeconds();
          //     var html =
          //       "<span style=' width: 200px;'><span >" + hour + ":" + minute + "</span></span>";
          //     for (var key in this.points) {
          //       var series = this.points[key].series;
          //       html += ""
          //     }

          //     // var s = '<b>' + d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日' + '</b>';
          //     // s += '<br/><span style="color:' + this.point.series.color + '">' + this.point.series.name + ': ' +
          //     //     this.point.y.toFixed(2) + '%' + ' </span>';
          //     return html;
          //   },
          //   containerTpl: '<div class="equipment-highCharts-t1">' + "111</div>",
          // headerFormat:'<div class="equipment-highCharts-t1"><span style="">{point.key}',
          // pointFormat:
          //   '</span><span style=" color: {point.color}; font-weight: bold">    ----{point.y}</span></div>',
          // footerFormat: "",
          positioner: function(labelWidth, labelHeight) {
     
            //   point
            return {
              x: (this.chart.chartWidth - labelWidth) / 2 - 15,
              y: (this.chart.chartHeight - labelHeight) / 1
            };
          }
        },
        series: [
          {
            color: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0, "#007eff"], [1, "#ffffff99"]]
            },
            marker: {
              radius: 0
            },
            shadow: {
              color: "#000",
              offsetY: 4,
              // offsetX: 4,
              opacity: 0.02,
              width: 8
            },
            lineColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0, "#007eff"], [1, "#7ecef1"]]
            },
            lineWidth: 2,
            name: "PM10",
            data: data3
          },
          {
            color: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0, "#ddf2f3"], [1, "#ffffff99"]]
            },
            marker: {
              radius: 0
            },
            shadow: {
              color: "#000",
              offsetY: 4,
              // offsetX: 4,
              opacity: 0.02,
              width: 8
            },
            lineWidth: 2, //221 242 243 1
            lineColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0, "#00ffb8"], [1, "#6afbdc"]]
            },
            name: "PM2.5",
            data: data2
          },
          {
            color: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0, "#f7c0c8"], [1, "#ffffff99"]]
            },
            marker: {
              radius: 0
            },
            shadow: {
              color: "#000",
              offsetY: 4,
              // offsetX: 4,
              opacity: 0.02,
              width: 8
            },
            lineColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0, "#ff0000"], [0, "#ff8080"]]
            },
            lineWidth: 2,
            name: "TSP",
            data: data
          }
        ]
      }
    };
  },

  //加载后执行
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
      // history.back();
      // window.history.back();
    },
    onDateType(type) {
      this.dateType = type;
      switch (type) {
        case "日":
          this.dateChoice = setToDate(new Date());
          break;
        case "周":
          this.dateChoice = setToDate(this.dateChoice_, -7, "r");
          //   this.dateChoice="2019-07-15";
          //   this.dateChoice_ = "2019-07-21";
          break;
        case "月":
          this.dateChoice = setToDate(this.dateChoice_, -1, "y");
          break;
        case "年":
          this.dateChoice = setToDate(this.dateChoice_, -1, "n");
          break;
      }
    },
    onInput(value) {
      //   Toast(value);
      // this.show1= false
    },
    onDelete() {
      //   Toast("删除");
      // this.show1= false
    },

    onObtain() {},
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    }
  },
  //加载前执行
  created() {
    this.id = this.$route.params.id;
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>






