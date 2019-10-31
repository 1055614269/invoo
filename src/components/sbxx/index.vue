<template>
  <div id="sbxx">
    <div class="t">
      <span @click="deviceInformation" :class="change==1?'record':''">全部数据</span>
      <span @click="historicalData" :class="change==2?'record':''">数据显示</span>
      <div v-if="change===1" class="fb" @click="visible2=true">
        添加设备
      </div>
    </div>

    <div class="body">
      <div v-if="change===1">
        <div class="tj">
          <span>
            设备编号：
            <a-input v-model="equipment_UId" style="width: 150px;" placeholder="设备编号" />
          </span>
          <!-- <span>
            市级：
            <a-select
              defaultValue
              placeholder="市级"
              optionFilterProp="children"
              style="width: 150px"
              @change="handleChange1"
            >
          <a-select-option autofocus :value="''">全部</a-select-option>-->
          <!-- <a-select-option
                :key="key"
                v-for="(val,key) in ConstructionTypeList"
                :value="val.Construction_type"
          >{{val.Construction_type}}</a-select-option>-->
          <!-- </a-select>
          </span>-->
          <!-- <span>
            县级：
            <a-select
              defaultValue
              placeholder="县级"
              optionFilterProp="children"
              style="width: 150px"
              @change="handleChange2"
            >
          <a-select-option autofocus :value="''">全部</a-select-option>-->
          <!-- <a-select-option
                :key="key"
                v-for="(val,key) in ConstructionTypeList"
                :value="val.Construction_type"
          >{{val.Construction_type}}</a-select-option>-->
          <!-- </a-select>
          </span>-->
          <span>
            是否在线：
            <a-select
              :defaultValue="IsOnLine"
              placeholder="是否在线"
              optionFilterProp="children"
              style="width: 150px"
              @change="handleChange3"
            >
              <a-select-option autofocus :value="'-1'">全部</a-select-option>
              <a-select-option :value="1">在线</a-select-option>
              <a-select-option :value="0">离线</a-select-option>
            </a-select>
          </span>
          <span>
            设备状态：
            <a-select
              :defaultValue="RecordType_type"
              placeholder="设备状态"
              optionFilterProp="children"
              style="width: 150px"
              @change="handleChange4"
            >
              <a-select-option autofocus :value="'-1'">全部</a-select-option>
              <a-select-option :value="'1'">正常</a-select-option>
              <a-select-option :value="'2'">故障</a-select-option>
              <a-select-option :value="'3'">超标</a-select-option>
              <!-- <a-select-option :value="'4'">离线</a-select-option> -->
              <a-select-option :value="'5'">维修</a-select-option>
              <a-select-option :value="'6'">迁移</a-select-option>
              <a-select-option :value="'7'">报废</a-select-option>
              <!-- 1:正常,2:故障,3:超标,4:离线,5:维修,6:迁移,7:报废 -->
            </a-select>
          </span>
          <!-- <span>
            设备名称：
              IsOnLine:"-1",
      RecordType_type:"-1",
            <a-input v-model="equipmentName" style="width: 150px;" placeholder="设备名称" />
          </span>-->

          <a-button type="primary" @click="PageEquipment" style="margin-left: 8px">查询</a-button>
          <div style="float: right;cursor: pointer;">
            <a-button style="margin-left: 8px">导出数据</a-button>
          </div>
        </div>
        <a-table
          :columns="columns2"
          :dataSource="data2"
          :defaultPageSize="6"
          :scroll="{ x: 1400 }"
          :pagination="false"
        >
          <div
            slot="filterDropdown"
            slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
            class="custom-filter-dropdown"
          >
            <a-select
              defaultValue
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

          <div slot="IsOnLine" slot-scope="IsOnLine,data">{{IsOnLine==1?'在线':'离线'}}</div>
        </a-table>
        <br />
        <a-pagination
          showSizeChanger
          @showSizeChange="onShowSizeChange2"
          @change="onchange2"
          :total="total2"
          v-model="current2"
        />
      </div>
      <div v-if="change===2">
        <div class="tj">
          <!-- <a-input v-model="construction_SN" style="width: 150px;" placeholder="设备" /> -->
          <span>
             <span>
            工地名称:
               <a-input style="width: 150px;" placeholder="工地名称" />
             </span>
            <span>
              MN码:
               <a-input style="width: 150px;" placeholder="MN码" />
             </span>
              <span>
          区域：
          <a-select
            defaultValue="全部"
            placeholder="区域"
            optionFilterProp="children"
            style="width: 150px"
            @change="(val)=>handleChange(val,clearFilters)"
          >
            <a-select-option :value="全部">全部</a-select-option>
            <a-select-option
              :key="key"
              v-for="(val,key) in CityList"
              :value="val.County_Id"
            >{{val.County_Id}}</a-select-option>
          </a-select>
              </span>
               <span>
          状态：
          <a-select
            defaultValue="全部"
            placeholder="状态"
            optionFilterProp="children"
            style="width: 150px"
            @change="(val)=>handleChangeState(val,clearFilters)"
          >
            <a-select-option :value="全部">全部</a-select-option>
            <a-select-option
              :key="key"
              v-for="(val,key) in stateList"
              :value="val"
            >{{val}}</a-select-option>
          </a-select>
              </span>
          <a-button type="primary" @click="" style="margin-left: 8px">查询</a-button>
          </span>

          <a-button type="primary" @click="GetEquipmentHistoryData" style="margin-left: 8px">查询</a-button>
          <div style="float: right;cursor: pointer;">
            <a-button style="margin-left: 8px">导出数据</a-button>
          </div>
        </div>
        <div class="tj zt-sx">
          <div
            @click="setDataType(key)"
            v-for="(val,key) in data_type"
            :class="val.type?'to':''"
          >{{key}}</div>
          <!-- <div>PM10</div>
          <div>PM2.5</div>
          <div>噪音</div>
          <div>风向</div>
          <div>风速</div>
          <div>温度</div>
          <div>湿度</div>
          <div>气压</div>-->
        </div>
        <a-table
          :columns="columns"
          :dataSource="data"
          :defaultPageSize="6"
          :scroll="{ x: columns.map((_d)=>{return _d.width}) }"
          :pagination="false"
        >
          <div slot="TSP" slot-scope="TSP,data">
            <span :style="data.IsExceedingTSP==1?'color:red':''">{{TSP}}</span>
          </div>
        </a-table>
        <br />
        <a-pagination
          showSizeChanger
          @showSizeChange="onShowSizeChange"
          :total="total"
          @change="onchange"
          v-model="current"
        />
      </div>
    </div>
    <a-drawer
      title="添加设备"
      placement="right"
      :closable="false"
      width="400px"
      @close="visible2=false"
      :visible="visible2"
    >
      <div class="tjsb-body">
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item
            :label-col="{ span: 9 }"
            :wrapper-col="{ span: 12 }"
            label="所属工地"

          >
            <a-select
              v-decorator="[
            'Construction_Id',
            {
              rules: [{ required: true, message: '不得为空!' }],initialValue: ConstructionDatas[0].Construction_Id
            },
          ]"
            >
              <a-select-option
                :key="i"
                v-for="(val,i) in ConstructionDatas"
                :value="val.Construction_Id"
              >{{val.Construction_name}}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="设备唯一标识码" :label-col="{ span: 9 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[
          'equipment_UId',
          {rules: [{ required: true, message: '不得为空!' }],initialValue: equipment.equipment_UId}
            ]"
              placeholder="设备唯一标识码"
            />
          </a-form-item>

          <a-form-item label="设备名称" :label-col="{ span: 9 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[ 'equipment_name', { rules: [{ required: true, message: '不得为空!'}],initialValue: equipment.equipment_name }]"
              placeholder="设备名称"
            ></a-input>
          </a-form-item>
          <a-form-item label="设备型号" :label-col="{ span: 9 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[ 'equipment_tpnum', { rules: [{ required: true, message: '不得为空!'}],initialValue: equipment.equipment_tpnum }]"
              placeholder="设备型号"
            ></a-input>
          </a-form-item>
          <a-form-item label="设备杆编号" :label-col="{ span: 9 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[ 'equipment_bnum', { rules: [{ required: true, message: '不得为空!'}],initialValue: equipment.equipment_bnum }]"
              placeholder="设备杆编号"
            ></a-input>
          </a-form-item>
          <a-form-item label="MN码" :label-col="{ span: 9 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[ 'equipment_MNnum', { rules: [{ required: true, message: '不得为空!'}],initialValue: equipment.equipment_MNnum }]"
              placeholder="MN码"
            ></a-input>
          </a-form-item>

          <a-form-item label="所属运维商" :label-col="{ span: 9 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[ 'Operator_Id', { rules: [{ required: true, message: '不得为空!'}],initialValue: equipment.Operator_Id }]"
              placeholder="所属运维商"
            ></a-input>
          </a-form-item>
          <a-form-item label="所属供应商" :label-col="{ span: 9 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[ 'Provider_Id', { rules: [{ required: true, message: '不得为空!'}],initialValue: equipment.Provider_Id }]"
              placeholder="所属供应商"
            ></a-input>
          </a-form-item>

          <a-form-item label="所属地质" :label-col="{ span: 9 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[ 'equipment_address', { rules: [{ required: true, message: '不得为空!'}],initialValue: equipment.equipment_address }]"
              placeholder="所属地质"
            ></a-input>
          </a-form-item>
          <a-form-item label="设备经度" :label-col="{ span: 9 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[ 'equipment_Longitude', { rules: [{ required: true, message: '不得为空!'}],initialValue: equipment.equipment_Longitude }]"
              placeholder="设备经度"
            ></a-input>
          </a-form-item>
          <a-form-item label="设备纬度" :label-col="{ span: 9 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[ 'equipment_Latitude', { rules: [{ required: true, message: '不得为空!'}],initialValue: equipment.equipment_Latitude }]"
              placeholder="设备纬度"
            ></a-input>
          </a-form-item>
          <a-form-item label="设备类型" :label-col="{ span: 9 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[ 'equipment_type', { rules: [{ required: true, message: '不得为空!'}],initialValue: equipment.equipment_type }]"
              placeholder="设备类型"
            ></a-input>
          </a-form-item>
          <div class="bot">
            <a-form-item>
              <a-button style="margin-right: 10px;" @click="visible2=false">取消</a-button>
              <a-button type="primary" html-type="submit">添加</a-button>
            </a-form-item>
          </div>
        </a-form>
      </div>
    </a-drawer>
  </div>
</template>

<script>
var data_type = {
  TSP: { name: "TSP", type: true },
  PM10: { name: "PM10", type: false },
  "PM2.5": { name: "PM2_5", type: false },
  噪音: { name: "noise", type: true },
  风向: { name: "wind_direction", type: true },
  风速: { name: "wind_speed", type: true },
  温度: { name: "temperature", type: true },
  湿度: { name: "humidity", type: true },
  气压: { name: "air_pressure", type: true }
};

const columns = [
  {
    title: "设备编号",
    dataIndex: "MN",
    key: "MN",
    width: 250
  },
  {
    title: "区域",
    dataIndex: "区域",
    key: "区域",
    width: 150
  },
  {
    title: "所属工地",
    dataIndex: "所属工地",
    key: "所属工地",
    width: 250
  }
  // {
  //   title: "TSP",
  //   dataIndex: "TSP",
  //   // sorter: (a, b) => a.TSP - b.TSP,
  //   scopedSlots: { customRender: "TSP" },
  //   key: "1",
  //   width: 100
  // },
  // {
  //   title: "PM10",
  //   dataIndex: "PM10",
  //   // sorter: (a, b) => a.PM10 - b.PM10,
  //   key: "2",
  //   width: 100
  // },
  // {
  //   title: "PM2.5",
  //   dataIndex: "PM2_5",
  //   // sorter: (a, b) => a.PM2_5 - b.PM2_5,
  //   key: "3",
  //   width: 100
  // },
  // {
  //   title: "噪音",
  //   dataIndex: "noise",
  //   // sorter: (a, b) => a.noise - b.noise,
  //   key: "4",
  //   width: 100
  // },
  // {
  //   title: "风向",
  //   dataIndex: "wind_direction",
  //   // sorter: (a, b) => a.wind_direction - b.wind_direction,
  //   key: "5",
  //   width: 100
  // },
  // {
  //   title: "风速",
  //   dataIndex: "wind_speed",
  //   // sorter: (a, b) => a.wind_speed - b.wind_speed,
  //   key: "6",
  //   width: 100
  // },
  // {
  //   title: "温度",
  //   dataIndex: "temperature",
  //   // sorter: (a, b) => a.temperature - b.temperature,
  //   key: "7",
  //   width: 100
  // },
  // {
  //   title: "湿度",
  //   dataIndex: "humidity",
  //   // sorter: (a, b) => a.humidity - b.humidity,
  //   key: "8",
  //   width: 100
  // },
  // {
  //   title: "气压",
  //   dataIndex: "air_pressure",
  //   // sorter: (a, b) => a.air_pressure - b.air_pressure,
  //   key: "9",
  //   width: 100
  // }
];
for (var key in data_type) {
  if (data_type[key].type) {
    columns.push({
      title: key,
      dataIndex: data_type[key].name,
      // sorter: (a, b) => a.TSP - b.TSP,
      scopedSlots: { customRender: data_type[key].name },
      key: key + 1 + "",
      width: 100
    });
  }
}
columns.push({
  title: "时间",
  dataIndex: "Time",
  // sorter: (a, b) => parseFloat(a.Time) - parseFloat(b.Time),
  key: "10",
  width: 200
});

const data = [
  //   {
  //     key: "1",
  //     MN: "1440-0028-sclw-5875",
  //     TSP: "121.123",
  //     PM10: 121.123,
  //     PM2_5: "121.123",
  //     noise: "63",
  //     wind_direction: "西北风",
  //     wind_speed: "1.31",
  //     temperature: "24℃",
  //     humidity: "88°",
  //     air_pressure: "102",
  //     Time: "2019-10-06 18:10:02"
  //   }
];

const columns2 = [
  {
    title: "设备编号",
    dataIndex: "equipment_UId",
    // sorter: (a, b) => a.air_pressure - b.air_pressure,
    key: "99",
    width: 160
  },
  {
    title: "设备名称",
    dataIndex: "equipment_name",
    // sorter: (a, b) => a.TSP - b.TSP,
    key: "1",
    width: 160
  },
  {
    title: "数量",
    dataIndex: "",
    // sorter: (a, b) => a.TSP - b.TSP,
    key: "",
    width: 160
  },
  {
    title: "所属工地",
    dataIndex: "Construction_Id",
    // sorter: (a, b) => a.TSP - b.TSP,
    key: "6",
    width: 160
  },
  // {
  //   title: "市级",
  //   dataIndex: "City_Id",
  //   // sorter: (a, b) => a.PM10 - b.PM10,
  //   key: "_1",
  //   width: 160
  // },
  // {
  //   title: "区域",
  //   dataIndex: "County_Id",
  //   // sorter: (a, b) => a.PM10 - b.PM10,
  //   key: "_2",
  //   width: 70,
  //   scopedSlots: {
  //     filterDropdown: "filterDropdown",
  //     filterIcon: "filterIcon",
  //     customRender: "customRender"
  //   },
  //   onFilter: (value, record) =>
  //     record.name.toLowerCase().includes(value.toLowerCase()),
  //   onFilterDropdownVisibleChange: visible => {
  //     if (visible) {
  //     }
  //   }
  // },
  {
    title: "状态",
    dataIndex: "equipment_bnum",
    // sorter: (a, b) => a.PM2_5 - b.PM2_5,
    key: "3",
    width: 100
  },
  {
    title: "协议类型",
    dataIndex: "equipment_MNnum",
    // sorter: (a, b) => a.noise - b.noise,
    key: "4",
    width: 100
  },
  //   {
  //     title: "所属运维商",
  //     dataIndex: "Operator_Id",
  //     // sorter: (a, b) => a.wind_direction - b.wind_direction,
  //     key: "5",
  //     width: 100
  //   },
  //   {
  //     title: "所属工地",
  //     dataIndex: "Construction_Id",
  //     // sorter: (a, b) => a.wind_speed - b.wind_speed,
  //     key: "6",
  //     width: 100
  //   },
  //   {
  //     title: "所属供应商",
  //     dataIndex: "Provider_Id",
  //     // sorter: (a, b) => a.temperature - b.temperature,
  //     key: "7",
  //     width: 100
  //   },
  // {
  //   title: "是否在线",
  //   dataIndex: "IsOnLine",
  //   scopedSlots: { customRender: "IsOnLine" },
  //   // sorter: (a, b) => a.humidity - b.humidity,
  //   key: "8",
  //   width: 100
  // },
  // {
  //   title: "设备状态",
  //   dataIndex: "record_type_name",
  //   // sorter: (a, b) => a.humidity - b.humidity,
  //   key: "9",
  //   width: 100
  // },
  // {
  //   title: "设备类型",
  //   dataIndex: "equipment_type",
  //   // sorter: (a, b) => a.humidity - b.humidity,
  //   key: "10",
  //   width: 100
  // }
];
const data2 = [
  //   {
  //     key: "1",
  //     equipment_UId: "1440-0028-sclw-5875",
  //     equipment_name: "设备名称3",
  //     equipment_tpnum: "设备型号",
  //     equipment_bnum: "设备杆编号",
  //     equipment_MNnum: "MN码",
  //     Operator_Id: "所属运维商",
  //     Construction_Id: "所属工地",
  //     Provider_Id: "所属供应商",
  //     equipment_type: "设备类型"
  //   }
];
// <div class="to">TSP</div>
//             <div>PM10</div>
//             <div>PM2.5</div>
//             <div>噪音</div>
//             <div>风向</div>
//             <div>风速</div>
//             <div>温度</div>
//             <div>湿度</div>
//             <div>气压</div>

import util from "../../http.utils.js";
export default {
  name: "sbxx",
  data() {
    return {
      typeName: "设备信息",
      CityList: [],
      stateList:['正常','在线','离线','故障'],
      form: this.$form.createForm(this),
      // CityList: [],
      equipment_UId: "", //设备编号
      //   equipmentName: "", //设备名称
      equipmentNames: [], //设备名称集合
      equipmentUId: "", //
      start_time: "", //开始时间
      end_time: "", //结束时间
      IsOnLine: "-1",
      RecordType_type: "-1",
      data_type,
      data, //表格数据
      data2,
      columns, //表格字段
      columns2,
      current: 1, //分页第几页
      current2: 1, //分页第几页
      PageSize: 10, //分页显示总条数
      PageSize2: 10, //分页显示总条数
      total: 0, //分页总条数
      total2: 0, //分页总条数
      change: 1,
      visible2: false,
      ConstructionDatas: [{ Construction_Id: 0 }], // 工地信息
      equipment: {
        equipment_Id: 0, //	表自增ID
        equipment_UId: "", //设备唯一标识码
        equipment_name: "", //设备名称
        equipment_tpnum: "", //设备型号
        // equipmentlab_name: "", //设备杆名称
        equipment_bnum: "", //设备杆编号
        equipment_MNnum: "", //MN码
        Operator_Id: 0, //所属运维商
        Construction_Id: 0, //所属工地
        // ConstructionName:"",
        Provider_Id: 0, //所属供应商
        equipment_address: "", //所属地质
        equipment_Longitude: 0, //设备经度
        equipment_Latitude: 0, //设备纬度
        equipment_type: "" //设备类型
      }
    };
  },

  //加载后执行
  mounted() {},
  methods: {
    //获取城市列表
    GetCityList() {
      var _this = this;
      new util._httpData(
        this,
        "Construction/GetCityList",
        {}
      ).then = function () {
        if (this.state) {
          // _this.CityList = this.datas;
          this.datas.map(_d => {
            _d.countyList.map(data => {
              _this.CityList.push({County_Id: data.County_Id});
            });
          });
        } else {
          _this.$message.error(this.message, 4);
        }
      };
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
    onchange(current) {
      this.current = current;
      this.GetEquipmentHistoryData();
    },
    onchange2(current) {
      this.current2 = current;
      this.PageEquipment();
    },
    onShowSizeChange(current, pageSize) {
      //   console.log(current, pageSize);
      this.PageSize = pageSize;
      this.GetEquipmentHistoryData();
    },
    onShowSizeChange2(current, pageSize) {
      this.PageSize2 = pageSize;
      this.PageEquipment();
      //   console.log(current, pageSize);
    },
    handleChange1(value) {
      // this.screeningName = value;
    },
    handleChange2(value) {
      // this.constructionType_name = value;
    },
    handleChange3(value) {
      this.IsOnLine = value;
    },
    handleChange4(value) {
      this.RecordType_type = value;
    },
    handleChange(value) {
      this.equipmentUId = value;
    },
    handleChange_1(val, clearFilters) {
      clearFilters();
      this.searchText = val;
      // this.County_Id = val;
      this.PageEquipment();
    },
    onChangeDate(value, dateString) {
      this.start_time = dateString[0];
      this.end_time = dateString[1];
      //   console.log("Selected Time: ", value);
      //   console.log("Formatted Selected Time: ", dateString);
    },
    handleSubmit(e) {
      var _this = this;
      e.preventDefault();
      this.form.validateFields((err, values) => {
        debugger;
        if (!err) {
          util._httpPost(_this, "Equipment/AddEquiption", {
            ...values,
            Construction_Id: values.Construction_Id
          }).then = function() {
            if (this.state) {
              _this.visible2 = false;
              _this.PageEquipment();
              _this.$message.success(this.message, 4);
            } else {
              _this.$message.error(this.message, 4);
            }
          };

          console.log("Received values of form: ", values);
        }
      });
    },
    PageConstructionAsync() {
      var _this = this;
      new util._httpData(this, "Construction/PageConstruction", {
        pageno: 1,
        pagesize: 1000,
        // user_Id: this.User_Id,
        construction_Name: ""
      }).then = function() {
        if (this.state) {
          var datas = this.data.Data;
          if (datas) {
            datas.map((_d, i) => {
              _d.key = i + "_";
            });
          }
          _this.ConstructionDatas = datas;
          // _this.data1 = datas;
          // _this.TotalCount = this.data.TotalCount;
        }
      };
    },
    setDataType(_key) {
      let columns = [
        {
          title: "设备编号",
          dataIndex: "MN",
          key: "99",
          width: 250
        }
      ];
      this.data_type[_key].type = !this.data_type[_key].type;

      for (var key in this.data_type) {
        if (this.data_type[key].type) {
          columns.push({
            title: key,
            dataIndex: this.data_type[key].name,
            // sorter: (a, b) => a.TSP - b.TSP,
            scopedSlots: { customRender: this.data_type[key].name },
            key: key + 1 + "",
            width: 100
          });
        }
      }
      columns.push({
        title: "时间",
        dataIndex: "Time",
        // sorter: (a, b) => parseFloat(a.Time) - parseFloat(b.Time),
        key: "10",
        width: 200
      });
      this.columns = columns;
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
    //获取设备列表
    PageEquipment() {
      var _this = this;
      new util._httpData(this, "Construction/PageEquipment", {
        equipment_UId: this.equipment_UId,
        IsOnLine: this.IsOnLine,
        RecordType_type: this.RecordType_type,
        pageno: this.current2,
        pagesize: this.PageSize2
      }).then = function() {
        if (this.state) {
          _this.data2 = this.data.Data;
          _this.data2.map((_d, i) => {
            _d.key = i + 1;
          });
          _this.total2 = this.data.TotalCount;
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    //获取设备信息历史数据
    GetEquipmentHistoryData() {
      var _this = this;
      new util._httpData(this, "Construction/GetEquipmentHistoryData", {
        equipment_UId: this.equipmentUId,
        start_time: this.start_time,
        end_time: this.end_time,
        pageno: this.current,
        pagesize: this.PageSize
      }).then = function() {
        if (this.state) {
          _this.data = this.data.Data;
          _this.data.map((_d, i) => {
            _d.key = i + 1;
          });
          _this.total = this.data.TotalCount;
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    //获取设备名称和设备唯一号码
    GetEquipmentNameAndMNList() {
      var _this = this;
      new util._httpData(
        this,
        "Construction/GetEquipmentNameAndMNList",
        {}
      ).then = function() {
        if (this.state) {
          _this.equipmentNames = this.datas;
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    ExportEquipmentHistoryData() {},
    historicalData() {
      this.change = 2;
      this.GetEquipmentHistoryData();
    },
    deviceInformation() {
      this.change = 1;
      this.PageEquipment();
    }
  },
  //加载前执行
  created() {
    this.GetCityList();
    this.PageEquipment();
    this.GetEquipmentNameAndMNList();
    this.PageConstructionAsync();
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>



