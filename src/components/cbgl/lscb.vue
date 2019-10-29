<template>
  <div id="cbgl">
    <div class="t">
      <!-- <span @click="record='超标记录'" :class="record=='超标记录'?'record':''">超标记录</span> -->
      <!-- <span @click="record='处罚记录'" :class="record=='处罚记录'?'record':''">处罚记录</span>
      <span @click="record='申诉记录'" :class="record=='申诉记录'?'record':''">申诉记录</span>-->
      <span @click="isKeys('sbsj')">设备数据</span>
      <span @click="isKeys('jrcb')">今日超标</span>
      <span class="record">七天超标</span>
      <!-- <div @click="visible=true">
        <a-icon type="audit" />规则设置
      </div>-->

      <a-modal title="规则设置" v-model="visible" @ok="handleOk" :bodyStyle="{padding:'34px'}">
        <div class="tck-body-t">
          <span class="bt">建筑工地</span>
          <a href="JavaScript:;" style="float: right;">设置</a>
          <div class="tck-body-n">
            <span>扬尘标准值：--</span>
            <span>次数标准值：--</span>
            <span>持续时长：--</span>
          </div>
        </div>
        <div class="tck-body-t">
          <span class="bt">堆场码头</span>
          <a href="JavaScript:;" style="float: right;">修改</a>
          <div class="tck-body-n">
            <span>扬尘标准值：0.073</span>
            <span>次数标准值：5次</span>
            <span>持续时长：30分钟</span>
          </div>
        </div>
        <div class="tck-body-t">
          <span class="bt">混泥土场地</span>
          <a href="JavaScript:;" style="float: right;">修改</a>
          <div class="tck-body-n">
            <span>扬尘标准值：0.073</span>
            <span>次数标准值：5次</span>
            <span>持续时长：30分钟</span>
          </div>
        </div>
        <div class="tck-body-t">
          <span class="bt">搅拌场</span>
          <a href="JavaScript:;" style="float: right;">修改</a>
          <div class="tck-body-n">
            <span>扬尘标准值：0.073</span>
            <span>次数标准值：5次</span>
            <span>持续时长：30分钟</span>
          </div>
        </div>
        <div class="tck-body-t">
          <span class="bt">超标通知提醒预设</span>
          <a href="JavaScript:;" style="float: right;">修改</a>
          <div class="tck-body-n">
            <span>亲，你所在的工厂扬尘浓度已经超标，请及时进行处理，否则可能会受到监管处罚。</span>
          </div>
        </div>
      </a-modal>
    </div>
    <div class="body">
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
        <!-- <br /> -->
        <!-- <span>
          城市：
          <a-select
            defaultValue
            placeholder="城市筛选"
            optionFilterProp="children"
            style="width: 200px"
            @change="handleChange"
          >
            <a-select-option :value="''">全部</a-select-option>
            <a-select-option
              :key="key"
              v-for="(val,key) in CityList"
              :value="val.City_Id"
            >{{val.City_Id}}</a-select-option>
          </a-select>
        </span>-->
        <!-- <span>
          类型：
          <a-select
            defaultValue
            placeholder="类型"
            optionFilterProp="children"
            style="width: 200px"
            @change="handleChange2"
          >
            <a-select-option autofocus :value="''">全部</a-select-option>
            <a-select-option
              :key="key"
              v-for="(val,key) in ConstructionTypeList"
              :value="val.Construction_type"
            >{{val.Construction_type}}</a-select-option>
          </a-select>
        </span>-->
        <a-button type="primary" @click="GetExceeding" style="margin-left: 8px">查询</a-button>
        <div style="float: right;cursor: pointer;">
          <a-button style="margin-left: 8px">导出</a-button>
          <!-- <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item key="1">导出勾选</a-menu-item>
              <a-menu-item key="2">导出全部</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              勾选操作
              <a-icon type="down" />
            </a-button>
          </a-dropdown>-->
        </div>
      </div>
      <a-table class="table" :columns="columns" :dataSource="data" :pagination="false">
        <div
          slot="filterDropdown"
          slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
          class="custom-filter-dropdown"
        >
          <a-select
            defaultValue
            class
            placeholder="区域"
            optionFilterProp="children"
            style="width: 188px; margin-bottom: 8px; display: block;"
            @change="(val)=>handleChange_1(val,clearFilters)"
          >
            <a-select-option :value="''">全部</a-select-option>
            <a-select-option
              :key="key"
              v-for="(val,key) in CityList"
              :value="val.County_Id"
            >{{val.County_Id}}</a-select-option>
          </a-select>
        </div>
        <div slot="Construction_name" slot-scope="Construction_name,data">
          <!-- {{}} -->
          <!-- <td
            style="float: left; margin-top: 8px; width: 100px;"
            data-sparkline="23, 25, 29, 41, 44, 60, 34, 30, 25, 32"
            :data-zt="data.zt"
          ></td>-->
          <!-- <td> -->
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
          <div class="t">{{Construction_name}}</div>
          <!-- <div class="da">{{Construction_name}}</div> -->
          <!-- <div>{{data.Construction_type}}</div>
          <div>{{data.Construction_address}}</div>-->
          <!-- </td> -->
        </div>
        <span slot="equipmentList" slot-scope="equipmentList,data">
          <div v-for="(_d,i) in equipmentList">
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
                  <div>
                    <a @click="onDeviceDetails(_d.equipment_Id,data,_d)">查看详情</a>
                  </div>
                </div>
              </template>
              <!-- <a-avatar size="small" src="../../../static/img/sb.svg" /> -->
              <a-badge class="sb" :numberStyle="{fontSize: '20px'}" status="processing" text />
            </a-popover>
          </div>
        </span>
        <!-- <span slot="age" slot-scope="age">
          <a-icon type="smile-o" />
          {{age}}
        </span>-->

        <span slot="cz" slot-scope="cz, data">
          <a-dropdown>
            <span style="font-size: 26px;cursor: default;">...</span>
            <a-menu slot="overlay">
              <a-menu-item key="0">
                <div target="_blank" rel="noopener noreferrer" @click="onCellClick(data)">处理意见</div>
              </a-menu-item>
              <a-menu-item key="1" disabled>
                <div target="_blank" rel="noopener noreferrer">导出数据</div>
              </a-menu-item>
              <a-menu-item key="2">
                <div target="_blank" @click="is_cfjl=!is_cfjl" rel="noopener noreferrer">处罚记录</div>
              </a-menu-item>
              <a-menu-item key="3">
                <div target="_blank" @click="is_ssjl=!is_ssjl" rel="noopener noreferrer">申诉记录</div>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>
    <span style="text-align: center;">
      <a-pagination
        @change="onPaging"
        :current="current"
        :total="PageSize"
        @showSizeChange="onShowSizeChange"
        showSizeChanger
      />
    </span>
    <a-modal
      :title="device_details.Construction_name"
      width="90%"
      :zIndex="100000"
      :bodyStyle="{ height: '500px', overflowX: 'auto'}"
      class="tck-sbxx"
      v-model="is_device_details"
      v-if="is_device_details"
      :footer="null"
      @change
    >
      <div>
        周期：{{device_details.ExceedingPeriod}}
        <span class="f-right">
          <a-icon class="t-tb" title="导出周数据" style="font-size:24px" type="cloud-download" />
        </span>
      </div>
      <div class="t-left t-right">
        <b>TSP:</b>
        <span>
          平均值：
          <b class="red">{{device_details.ConstructionAVG}}</b>(mg/m3)
        </span>
        <span>
          最高值：
          <b class="red">{{device_details.ConstructionExceeding}}</b>(mg/m3)
        </span>
        <!-- <b>噪声:</b>
        <span>
          平均值：
          <b class="red">{{device_details.ConstructionAVG}}</b>(dB)
        </span>
        <span>
          最高值：
          <b class="red">{{device_details.ConstructionAVG}}</b>(dB)
        </span>-->
      </div>

      <a-tabs defaultActiveKey="1" @change="ChangeDateSwitch">
        <a-tab-pane
          v-for="(val,i) in device_details.equipmentDayList"
          :tab="val.Record_Time.split('T')[0]"
          :key="val.Record_Time.split('T')[0]"
        >
          <a-spin :spinning="spinning">
            <div style="position: relative; top: -20px;">
              <!-- 时间：{{val.Record_Time}} -->
              <span class="f-right">
                <a-icon
                  @click="isform=false"
                  class="margin-r-10 t-tb"
                  :style="isform?'':'color: red'"
                  title="视图"
                  type="area-chart"
                />
                <a-icon
                  @click="isform=true"
                  class="margin-r-10 t-tb"
                  :style="isform?'color: red':''"
                  title="表格"
                  type="table"
                />
                <a-icon class="t-tb" title="导出数据" type="download" />
              </span>
            </div>

            <!-- <br /> -->
            <div class="m-t-10 m-b-10" style="height: 300px;">
              <x-chart
                v-if="!isform"
                :id="'highcharts_sbxx1'+val.Record_Time"
                class="high"
                :option="option"
                ref="option"
              ></x-chart>
              <a-table
                v-if="isform"
                size="small"
                :columns="columns2"
                :dataSource="data2"
                :defaultPageSize="6"
                :scroll="{ x: 1400, y: 220 }"
              >
                <div slot="TSP" slot-scope="TSP,data">
                  <span :style="data.IsExceedingTSP==1?'color:red':''">{{TSP}}</span>
                </div>
              </a-table>
              <!-- <div class="f-right m-t-10">
              <a-pagination :defaultPageSize="6" v-model="current2" :total="PageSize2" />
              </div>-->
            </div>
            <div style="font-size: 12px;" class="t-left t-right">
              <b>TSP:</b>
              <span>
                平均值：
                <b class="red">{{val.TSPAVG}}</b>(mg/m3)
              </span>
              <span>
                最高值：
                <b class="red">{{val.TSPMAX}}</b>(mg/m3)
              </span>
              <b>噪声:</b>
              <span>
                平均值：
                <b class="red">{{val.noiseAVG}}</b>(dB)
              </span>
              <span>
                最高值：
                <b class="red">{{val.noiseMAX}}</b>(dB)
              </span>
            </div>
          </a-spin>
        </a-tab-pane>
        <!-- <a-tab-pane tab="周二" key="2">2</a-tab-pane>
        <a-tab-pane tab="周三" key="3">1</a-tab-pane>
        <a-tab-pane tab="周四" key="4">2</a-tab-pane>
        <a-tab-pane tab="周五" key="5">1</a-tab-pane>
        <a-tab-pane tab="周六" key="6">2</a-tab-pane>
        <a-tab-pane tab="周日" key="7">1</a-tab-pane>-->
      </a-tabs>
    </a-modal>

    <a-modal
      title="处罚记录"
      width="600px"
      mode="alternate"
      :zIndex="100000"
      :bodyStyle="{ height: '500px', overflowX: 'auto'}"
      class="tck-cfjl"
      v-model="is_cfjl"
      :footer="null"
      @change
    >
      <a-timeline mode="alternate">
        <a-timeline-item>
          <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />处罚记录4
          <br />处罚记录4说明
          <br />2019-09-20 20:34:15
        </a-timeline-item>
        <a-timeline-item color="green">
          处罚记录3
          <br />处罚记录3说明
          <br />2019-09-20 20:34:15
        </a-timeline-item>
        <a-timeline-item color="green">
          处罚记录2
          <br />处罚记录2说明
          <br />2019-09-20 20:34:15
        </a-timeline-item>
        <a-timeline-item color="green">
          处罚记录1
          <br />处罚记录1说明
          <br />2019-09-20 20:34:15
        </a-timeline-item>
        <a-timeline-item color="green">
          处罚记录3
          <br />处罚记录3说明
          <br />2019-09-20 20:34:15
        </a-timeline-item>
        <a-timeline-item color="green">
          处罚记录2
          <br />处罚记录2说明
          <br />2019-09-20 20:34:15
        </a-timeline-item>
        <a-timeline-item color="green">
          处罚记录1
          <br />处罚记录1说明
          <br />2019-09-20 20:34:15
        </a-timeline-item>
        <a-timeline-item color="green">
          处罚记录3
          <br />处罚记录3说明
          <br />2019-09-20 20:34:15
        </a-timeline-item>
        <a-timeline-item color="green">
          处罚记录2
          <br />处罚记录2说明
          <br />2019-09-20 20:34:15
        </a-timeline-item>
        <a-timeline-item color="green">
          处罚记录1
          <br />处罚记录1说明
          <br />2019-09-20 20:34:15
        </a-timeline-item>
      </a-timeline>
    </a-modal>
    <a-modal
      title="申诉记录"
      width="600px"
      :zIndex="100000"
      :bodyStyle="{ height: '500px', overflowX: 'auto'}"
      class="tck-ssjl"
      v-model="is_ssjl"
      :footer="null"
      @change
    >
      <a-timeline mode="alternate">
        <a-timeline-item>申诉记录1</a-timeline-item>
        <a-timeline-item>申诉记录2</a-timeline-item>
        <a-timeline-item>申诉记录3</a-timeline-item>
        <a-timeline-item>申诉记录4</a-timeline-item>
      </a-timeline>
    </a-modal>

    <a-modal title="处罚对象：前滩40-01地块项目" centered v-model="visible1" @ok="noticeOk" :bodyStyle="{}">
      <a-textarea placeholder="消息内容" :rows="6" />
      <br />
      <br />
      <a-checkbox @change="onChangeDx">短信通知: 15021345644</a-checkbox>
      <br />
      <a-checkbox @change="onChangeDx">微信推送</a-checkbox>
      <div class="xxmb_cf">
        <a-select defaultValue="xxmb1" style="width: 120px" @change="handleChange">
          <a-select-option value="xxmb1">消息模板1</a-select-option>
          <a-select-option value="xxmb2">消息模板2</a-select-option>
          <a-select-option value="xxmb3">消息模板3</a-select-option>
        </a-select>
        <a-button @click="showConfirm" style="margin-left: 8px">新增</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import XChart from "@/components/pages/charts/charts";
import HighCharts, { map } from "highcharts";
import util from "../../http.utils.js";
const columns = [
  {
    dataIndex: "Construction_name",
    title: "名称",
    key: "Construction_name",
    scopedSlots: { customRender: "Construction_name" }
  },
  // {
  //   title: "市级",
  //   dataIndex: "City_Id",
  //   key: "City_Id",
  // },
  {
    title: "区域",
    dataIndex: "County_Id",
    key: "County_Id",
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
    title: "超标设备",
    dataIndex: "equipmentList",
    key: "equipmentList",
    scopedSlots: { customRender: "equipmentList" }
  },
  {
    title: "超标时间",
    dataIndex: "ExceedingPeriod",
    key: "ExceedingPeriod",
    scopedSlots: { customRender: "ExceedingPeriod" }
  },
  // {
  //   title: "平均值",
  //   dataIndex: "ConstructionAVG",
  //   key: "ConstructionAVG"
  // },
  {
    title: "超标均值",
    dataIndex: "ConstructionAVG",
    key: "ConstructionAVG"
  },
  {
    title: "操作",
    dataIndex: "cz",
    key: "cz",
    scopedSlots: { customRender: "cz" }
  }
];
const data = [
  // {
  // key: "1",
  // City_Id: "温州市",
  // ConstructionAVG: "1.200",
  // ConstructionExceeding: "1.300",
  // ConstructionSN: null,
  // Construction_Id: 20,
  // Construction_address: "浙江省温州市瓯海区娄桥街道古岸路中梁.公园天下",
  // Construction_latitude: "27.968499",
  // Construction_longitude: "120.62204",
  // Construction_name: "测试站点",
  // Construction_type: "",
  // County_Id: "瓯海区",
  // ExceedingPeriod: "2019-10-01/2019-10-07",
  // Porvice_Id: "浙江省"
  // }
];
const columns2 = [
  {
    title: "设备编号",
    dataIndex: "MN",
    key: "99",
    width: 250
  },
  {
    title: "TSP",
    dataIndex: "TSP",
    sorter: (a, b) => a.TSP - b.TSP,
    scopedSlots: { customRender: "TSP" },
    key: "1",
    width: 100
  },
  {
    title: "PM10",
    dataIndex: "PM10",
    sorter: (a, b) => a.PM10 - b.PM10,
    key: "2",
    width: 100
  },
  {
    title: "PM2.5",
    dataIndex: "PM2_5",
    sorter: (a, b) => a.PM2_5 - b.PM2_5,
    key: "3",
    width: 100
  },
  {
    title: "噪音",
    dataIndex: "noise",
    sorter: (a, b) => a.noise - b.noise,
    key: "4",
    width: 100
  },
  {
    title: "风向",
    dataIndex: "wind_direction",
    sorter: (a, b) => a.wind_direction - b.wind_direction,
    key: "5",
    width: 100
  },
  {
    title: "风速",
    dataIndex: "wind_speed",
    sorter: (a, b) => a.wind_speed - b.wind_speed,
    key: "6",
    width: 100
  },
  {
    title: "温度",
    dataIndex: "temperature",
    sorter: (a, b) => a.temperature - b.temperature,
    key: "7",
    width: 100
  },
  {
    title: "湿度",
    dataIndex: "humidity",
    sorter: (a, b) => a.humidity - b.humidity,
    key: "8",
    width: 100
  },
  {
    title: "气压",
    dataIndex: "air_pressure",
    sorter: (a, b) => a.air_pressure - b.air_pressure,
    key: "9",
    width: 100
  },
  {
    title: "时间",
    dataIndex: "DateTime",
    sorter: (a, b) => parseFloat(a.Time) - parseFloat(b.Time),
    key: "10",
    width: 200
  }
];
const data2 = [
  // {
  //   key: "1",
  //   MN: "1440-0028-sclw-5875",
  //   TSP: "121.123",
  //   PM10: 121.123,
  //   PM2_5: "121.123",
  //   noise: "63",
  //   wind_direction: "西北风",
  //   wind_speed: "1.31",
  //   temperature: "24℃",
  //   humidity: "88°",
  //   air_pressure: "102",
  //   Time: "2019-10-06 18:10:02"
  // }
];

// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(
//       `selectedRowKeys: ${selectedRowKeys}`,
//       "selectedRows: ",
//       selectedRows
//     );
//   },
//   onSelect: (record, selected, selectedRows) => {
//     console.log(record, selected, selectedRows);
//   },
//   onSelectAll: (selected, selectedRows, changeRows) => {
//     console.log(selected, selectedRows, changeRows);
//   }
// };

export default {
  name: "cbgl", //超标管理
  components: {
    XChart
  },
  data() {
    return {
      typeName: "超标管理",
      screeningName: "", //城市
      constructionType_name: "", //工地类型
      construction_name: "", //名称
      construction_SN: "", //报建编号
      punishment_StartTime: "", //开始时间
      punishment_EndTime: "", //结束时间
      visible: false,
      data, //表格数据
      columns, //表格字段
      current: 1, //分页第几页
      PageSize: 0, //分页总条数
      size: 10, //分页总显示条数
      data2,
      columns2,
      current2: 1,
      PageSize2: 0,
      expandedRowKeys: [],
      record: "超标记录",
      CityList: [], //城市列表
      ConstructionTypeList: [], //工地类型
      is_device_details: false, //设备详情窗口 开关
      device_details: {}, //设备详情窗口数据
      is_cfjl: false, //处罚记录窗口 开关
      is_ssjl: false, //申诉记录窗口 开关
      option: {}, //视图对象
      visible1: false,
      spinning: false, //加载中。。。
      isform: false
    };
  },

  //加载后执行
  mounted() {
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
            width: 80,
            height: 40,
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
            startOnTick: false,
            endOnTick: false,
            lineWidth: 0,
            tickPositions: []
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
    var start = +new Date(),
      $tds = $("td[data-sparkline]"),
      fullLen = $tds.length,
      n = 0;
    // Creating 153 sparkline charts is quite fast in modern browsers, but IE8 and mobile
    // can take some seconds, so we split the input into chunks and apply them in timeouts
    // in order avoid locking up the browser process and allow interaction.
    function doChunk() {
      var time = +new Date(),
        i,
        len = $tds.length,
        $td,
        stringdata,
        arr,
        data,
        color,
        zt,
        chart;
      for (i = 0; i < len; i += 1) {
        $td = $($tds[i]);
        stringdata = $td.data("sparkline");
        zt = $td.data("zt");
        arr = stringdata.split("; ");
        data = $.map(arr[0].split(", "), parseFloat);
        chart = {};
        if (arr[1]) {
          chart.type = arr[1];
        }
        // :style="val.state==='1'?'color:#0bbe79':val.state==='2'?'color:#e98337':val.state==='3'?'color:red':val.state==='4'?'color:#d2d2d2':''"
        switch (zt) {
          case 1:
            color = [[0, "#0bbe79"], [1, "#0bbe79"]];
            break;
          case 2:
            color = [[0, "#e98337"], [1, "#e98337"]];
            break;
          case 3:
            color = [[0, "red"], [1, "red"]];
            break;
          case 4:
            color = [[0, "#d2d2d2"], [1, "#d2d2d2"]];
            break;
        }

        SparkLine($td[0], {
          series: [
            {
              lineWidth: 2,
              lineColor: {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
                },
                stops: color
              },
              marker: {
                radius: 0
              },
              shadow: {
                color: "#000",
                offsetY: 2,
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
    }
    // doChunk();
  },

  methods: {
    onPaging(current) {
      this.current = current;
    },
    onShowSizeChange(current, size) {
      (this.current = current), //分页第几页
        (this.size = size);
      this.GetExceeding();
    },
    handleChange_1(val, clearFilters) {
      clearFilters();
      this.searchText = val;
      this.County_Id = val;
      this.GetExceeding();
      // this.getExceedingEquipments(
      //   val,
      //   this.current,
      //   this.ExceedingEquipmentPagesize
      // );
    },
    handleChange(value) {
      // console.log(`selected ${value}`);
      this.screeningName = value;
      // this.GetExceeding();
    },
    handleChange2(value) {
      // console.log(`selected ${value}`);
      this.constructionType_name = value;
      // this.GetExceeding();
    },
    onChangeDate(date, dateString) {
      this.punishment_StartTime = dateString[0];
      this.punishment_EndTime = dateString[1];
      // console.log(date, dateString);
    },
    onCellClick(date) {
      this.visible1 = true;
      console.log(date);
    },
    // filterOption(input, option) {
    //   return (
    //     option.componentOptions.children[0].text
    //       .toLowerCase()
    //       .indexOf(input.toLowerCase()) >= 0
    //   );
    // },
    showConfirm() {
      this.$confirm({
        title: "确定添加内容至新的消息模板?",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "test"
      });
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    noticeOk(_d) {},
    onChangeDx(e) {
      console.log(`checked ----= ${e.target.checked}`);
    },
    isKeys: function(key) {
      this.$router.push({
        path: key
      });
    },
    //设备详情信息
    onDeviceDetails(equipment_Id, data, _d) {
      this.is_device_details = true;
      this.device_details = data;
      this.device_details.equipmentDayList = _d.equipmentDayList;
      this.device_details.equipment_Id = equipment_Id;
      this.spinning = true;
      // this.option = {};
      if (_d.equipmentDayList[0]) {
        var Record_Time = _d.equipmentDayList[0].Record_Time.split("T")[0];
        this.GetDayEquipmentData(equipment_Id, Record_Time);
      }
    },

    ChangeDateSwitch(key) {
      this.spinning = true;
      this.option = {};
      setTimeout(() => {
        this.GetDayEquipmentData(this.device_details.equipment_Id, key);
      }, 500);
    },

    //按时间条件查询设备数据
    GetDayEquipmentData(equipment_Id = 11, data_time = "2019-10-05") {
      var _this = this;
      new util._httpData(this, "Construction/GetDayEquipmentData", {
        equipment_Id: equipment_Id,
        data_time: data_time
      }).then = function() {
        if (this.state) {
          // _this.firstConstruction_data = this.data;
          var PM2_5 = []; //PM2.5
          var PM10 = []; //PM10
          var TSP = []; //TSP
          var noise = []; //噪音

          this.datas.map((_d, i) => {
            var datatime = new Date(
              _d.Time.replace(
                /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
                "$1-$2-$3 $4:$5:$6"
              )
            ).getTime();
            _d.key = i + 1; // 添加ket值 vue需要
            _d.DateTime = new Date(datatime).Format("yyyy-MM-dd hh:mm:ss");
            if (i % 5 === 0) {
              PM2_5.push([datatime, parseFloat(_d.PM2_5)]);
              PM10.push([datatime, parseFloat(_d.PM10)]);
              TSP.push([datatime, parseFloat(_d.TSP)]);
              noise.push([datatime, parseFloat(_d.noise)]);
            }
          });
          // MN: "1440-0028-sclw-5875"
          // PM2_5: "61.0"
          // PM10: "105.0"
          // TSP: "259.3"
          // Time: "20191005032100"
          // noise: "53.2"
          _this.option = new _this.MyOption();
          _this.option.series.map(_d => {
            if (_d.name === "TSP") {
              _d.data = TSP;
            } else if (_d.name === "PM10") {
              _d.data = PM10;
            } else if (_d.name === "PM2.5") {
              _d.data = PM2_5;
            } else if (_d.name === "噪声") {
              _d.data = noise;
            }
          });
          _this.data2 = this.datas;
          _this.spinning = false;

          // data2,
          // columns2,
          // current2: 1,
          // PageSize2: 150,
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    //获取历史超标数据
    GetExceeding() {
      var _this = this;
      new util._httpData(this, "Construction/GetExceeding", {
        city_Id: this.screeningName,
        county_Id: this.County_Id,
        construction_name: this.construction_name,
        construction_SN: this.construction_SN,
        constructionType_name: this.constructionType_name,
        punishment_StartTime: this.punishment_StartTime,
        punishment_EndTime: this.punishment_EndTime,
        pageno: this.current,
        pagesize: this.size
      }).then = function() {
        if (this.state) {
          _this.PageSize = this.data.TotalCount;

          var deleteDataList = function(list) {
            for (var key in list) {
              if (list[key].equipmentList.length === 0) {
                list.splice(key, 1);
                deleteDataList(list);
                break;
              } else {
                for (var i in list[key].equipmentList) {
                  if (
                    list[key].equipmentList[i].equipmentDayList.length === 0
                  ) {
                    list.splice(key, 1);
                    deleteDataList(list);
                    break;
                  }
                }
              }
            }
          };
          deleteDataList(this.data.Data);

          var data = [];
          this.data.Data.map((_d, i) => {
            _d.key = i + 1;
          });
          _this.data = this.data.Data;
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
    //获取工地类型
    GetConstructionTypeList() {
      var _this = this;
      new util._httpData(
        this,
        "Construction/GetConstructionTypeList",
        {}
      ).then = function() {
        if (this.state) {
          _this.ConstructionTypeList = this.datas;
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
              // text: "颗粒物(mg/m3)",
              rotation: 0,
              align: "high",
              x: 30,
              margin: -90
            }
          },
          {
            title: {
              // text: "噪声(dB)",
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
          backgroundColor: "#ffffff99",
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.3f}</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true
        }),
        (this.series = [
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
            // lineColor: "red",
            lineColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0, "#ff0000"], [1, "#f600ff"]]
            },
            lineWidth: 2,
            // states: {
            //   hover: {
            //     lineWidth: 2
            //   }
            // },
            name: "TSP",
            data: []
          },
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
              stops: [[0, "#2f93fa"], [1, "#7ecef1"]]
            },
            name: "PM10",
            data: []
          },
          {
            color: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0, "rgb(221 242 243)"], [1, "#ffffff99"]]
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
              stops: [[0, "rgb(112, 192, 219)"], [1, "rgb(125, 210, 192)"]]
            },
            name: "PM2.5",
            data: []
          },
          {
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
            type: "line",
            yAxis: 1,
            name: "噪声",
            data: []
          }
        ]);
    }
  },
  //加载前执行
  created() {
    // this.option = new this.MyOption();
    var data = [
      [new Date().getTime() - 50000000, 23],
      [new Date().getTime() - 40000000, 23],
      [new Date().getTime() - 30000000, 24],
      [new Date().getTime() - 20000000, 23],
      [new Date().getTime() - 10000000, 23],
      [new Date().getTime(), 23]
    ];

    // this.option.series[0].data = data;
    // this.option.series[1].data = data;
    // this.option.series[2].data = data;
    // this.option.series[3].data = data;

    // this.GetDayEquipmentData();
    this.GetExceeding();
    this.GetCityList();
    this.GetConstructionTypeList();
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>



