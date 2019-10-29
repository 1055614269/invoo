<template>
  <div class="TemperatureAndHumidity">
    <x-chart id="highcharts_temperature" class="high" :option="option" ref="option"></x-chart>
    <x-chart id="highcharts_humidity" class="high" :option="option2" ref="option2"></x-chart>
  </div>
</template>
<script>
import XChart from "@/components/pages/charts/charts";
export default {
  name: "TemperatureAndHumidity", //温湿度
  components: {
    XChart
  },
  data() {
    var d = new Date();
    return {
      series: null,
      series2: null,
      optionData: {},
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
          // dateTimeLabelFormats: {
          //   millisecond: "%H:%M:%S",
          //   second: "%H:%M:%S",
          //   minute: "%H:%M",
          //   hour: "%H:%M",
          //   day: "%m-%d",
          //   week: "%m-%d",
          //   month: "%Y-%m",
          //   year: "%Y"
          // }
        },
        // tooltip: {
        //   dateTimeLabelFormats: {
        //     millisecond: "%H:%M:"
        //   }
        // },
        yAxis: {
          title: {
            text: "℃",
            rotation: 0,
            align: "high",
            x: 30,
            margin: -15
          }
        },
        colors: ["#F7374F"],
        // legend: {
        // 	enabled: false
        // },
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
          // shared: true,
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
            name: "温度",
            data: [
              [new Date().getTime() - 50000000, 23],
              [new Date().getTime() - 40000000, 23],
              [new Date().getTime() - 30000000, 24],
              [new Date().getTime() - 20000000, 23],
              [new Date().getTime() - 10000000, 23],
              [new Date().getTime(), 23]
            ]
          }
        ]
      },
      option2: {
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
          // dateTimeLabelFormats: {
          //   millisecond: "%H:%M:%S",
          //   second: "%H:%M:%S",
          //   minute: "%H:%M",
          //   hour: "%H:%M",
          //   day: "%m-%d",
          //   week: "%m-%d",
          //   month: "%Y-%m",
          //   year: "%Y"
          // }
        },
       
        // tooltip: {
        //   dateTimeLabelFormats: {
        //     millisecond: "%H:%M:"
        //   }
        // },
        yAxis: {
          title: {
            text: "湿度",
            rotation: 0,
            align: "high",
            x: 30,
            margin: -30
          }
        },
        colors: ["#F7374F"],
        // legend: {
        // 	enabled: false
        // },
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
          // shared: true,
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
            name: "湿度",
            data: [
              // [new Date().getTime() - 50000000, 66],
              // [new Date().getTime() - 40000000, 65],
              // [new Date().getTime() - 30000000, 65],
              // [new Date().getTime() - 20000000, 65],
              // [new Date().getTime() - 10000000, 65],
              // [new Date().getTime(), 65]
            ]
          }
        ]
      }
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


  created() {
     this.option.series[0].data = this.datas[0];
     this.option2.series[0].data = this.datas[1];
  },
  mounted() {
    // this.chart = HighCharts.chart(this.id, this.option);
    this.$nextTick(() => {
      this.series = this.$refs.option.chart.series[0];
      this.series2 = this.$refs.option2.chart.series[0];
    });
  },
  methods: {
    update() {
      //  return HighCharts.chart(this.id, this.option);
    }
  }
};
</script>
<style scoped lang="less">
.high {
  height: 130px;
  margin-top: 20px;
}
</style>