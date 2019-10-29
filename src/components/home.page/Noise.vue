<template>
  <div class="Noise">
    <x-chart id="highcharts_noise" class="high" :option="option" ref="option"></x-chart>
  </div>
</template>
<script>
import XChart from "@/components/pages/charts/charts";
import util from "../../http.utils.js";
export default {
  name: "Noise", //噪声
  components: {
    XChart
  },
  data() {
    return {
      series: null,
      _chart: null,
      optionData: {},
      option: {},
      option_: {
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
          }
        },
        yAxis: {
          title: {
            text: "分贝",
            rotation: 0,
            align: "high",
            x: 30,
            margin: -30
          }
        },
        colors: ["#F7374F"],
        legend: {
          verticalAlign: "top",
          y: -16,
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
          // threshold: null
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
          borderWidth: 1,
          backgroundColor: "#ffffff99",
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
          footerFormat: "</table>",
          useHTML: true
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
              stops: [[0, "#d9e9f9"], [1, "#ffffff99"]]
            },
            marker: {
              radius: 0
            },
            shadow: {
              color: "#000",
              offsetY: 4,
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
              stops: [[0, "#2f93fa"], [1, "#7ecef1"]]
            },
            name: "噪声",
            data: []
          }
        ]
      },
      noise: [] //噪音
    };
  },
  // 验证类型
  props: {
    id: {
      type: String
    },
    datas: {
      type: Array
    }
  },
  mounted() {
    this.option_.series[0].data = this.datas[0];
    
    this.option = this.option_; //数据
 
    this._chart = this.$refs.option; //视图对象
  },
  created() {},
  methods: {
    update() {

    }
    
  }
};
</script>
<style scoped lang="less">
.high {
  height: 240px;
  margin-top: 20px;
}
</style>