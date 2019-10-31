<template>
  <div id="cbgl">
    <div class="t">
      <span @click="isKeys('sbsj')">设备数据</span>
      <span class="record">今日超标</span>
      <span @click="isKeys('lscb')">七天超标</span>
      <!-- <div @click="visible=true">
      <a-icon type="audit" />规则设置
      </div>-->
    </div>
    <div class="body">
      <!-- <div class="t"></div> -->
      <div class="tj">
        <span>
          报建编号：
          <a-input v-model="construction_SN" style="width: 150px;" placeholder="报建编号" />
        </span>
        <span>
          名称：
          <a-input v-model="construction_name" style="width: 150px;" placeholder="名称" />
        </span>
        <span>
          超标时间：
          <a-range-picker @change="onChangeDate" />
        </span>

        <a-button type="primary" @click style="margin-left: 8px">查询</a-button>
        <div style="float: right;cursor: pointer;">
          <a-button style="margin-left: 8px">导出</a-button>
        </div>
      </div>
      <a-table
        class="table"
        :columns="ExceedingEquipmentColumns"
        :dataSource="ExceedingEquipment"
        :expandedRowKeys="expandedRowKeys"
        @expand="expand"
        :pagination="false"
      >
        <div
          slot="filterDropdown"
          slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
          class="custom-filter-dropdown"
        >
          <!-- <a-input
            v-ant-ref="c => searchInput = c"
            :placeholder="`请输入地区`"
            :value="selectedKeys[0]"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="() => handleSearch(selectedKeys, confirm)"
            style="width: 188px; margin-bottom: 8px; display: block;"
          />-->
          <a-select
            defaultValue
            placeholder="区域"
            optionFilterProp="children"
            style="width: 188px; margin-bottom: 8px; display: block;"
            @change="(val)=>handleChange(val,clearFilters)"
          >
            <a-select-option :value="''">全部</a-select-option>
            <a-select-option
              :key="key"
              v-for="(val,key) in CityList"
              :value="val.County_Id"
            >{{val.County_Id}}</a-select-option>
          </a-select>
          <!-- <a-button
            type="primary"
            @click="() => handleSearch(clearFilters)"
            icon="search"
            size="small"
            style="width: 90px; margin-right: 8px"
          >查询</a-button>
          <a-button @click="() => handleReset(clearFilters)" size="small" style="width: 90px">关闭</a-button>-->
        </div>
        <div slot="Construction_Name" slot-scope="Construction_Name">
          <a-popover title="单位信息" trigger="hover" style="line-height: 40px;" class="f-left">
            <template slot="content">
              <div class="popup">
                <div class="t-left t-right m-t-10">
                  <b>业主单位:</b> （甲方）
                </div>
                <div class="t-left t-right m-t-10">
                  <b>施工单位:</b> （已方）
                </div>
                <div class="t-left t-right m-t-10">
                  <b>项目类型:</b> （类型）
                </div>
                <div class="t-left t-right m-t-10">
                  <b>施工周期:</b> （施工周期）
                </div>
              </div>
            </template>
            <!-- <a-avatar size="small" src="../../../static/img/sb.svg" /> -->
            <a-icon class="green-h" style="cursor: pointer;" type="question-circle" />
          </a-popover>
          <div class="t">{{Construction_Name}}</div>
        </div>
        <div slot="type" slot-scope="type,data">
          <td
            :data-sparkline="data.exceedingEquipmentList[0].dataList.map((_d,i)=>{ return parseFloat(_d.TSP) })"
          ></td>
        </div>
        <div slot="ExceedingTime" slot-scope="ExceedingTime,data">{{ExceedingTime.replace('T'," ")}}</div>
        <!-- <div slot="cb" slot-scope="cd,data">1.111</div>  -->
        <!-- <div slot="sbs" slot-scope="sbs,data">{{data.exceedingEquipmentList.length}}</div> -->
        <span slot="exceedingEquipmentList" slot-scope="exceedingEquipmentList,data">
          <div v-for="(_d,i) in exceedingEquipmentList">
            <a-popover :title="_d.equipment_name" trigger="hover">
              <template slot="content">
                <div>
                  <div class="t-left t-right">
                    <b>TSP:</b>
                  </div>
                  <div>
                    平均值：
                    <b class="red">{{_d.TSPAVG?_d.TSPAVG:'-'}}</b>(mg/m3)
                  </div>
                  <div>
                    最高值：
                    <b class="red">{{_d.TSPMAX?_d.TSPMAX:'-'}}</b>(mg/m3)
                  </div>
                </div>
                <div>
                  <div class="t-left t-right">
                    <b>噪声:</b>
                  </div>
                  <div>
                    平均值：
                    <b class="red">{{_d.noiseAVG?_d.noiseAVG:'-'}}</b>(dB)
                  </div>
                  <div>
                    最高值：
                    <b class="red">{{_d.noiseMAX?_d.noiseMAX:'-'}}</b>(dB)
                  </div>
                  <!-- <div>
                    <a @click="onDeviceDetails(_d.equipment_Id,data,_d)">查看详情</a>
                  </div>-->
                </div>
              </template>
              <!-- <a-avatar size="small" src="../../../static/img/sb.svg" /> -->
              <a-badge class="sb" :numberStyle="{fontSize: '20px'}" status="processing" text />
            </a-popover>
          </div>
        </span>
        <div slot="cz" slot-scope="cz,data">
          <a-dropdown>
             <span class="an1" style="font-size: 24px;cursor: default;">
              <b style="color:#2d75f0">·</b> 
              <b style="color:red">·</b>
              <b style="color:#00bd74">·</b>
            </span>
            <a-menu slot="overlay">
              <a-menu-item key="0">
                <div
                  class="b-img1"
                  target="_blank"
                  v-if="data.IsAttention==0"
                  rel="noopener noreferrer"
                  @click="AddOrCancelAttention(data,data.Construction_Id,1)"
                >加入关注</div>
                <div
                  class="b-img1"
                  target="_blank"
                  v-if="data.IsAttention==1"
                  rel="noopener noreferrer"
                  @click="AddOrCancelAttention(data,data.Construction_Id,2)"
                >取消关注</div>
              </a-menu-item>
              <a-menu-item key="1" disabled>
                <div target="_blank" rel="noopener noreferrer">导出数据</div>
              </a-menu-item>
              <a-menu-item key="3">
                <div
                  class="b-img4"
                  target="_blank"
                  @click="visible2=true"
                  rel="noopener noreferrer"
                >发送通知</div>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <!-- <a-dropdown>
            <a-button class="an1" @click>
              <b style="color:#2d75f0">.</b>
              <b style="color:red">.</b>
              <b style="color:#00bd74">.</b>
          </a-button>-->

          <!-- <a-menu slot="overlay">
              <a-menu-item key="0">
                <div
                  class="b-img1"
                  target="_blank"
                  v-if="data.IsAttention==0"
                  rel="noopener noreferrer"
                  @click="AddOrCancelAttention(data,data.Construction_Id,1)"
                >加入关注</div>
                <div
                  class="b-img1"
                  target="_blank"
                  v-if="data.IsAttention==1"
                  rel="noopener noreferrer"
                  @click="AddOrCancelAttention(data,data.Construction_Id,2)"
                >取消关注</div>
          </a-menu-item>-->
          <!-- <a-menu-item key="1">
                <div class="b-img2" target="_blank" rel="noopener noreferrer">查看记录</div>
          </a-menu-item>-->
          <!-- <a-menu-item key="2">
                <div class="b-img3" target="_blank" rel="noopener noreferrer">单位信息</div>
          </a-menu-item>-->
          <!-- <a-menu-item key="3">
                <div
                  class="b-img4"
                  target="_blank"
                  @click="visible=true"
                  rel="noopener noreferrer"
                >发送通知</div>
          </a-menu-item>-->
          <!-- <a-menu-divider />
          <a-menu-item key="3" disabled>3rd menu item（disabled）</a-menu-item>-->
          <!-- </a-menu>
          </a-dropdown>-->
        </div>
        <div slot="expandedRowRender" slot-scope="record" style="margin: 0">
          <a-tabs
            defaultActiveKey="0"
            :style="{ height: '260px',textAlign: 'left'}"
            @change="(key)=>change(record.exceedingEquipmentList,key)"
          >
            <a-tab-pane
              v-for="(_d,i) in record.exceedingEquipmentList"
              :tab="_d.equipment_name"
              :key="i"
            >
              <div class="highcharts_sb">
                <x-chart :id="'highcharts_sbxx_data'+_d.equipment_Id" class="high" :option="option"></x-chart>
                <x-chart
                  :id="'highcharts_zdgz' + _d.equipment_name"
                  class="high"
                  :option="option"
                  :ref="i + _d.equipment_name + 'highcharts'"
                ></x-chart>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-table>

      <!-- <a-collapse
        v-if="ExceedingEquipment.length > 0"
        defaultActiveKey="1"
        accordion
        :bordered="false"
      >
        <a-collapse-panel v-for="(val,key) in ExceedingEquipment" :key="key">
          <template slot="header">
            <td>
              <div class="da">{{val.Construction_Name}}</div>
              <div
                class="tex"
              >超标：{{val.ExceedingEquipmentCount}}台 | 设备数量：{{val.EquipmentCount}} | 超标次数：{{val.ExceedingCount}}</div>
              <div class="tex">{{val.Construction_address}}</div>
            </td>
          </template>
          <a-tabs
            defaultActiveKey="0"
            :style="{ height: '260px'}"
            @change="(key)=>change(val.exceedingEquipmentList,key)"
          >
            <a-tab-pane
              v-for="(_d,i) in val.exceedingEquipmentList"
              :tab="_d.equipment_name"
              :key="i"
            >
              <div class="highcharts_sb">
                <x-chart
                  :id="'highcharts_sbxx_data'+_d.equipment_Id"
                  class="high"
                  :option="option"
                ></x-chart>
                <x-chart
                  :id="'highcharts' + _d.equipment_name"
                  class="high"
                  :option="option"
                  :ref="i + _d.equipment_name + 'highcharts'"
                ></x-chart>
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-collapse-panel>
      </a-collapse>-->
    </div>
    <span class="m-t-10" style="text-align: center;">
      <a-pagination
        @change="onPaging"
        :current="current"
        :total="ExceedingEquipmentTotalCount"
        @showSizeChange="onShowSizeChange"
        showSizeChanger
      />
    </span>
     <a-modal title="通知给：前滩40-01地块项目" centered v-model="visible2" @ok="handleOk" :bodyStyle="{}">
      <a-textarea placeholder="请输入通知内容" :rows="6" />
      <br />
      <br />
      <a-checkbox @change="onChangeDx">短信通知: 15021345644</a-checkbox>
      <br />
      <a-checkbox @change="onChangeDx">微信推送</a-checkbox>
    </a-modal>
  </div>
</template>

<script>
let doChunk = function() {};
import util from "../../http.utils.js";
import XChart from "@/components/pages/charts/charts";
import HighCharts from "highcharts";
export default {
  name: "jrcb", //今日超标
  components: {
    XChart
  },
  data() {
    return {
      typeName: "今日超标",
      searchInput: null,
      expandedRowKeys: [""],
      ExceedingEquipmentColumns: [
        {
          dataIndex: "Construction_Name",
          title: "名称",
          scopedSlots: { customRender: "Construction_Name" },
          width: 300
        },
        {
          dataIndex: "type",
          title: "状态",
          scopedSlots: { customRender: "type" },
          width: 100
        },
        {
          dataIndex: "exceedingEquipmentList",
          title: "超标设备",
          scopedSlots: { customRender: "exceedingEquipmentList" },
          width: 100
        },
        {
          dataIndex: "County_Id",
          title: "区域",
          scopedSlots: { customRender: "County_Id" },
          width: 100,
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "customRender"
          },
          onFilter: (value, record) =>
            record.name.toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
            }
          }
        },

        {
          dataIndex: "TSPAVG",
          title: "超标均值",
          // scopedSlots: { customRender: "TSPAVG" }
          width: 100
        },

        {
          dataIndex: "ExceedingTime",
          title: "超标时间",
          scopedSlots: { customRender: "ExceedingTime" },
          width: 200
        },
        {
          dataIndex: "cz",
          title: "操作",
          scopedSlots: { customRender: "cz" },
          width: 100
        }
      ],
      searchText: "",
      ExceedingEquipment: [], //超标数据
      ExceedingEquipments: [],
      ExceedingEquipmentPagesize: 10,
      ExceedingEquipmentPageno: 1,
      ExceedingEquipmentTotalCount: 0, //超标数量
      construction_name: "", //名称
      construction_SN: "", //报建编号
      punishment_StartTime: "", //开始时间
      punishment_EndTime: "", //结束时间
      //   Construction_Name:"",
      CityList: [],
      County_Id: "",
      area: "萧山区",
      recordType_type: "0",
      constructionType_name: "",
      current: 1,
      visible2:false,
      option: {}
    };
  },

  methods: {
    isKeys: function(key) {
      this.$router.push({
        path: key
      });
    },
    onPaging(current) {
      this.current = current;
      this.getExceedingEquipments("", current, this.ExceedingEquipmentPagesize);
    },
    onShowSizeChange(current, size) {
      this.ExceedingEquipmentPagesize = size;
      this.getExceedingEquipments("", current, size);
    },

    onChangeDate(date, dateString) {
      this.punishment_StartTime = dateString[0];
      this.punishment_EndTime = dateString[1];
      // console.log(date, dateString);
    },
     handleOk(_d) {},
    onChangeDx(e) {
      console.log(`checked = ${e.target.checked}`);
    },
    handleChange(val, clearFilters) {
      clearFilters();
      this.searchText = val;
      // this.County_Id = val;
      this.getExceedingEquipments(
        val,
        this.current,
        this.ExceedingEquipmentPagesize
      );
    },
    AddOrCancelAttention(_d, construction_Id, type) {
      var _this = this;
      util._httpData(this, "Construction/AddOrCancelAttention", {
        user_Id: this.User_Id,
        construction_Id: construction_Id,
        type: type
      }).then = function() {
        if (this.state) {
          if (type == 1) {
            _d.IsAttention = 1;
          } else {
            _d.IsAttention = 0;
            // _this.getExceedingEquipments();
          }

          _this.$message.success(this.message, 4);
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    //获取城市列表
    GetCityList() {
      var _this = this;
      new util._httpData(
        this,
        "Construction/GetCityList",
        {}
      ).then = function() {
        if (this.state) {
          // _this.CityList = this.datas;
          this.datas.map(_d => {
            _d.countyList.map(data => {
              _this.CityList.push({ County_Id: data.County_Id });
            });
          });
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    expand(r, val) {
      if (val.key === this.expandedRowKeys[0]) {
        this.expandedRowKeys = [];
      } else {
        this.expandedRowKeys = [val.key];
      }

      this.change(val.exceedingEquipmentList);
      // debugger
    },
    change(list, key = 0) {
      var data = list[key];
      var datalist = [];

      var _this = this;
      setTimeout(function() {
        data.dataList.map((_d, i) => {
          //.replace( /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,  "$1-$2-$3 $4:$5:$6" )
          // var datatime = new Date(
          //   parseInt(_d.Time)
          // ).getTime();
          datalist.push([parseInt(_d.Time), parseFloat(_d.TSP)]);
        });
        var option = new _this.MyOption();
        option.addSeries({ TSP: datalist });
        _this.option = option;
      }, 100);
    },
    //超标工地分页
    getExceedingEquipments(
      county_Id,
      ExceedingEquipmentPageno,
      ExceedingEquipmentPagesize
    ) {
      var _this = this;
      new util._httpData(this, "Construction/GetExceedingConstruction", {
        city_Id: this.County_Id,
        county_Id: county_Id,
        recordType_type: this.recordType_type,
        constructionType_name: this.constructionType_name,
        pageno: ExceedingEquipmentPageno,
        pagesize: ExceedingEquipmentPagesize
      }).then = function() {
        if (this.state) {
     
         
          _this.ExceedingEquipment = this.data.Data.listExceedingConstruction;
         
          var deleteDataList = function(list){
            for (var key in list) {
              if(list[key].exceedingEquipmentList.length === 0){
                  list.splice(key,1);
                  deleteDataList(list);
                  break;
              }else{
                  for(var i in list[key].exceedingEquipmentList){
                    if(list[key].exceedingEquipmentList[i].dataList.length === 0){
                      list.splice(key,1);
                      deleteDataList(list);
                      break;
                    }
                  }
              }
            }
          }
          deleteDataList(_this.ExceedingEquipment)


          for (var key in _this.ExceedingEquipment) {

            _this.ExceedingEquipment[key].key = key;
          }
          _this.ExceedingEquipmentTotalCount = this.data.TotalCount;
          var dataListCounty = this.data.Data.listCounty;
          setTimeout(doChunk, 100);
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    MyOption() {
      //模板
      (this.chart = {
        type: "areaspline", //spline
        animation: false
      }),
        (this.title = {
          text: ""
        }),
        (this.subtitle = {
          text: ""
        }),
        (this.xAxis = {
          type: "datetime",
          dateTimeLabelFormats: {
            millisecond: "%H:%M:%S.%L",
            second: "%H:%M:%S",
            minute: "%H:%M",
            hour: "%H:%M",
            day: "%e. %b",
            week: "%e. %b",
            month: "%b '%y",
            year: "%Y"
          }
        }),
        (this.yAxis = [
          {
            title: {
              text: "颗粒物(mg/m3)",
              rotation: 0,
              align: "high",
              x: 30,
              margin: -90
            }
          },
          {
            title: {
              text: "噪声(dB)",
              rotation: 0,
              align: "high",
              x: -26,
              margin: -50
            },
            opposite: true
          }
        ]),
        (this.colors = ["#F7374F"]),
        (this.legend = {
          verticalAlign: "top",
          y: -16,
          floating: true,
          borderWidth: 0
        }),
        (this.plotOptions = {
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
              enabled: false,
              states: {
                hover: {
                  enabled: false
                }
              },
              radius: 1
            },

            lineWidth: 2,
            states: {
              hover: {
                lineWidth: 2
              }
            },
            series: {
              animation: false,
              pointStart: Date.UTC(2019, 10, 18),
              pointInterval: 36e5
            }
          }
        }),
        (this.tooltip = {
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
          backgroundColor: "#ffffff",
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.3f}</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true
        }),
        (this.series = []);
      this.addSeries = (types = {}) => {
        for (const type in types) {
          switch (type) {
            case "TSP":
              this.series.push({
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
                // lineColor: "red",
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
                // states: {
                //   hover: {
                //     lineWidth: 2
                //   }
                // },
                name: "TSP",
                data: types[type]
              });
              break;
            case "PM10":
              this.series.push({
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
                  stops: [[0, "#007eff"], [1, "#7ecef1"]]
                },
                name: "PM10",
                data: types[type]
              });
              break;
            case "PM2.5":
              this.series.puah({
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
                data: types[type]
              });
              break;
            case "噪声":
              this.series.push({
                color: "#f7a833",
                marker: {
                  radius: 0
                },
                shadow: {
                  color: "#f7a833",
                  offsetY: 4,
                  // offsetX: 4,
                  opacity: 0.02,
                  width: 8
                },
                lineWidth: 2, //221 242 243 1
                lineColor: "#f7a833",
                type: "spline",
                yAxis: 1,
                name: "噪声",
                data: types[type]
              });
              break;

            default:
              break;
          }
        }
      };
    }
  },
  //加载前执行
  created() {
    this.getExceedingEquipments("", 1, this.ExceedingEquipmentPagesize);
    this.GetCityList();
  },

  //加载后执行
  mounted() {
    let _this = this;
    var SparkLine = function(a, b, c) {
      var hasRenderToArg = typeof a === "string" || a.nodeName,
        options = arguments[hasRenderToArg ? 1 : 0],
        defaultOptions = {
          chart: {
            renderTo: (options.chart && options.chart.renderTo) || this,
            backgroundColor: null,
            borderWidth: 0,
            type: "spline",
            margin: [2, 0, 2, 0],
            width: 100,
            height: 30,
            style: {
              overflow: "visible"
            },
            // small optimalization, saves 1-2 ms each sparkline
            skipClone: true
          },
          title: {
            text: ""
          },
          credits: {
            enabled: false
          },
          xAxis: {
            labels: {
              enabled: false
            },
            title: {
              text: null
            },
            lineWidth: 0,
            startOnTick: false,
            endOnTick: false,
            tickPositions: [],
            type: "datetime",
            dateTimeLabelFormats: {
              millisecond: "%H:%M:%S.%L",
              second: "%H:%M:%S",
              minute: "%H:%M",
              hour: "%H:%M",
              day: "%e. %b",
              week: "%e. %b",
              month: "%b '%y",
              year: "%Y"
            }
          },
          yAxis: {
            endOnTick: false,
            startOnTick: false,
            lineWidth: 0,
            labels: {
              enabled: false
            },
            title: {
              text: null
            },
            tickPositions: [0]
          },
          legend: {
            enabled: false
          },
          tooltip: {
            hideDelay: 0,
            outside: true,
            shared: true
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
            backgroundColor: "#ffffff",
            headerFormat:
              '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
              '<tr><br><td style="padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.3f}</b></td></tr>',
            footerFormat: "</table>",
            // shared: true,
            outside: true,
            shared: true,
            useHTML: true
          },
          plotOptions: {
            series: {
              animation: false,
              lineWidth: 1,
              shadow: false,
              states: {
                // hover: {
                //   lineWidth: 1
                // }
              },
              marker: {
                radius: 1
                // states: {
                //   hover: {
                //     radius: 2
                //   }
                // }
              },
              fillOpacity: 0.25
            },
            column: {
              negativeColor: "#910000",
              borderColor: "silver"
            }
          }
        };
      options = HighCharts.merge(defaultOptions, options);
      return hasRenderToArg
        ? new HighCharts.Chart(a, options, c)
        : new HighCharts.Chart(options, b);
    };

    doChunk = function() {
      var start = +new Date(),
        $tds = $("td[data-sparkline]"),
        fullLen = $tds.length,
        n = 0;
      var time = +new Date(),
        i,
        len = $tds.length,
        $td,
        stringdata,
        arr,
        data,
        chart;
      for (i = 0; i < len; i += 1) {
        $td = $($tds[i]);
        stringdata = $td.data("sparkline");
        arr = stringdata.split("; ");
        data = $.map(arr[0].split(","), parseFloat);
        chart = {};
        if (arr[1]) {
          chart.type = arr[1];
        }

        SparkLine($td[0], {
          series: [
            {
              // color: {
              //   linearGradient: {
              //     x1: 0,
              //     y1: 0,
              //     x2: 0,
              //     y2: 1
              //   },
              //   stops: [[0, "#f7c0c8"], [1, "#cdf7dc60"]]
              // },
              // marker: {
              //   radius: 0
              // },
              lineWidth: 2,
              lineColor: {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
                },
                stops: [[0, "#ff0000"], [0, "#ff8080"]]
              },
              marker: {
                radius: 0
              },
              // shadow: {
              //   color:'#ff000030',
              //   offsetY: 4,
              //   width: 6
              // },
              shadow: {
                color: "#000",
                offsetY: 2,
                // offsetX: 4,
                opacity: 0.06,
                width: 4
              },
              data: data,
              pointStart: 1
            }
          ],
          tooltip: {
            headerFormat: "",
            pointFormat: "<b>{point.y}</b>"
          },
          chart: chart
        });
      }
    };
    doChunk();
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>



