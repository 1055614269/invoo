<template>
  <div class="WindSpeedDirection">
    <x-chart id="WindSpeedDirection" class="high" :option="option" ref="windSpeedDirection"></x-chart>
  </div>
</template>
<script>
import XChart from "@/components/pages/charts/charts";
// import HighCharts from "highcharts";
export default {
  name: "WindSpeedDirection", //风速/风向
  components: {
    XChart
  },

  data() {
    var d = new Date();
    d.setHours(d.getHours()-8)
    return {
      series: null,
      optionData: {},
      option: {
        title: {
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
          offset: 40
        },
        
        plotOptions: {
          series: {
            pointStart: Date.UTC(
              d.getFullYear(),
              d.getMonth() + 1,
              d.getDate(),
              d.getHours(),
              d.getMinutes()
            ),
            pointInterval: -6e4
          }
        },

        series: [
          {
            type: "windbarb",
            data: [
              [9.8, 177.9],
              [10.1, 177.2],
              [11.3, 179.7],
              [10.9, 175.5],
              [9.3, 159.9],
              [8.8, 159.6],
              [7.8, 162.6],
              [5.6, 186.2]
            ],
            name: "风向",
            color: "#3e97f1",
            // showInLegend: false,
            tooltip: {
              valueSuffix: " m/s"
            }
          },
          {
            type: "area",
            keys: ["y", "rotation"], // rotation is not used here
            data: [
                [9.8, 177.9],
              [10.1, 177.2],
              [11.3, 179.7],
              [10.9, 175.5],
              [9.3, 159.9],
              [8.8, 159.6],
              [7.8, 162.6],
              [5.6, 186.2]
              // [new Date().getTime(), 9.8],
              // [new Date().getTime() - 36e3, 10.1],
              // [new Date().getTime() - 36e3 * 2, 11.3],
              // [new Date().getTime() - 36e3 * 3, 10.9],
              // [new Date().getTime() - 36e3 * 4, 9.3],
              // [new Date().getTime() - 36e3 * 5, 8.8],
              // [new Date().getTime() - 36e3 * 6, 7.8],
              // [new Date().getTime() - 36e3 * 7, 5.6]
            ],
            color: "#3e97f1",
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0, "#d9e9f9 "], [1, "#ffffff01"]]
            },
            name: "风速",
            tooltip: {
              valueSuffix: " m/s"
            }
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
  watch: {
    // option() {
    //   this.chart = HighCharts.chart(this.id, this.option);
    // }
  },
  created() {
    this.option.series[0].data = JSON.parse(JSON.stringify(this.datas[0])).reverse();
    this.option.series[1].data = JSON.parse(JSON.stringify(this.datas[1])).reverse();
  },
  mounted() {
    this.$nextTick(() => {
      this.series = this.$refs.windSpeedDirection.chart.series[0];
      this.series2 = this.$refs.windSpeedDirection.chart.series[1];
    });
  },
  methods: {}
};
</script>
<style scoped lang="less">
.high {
  height: 240px;
  margin-top: 20px;
}
</style>