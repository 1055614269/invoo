<template>
  <div id="gdgl">
    <div class="body">
      <div class="tj">
        <span>
          工地信息：
          <a-input style="width: 150px;" placeholder="工地信息" />
        </span>
        <!-- <span>
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item @click="deleteData" key="1">删除勾选</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              勾选操作
              <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </span>-->
        <!-- <span>
          施工时间：
          <a-range-picker @change="onChangeDate" />
        </span>-->
        <div style="float: right;cursor: pointer;">
          <a-button @click="GetConstructionType">新建工地</a-button>
        </div>
      </div>

      <a-table
        :rowSelection="rowSelection"
        class="table"
        :columns="columns1"
        :dataSource="data1"
        :pagination="false"
      >
        <div style="text-align: left;" slot="Construction_name" slot-scope="Construction_name,data">
          <!-- {{data}}   -->
          <td>
            <div class="da">{{Construction_name}}</div>
            <!-- <div>{{data.Construction_type + " |"}}</div> -->
            <div>{{data.Construction_address}}</div>
          </td>
        </div>
        <div
          slot="Construction_Start"
          slot-scope="Construction_Start"
        >{{Construction_Start.replace('T'," ")}}</div>
        <div
          slot="Construction_end"
          slot-scope="Construction_end"
        >{{Construction_end.replace('T'," ")}}</div>
        <div slot="Construction_boss" slot-scope="Construction_boss">
          <a-tooltip placement="bottomLeft">
            <template slot="title">
              <span>{{Construction_boss}}</span>
            </template>
            {{Construction_boss}}
          </a-tooltip>
        </div>
        <div slot="recordTypeList" slot-scope="recordTypeList,data" style="line-height: 32px;">
          <a-dropdown>
            <span style="font-size: 26px;cursor: default;">...</span>
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <div @click="showDrawer1(data)">设备列表</div>
                <!-- <a-button @click="showDrawer1(data)">详细</a-button> -->
              </a-menu-item>
              <!-- disabled -->
              <a-menu-item key="3">
                <div
                  class="b-img4"
                  target="_blank"
                  @click="getConstructionData(data)"
                  rel="noopener noreferrer"
                >详情</div>
              </a-menu-item>
            </a-menu>
          </a-dropdown>

          <!-- <a-button @click="showDrawer1(data)">详细</a-button>
          <div style="float: right;cursor: pointer;margin-left: 10px;">
            <a-tooltip :style="'max-width: initial'" placement="left">
              <template slot="title">
                <div v-for="(val,i) in recordTypeList">
                  [
                  <a style="color:#1790ff">{{val.equipment_Name}}</a>]
                  设备状态：
                  <span
                    :style="val.RecordType_type===1?'color:#0bbe79':val.RecordType_type===2?'color:#e98337':val.RecordType_type===3?'color:red':val.RecordType_type===4?'color:#d2d2d2':'color:000'"
                  >{{val.RecordType_type===1?'正常':val.RecordType_type===2?'故障':val.RecordType_type===3?'超标':val.RecordType_type===4?'离线':''}}</span>
                </div>
              </template>
              <a-icon :style="iconStyle(recordTypeList)" type="sound" />
            </a-tooltip>
          </div>-->
        </div>
      </a-table>
    </div>
    <span style="text-align: center;">
      <a-pagination
        @change="onPaging"
        :current="pageno"
        :total="TotalCount"
        @showSizeChange="onShowSizeChange"
        showSizeChanger
      />

    </span>

    <a-modal
      class="xjgd"
      title="新建工地"
      width="800px"
      v-model="visible"
      @ok="handleOk"
      okText="新建"
      :bodyStyle="{}"
    >
      <div class="xjgd-body">
        <div class="nr">
          <span>报建编号:</span>
          <a-input v-model="addData._name" placeholder="报建编号" />
        </div>
        <div class="nr">
          <span>站点名称:</span>
          <a-input v-model="addData.Construction_name" placeholder="站点名称" />
        </div>
        <div class="nr">
          <span>工程类型:</span>
          <a-input v-model="addData.Construction_protp" placeholder="工程类型" />
        </div>
        <div class="nr">
          <span>项目类型:</span>
          <a-auto-complete
            :dataSource="ConstructionType"
            style="width: 66%"
            placeholder="供应商类型"
            :filterOption="handleChangeConstructionType"
          />
        </div>
        <div class="nr">
          <span>运维商:</span>
          <a-input v-model="addData.Construction_boss" placeholder="运维商" />
        </div>
        <div class="nr">
          <span>施工阶段:</span>
          <!-- <a-input v-model="addData.Construction_stage" placeholder="施工阶段" /> 
          1：筹备中，2：施工中，2:施工完结
          -->
          <a-select defaultValue="1" style="width: 66%" @change="handleChange3">
            <a-select-option value="1">筹备中</a-select-option>
            <a-select-option value="2">施工中</a-select-option>
            <a-select-option value="3">施工完结</a-select-option>
          </a-select>
        </div>
        <div class="nr">
          <span>站点经度:</span>
          <a-input v-model="addData.Construction_longitude" placeholder="站点经度" />
          <a-icon title="打开地图" @click="isGeocoding=true" class="dt-rk" type="environment" />
        </div>
        <div class="nr">
          <span>站点纬度:</span>
          <a-input v-model="addData.Construction_latitude" placeholder="站点纬度" />
          <a-icon title="打开地图" @click="isGeocoding=true" class="dt-rk" type="environment" />
        </div>

        <div class="nr">
          <span>联系人名称:</span>
          <a-input v-model="addData.Construction_person" placeholder="联系人名称" />
        </div>
        <div class="nr">
          <span>联系人电话:</span>
          <a-input v-model="addData.Construction_tel" placeholder="联系人电话" />
        </div>
        <div class="nr">
          <span>开始施工时间:</span>
          <!-- <a-input v-model="addData.Construction_Start" placeholder="开始施工时间" /> -->
          <a-date-picker
            placeholder="开始施工时间"
            @change="(date,dateString)=>{addData.Construction_Start=dateString}"
          />
        </div>
        <div class="nr">
          <span>结束施工时间:</span>
          <!-- <a-input v-model="addData.Construction_end" placeholder="结束施工时间" /> -->
          <a-date-picker
            placeholder="结束施工时间"
            @change="(date,dateString)=>{addData.Construction_end=dateString}"
          />
        </div>

        <div class="nr">
          <span>占地面积(m²):</span>
          <a-input v-model="addData.Construction_area" placeholder="占地面积" />
        </div>

        <div class="nr">
          <span>省份名称:</span>
          <a-input v-model="addData.Porvice_Id" placeholder="省份名称" />
          <a-icon title="打开地图" @click="isGeocoding=true" class="dt-rk" type="environment" />
        </div>
        <div class="nr">
          <span>市级名称:</span>
          <a-input v-model="addData.City_Id" placeholder="市级名称" />
          <a-icon title="打开地图" @click="isGeocoding=true" class="dt-rk" type="environment" />
        </div>
        <div class="nr">
          <span>县级名称:</span>
          <a-input v-model="addData.County_Id" placeholder="县级名称" />
          <a-icon title="打开地图" @click="isGeocoding=true" class="dt-rk" type="environment" />
        </div>
        <div class="nr">
          <span>站点地址:</span>
          <a-input v-model="addData.Construction_address" placeholder="站点地址" />
          <a-icon title="打开地图" @click="isGeocoding=true" class="dt-rk" type="environment" />
        </div>
        <!-- <div class="nr">
          <span>站点视频:</span>
          <a-input v-model="addData.Construction_mv" placeholder="站点视频" />
        </div>-->
        <div class="nr">
          <!-- <span>站点图片:</span>
          <a-upload
            :action="API_HOST + 'Construction/UploadFile?para='+JSON.stringify({'type':'1'})"
            listType="picture-card"
            :fileList="fileList"
            @preview="handlePreview"
            @change="handleChangeImg"
          >
            <div v-if="fileList.length < 1">
              <a-icon type="plus" />
              <div class="ant-upload-text">站点图片</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>-->

          <!-- <a-upload
            listType="picture-card"
            :fileList="fileList"
            @change="handleChange"
            :remove="handleRemove"
            :beforeUpload="beforeUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>-->
          <!-- <section class="city-picker">
            <am-select @select="proviceHandle" :options="province" search placeholder="请选择省、直辖市"></am-select>
            <am-select
              v-if="city.length > 0"
              @select="cityHandle"
              search
              :options="city"
              placeholder="请选择市、区"
            ></am-select>
            <am-select
              v-if="county.length > 0"
              @select="countyHandle"
              search
              :options="county"
              placeholder="请选择区、县"
            ></am-select>
          </section>
          <p v-if="address">
            您选择的是：
          <span class="am-text-success">{{ address }}</span>-->

          <!-- </p> -->
        </div>
      </div>
    </a-modal>
    <a-modal
      class="xjgd"
      title="工地信息"
      width="800px"
      v-model="visible3"
      @ok="handleOk1"
      okText="保存"
      :bodyStyle="{}"
    >
      <div class="xjgd-body">
        <div class="nr">
          <span>报建编号:</span>
          <a-input v-model="addData._name" placeholder="报建编号" />
        </div>
        <div class="nr">
          <span>站点名称:</span>
          <a-input v-model="addData.Construction_name" placeholder="站点名称" />
        </div>
        <div class="nr">
          <span>工程类型:</span>
          <a-input v-model="addData.Construction_protp" placeholder="工程类型" />
        </div>
        <div class="nr">
          <span>项目类型:</span>
          <a-auto-complete
            :dataSource="ConstructionType"
            :defaultValue="addData.Construction_type"
            style="width: 66%"
            placeholder="供应商类型"
            :filterOption="handleChangeConstructionType"
          />
        </div>
        <div class="nr">
          <span>运维商:</span>
          <a-input v-model="addData.Construction_boss" placeholder="运维商" />
        </div>
        <div class="nr">
          <span>施工阶段:</span>
          <!-- <a-input v-model="addData.Construction_stage" placeholder="施工阶段" /> 
          1：筹备中，2：施工中，2:施工完结
          -->
          <a-select defaultValue="1" style="width: 66%" @change="handleChange3">
            <a-select-option value="1">筹备中</a-select-option>
            <a-select-option value="2">施工中</a-select-option>
            <a-select-option value="3">施工完结</a-select-option>
          </a-select>
        </div>
        <div class="nr">
          <span>站点经度:</span>
          <a-input v-model="addData.Construction_longitude" placeholder="站点经度" />
          <a-icon title="打开地图" @click="isGeocoding=true" class="dt-rk" type="environment" />
        </div>
        <div class="nr">
          <span>站点纬度:</span>
          <a-input v-model="addData.Construction_latitude" placeholder="站点纬度" />
          <a-icon title="打开地图" @click="isGeocoding=true" class="dt-rk" type="environment" />
        </div>

        <div class="nr">
          <span>联系人名称:</span>
          <a-input v-model="addData.Construction_person" placeholder="联系人名称" />
        </div>
        <div class="nr">
          <span>联系人电话:</span>
          <a-input v-model="addData.Construction_tel" placeholder="联系人电话" />
        </div>
        <div class="nr">
          <span>开始施工时间:</span>
          <!-- <a-input v-model="addData.Construction_Start" placeholder="开始施工时间" /> -->
          <a-date-picker
            placeholder="开始施工时间"
            :defaultValue="moment(addData.Construction_Start, 'yyyy-MM-dd')"
            @change="(date,dateString)=>{addData.Construction_Start=dateString}"
          />
        </div>
        <div class="nr">
          <span>结束施工时间:</span>
          <!-- <a-input v-model="addData.Construction_end" placeholder="结束施工时间" /> -->
          <a-date-picker
            placeholder="结束施工时间"
            :defaultValue="moment(addData.Construction_end, 'yyyy-MM-dd')"
            @change="(date,dateString)=>{addData.Construction_end=dateString}"
          />
        </div>

        <div class="nr">
          <span>占地面积(m²):</span>
          <a-input v-model="addData.Construction_area" placeholder="占地面积" />
        </div>

        <div class="nr">
          <span>省份名称:</span>
          <a-input v-model="addData.Porvice_Id" placeholder="省份名称" />
          <a-icon title="打开地图" @click="isGeocoding=true" class="dt-rk" type="environment" />
        </div>
        <div class="nr">
          <span>市级名称:</span>
          <a-input v-model="addData.City_Id" placeholder="市级名称" />
          <a-icon title="打开地图" @click="isGeocoding=true" class="dt-rk" type="environment" />
        </div>
        <div class="nr">
          <span>县级名称:</span>
          <a-input v-model="addData.County_Id" placeholder="县级名称" />
          <a-icon title="打开地图" @click="isGeocoding=true" class="dt-rk" type="environment" />
        </div>
        <div class="nr">
          <span>站点地址:</span>
          <a-input v-model="addData.Construction_address" placeholder="站点地址" />
          <a-icon title="打开地图" @click="isGeocoding=true" class="dt-rk" type="environment" />
        </div>
      </div>
    </a-modal>

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
          <!-- <a-form-item label="设备杆名称" :label-col="{ span: 9 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[ 'equipmentlab_name', { rules: [{ required: true, message: '不得为空!'}],initialValue: equipment.equipmentlab_name }]"
              placeholder="设备杆名称"
            ></a-input>
          </a-form-item>-->
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
          <!-- <a-form-item label="所属工地" :label-col="{ span: 9 }" :wrapper-col="{ span: 12 }">
            <a-input
              disabled
              v-decorator="[ 'Construction_Id', { rules: [{ required: true, message: '不得为空!'}],initialValue: ConstructionData.Construction_name }]"
              placeholder="所属工地"
            ></a-input>
          </a-form-item>-->
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

          <!-- <a-form-item label="Gender" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-select
              v-decorator="[
          'gender',
          {rules: [{ required: true, message: 'Please select your gender!' }]}
        ]"
              placeholder=""
              @change="handleSelectChange"
            >
              <a-select-option value="male">male</a-select-option>
              <a-select-option value="female">female</a-select-option>
            </a-select>
          </a-form-item>-->

          <div class="bot">
            <a-form-item>
              <a-button @click>取消</a-button>
              <!-- <a-button type="primary" >Submit</a-button> -->
              <a-button type="primary" html-type="submit">添加</a-button>
            </a-form-item>
          </div>
        </a-form>
      </div>
    </a-drawer>
    <a-drawer
      title="设备列表"
      placement="bottom"
      :closable="false"
      height="500"
      @close="onClose1"
      :visible="visible1"
    >
      <div class="gdgl">
        <div class="tab">
          <!-- <a-button @click="visible2=true" style="float:right" type="primary">
            <a-icon type="plus" />添加
          </a-button>-->
        </div>
        <a-table
          :columns="columns"
          :dataSource="data"
          :scroll="{ y: 240 ,x:1500}"
          :pagination="false"
          bordered
        >
          <template
            v-for="col in ['equipment_name', 'equipment_tpnum', 'equipment_Longitude', 'equipment_Latitude', 'equipment_Latitude', 'equipment_bnum', 'equipment_MNnum']"
            :slot="col"
            slot-scope="text, record, index"
          >
            <div :key="col">
              <a-input
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                @change="e => handleChange(e.target.value, record.key, col)"
              />
              <template v-else>{{text}}</template>
            </div>
          </template>

          <template slot="operation" slot-scope="text, record, index">
            <div class="editable-row-operations">
              <span v-if="record.editable">
                <a @click="() => save(record.key)">保存</a>
                <a-popconfirm title="取消编辑?" @confirm="() => cancel(record.key)">
                  <a>取消</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a @click="() => edit(record.key)">修改</a>
                <a @click="() => ondelete(record)">删除</a>
              </span>
            </div>
          </template>
          <!-- <a slot="action" slot-scope="text" href="javascript:;">action</a> -->
        </a-table>
      </div>
    </a-drawer>

    <div class="Curtain" v-if="isGeocoding">
      <geocoding id="allmap_geocoding_1" :onClink="setGeocodingData" />
      <a-button @click="setIsGeocoding(false)" style="margin-top: 20px;" type="primary">确定</a-button>
      <a-button @click="isGeocoding=false" style="margin-top: 20px;">关闭</a-button>
    </div>
  </div>
</template>

<script>
// Construction_name: "", //站点名称
// Construction_type: "", //项目类型
// Construction_protp: "", //工程类型
// Porvice_Id: "", //省份编号
// City_Id: "", //市级编号
// County_Id: "", //县级编号
// Construction_address: "", //站点地址
// Construction_longitude: "", //站点经度
// Construction_latitude: "", //站点纬度
// Construction_person: "", //联系人名称
// Construction_tel: "", //联系人电话
// Construction_Start: "", //开始施工时间
// Construction_end: "", //结束施工时间
// Construction_boss: "", //运维商
// Construction_area: "", //占地面积
// Construction_stage: "", //施工阶段
// Construction_mv: "", //站点视频
// Construction_picture: "" //站点图片
const columns1 = [
  {
    dataIndex: "Construction_name",
    title: "工地信息",
    scopedSlots: { customRender: "Construction_name" }
  },
  {
    dataIndex: "Construction_type",
    title: "项目类型",
    width: "90px",
    scopedSlots: { customRender: "Construction_type" }
  },
  {
    title: "施工时间",
    dataIndex: "Construction_Start",
    scopedSlots: { customRender: "Construction_Start" }
  },
  {
    title: "结束时间",
    dataIndex: "Construction_end",
    scopedSlots: { customRender: "Construction_end" }
  },

  {
    title: "运维商",
    dataIndex: "Construction_boss",
    // width: "80px",
    scopedSlots: { customRender: "Construction_boss" }
  },
  {
    title: "联系人",
    width: "80px",
    dataIndex: "Construction_person"
  },
  {
    title: "电话",
    dataIndex: "Construction_tel"
  },
  {
    title: "面积(m2)",
    dataIndex: "Construction_area"
  },
  {
    title: "操作",
    dataIndex: "recordTypeList",
    width: "80px",
    scopedSlots: { customRender: "recordTypeList" }
  }
];

const data1 = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    date: "2019/06/30-2019/09/30",
    sbgh: "上海浦东城建…",
    Mn: "小小永",
    cbz: "150217364633",
    cbcs: "115",
    state: "3",
    sb: [
      {
        type: "1",
        name: "前滩40-01地块项目 [东边设备]",
        state: "1",
        stateName: "正常"
      },
      {
        type: "1",
        name: "前滩40-01地块项目 [西边设备]",
        state: "2",
        stateName: "故障"
      },
      {
        type: "1",
        name: "前滩40-01地块项目 [测试设备]",
        state: "4",
        stateName: "离线"
      },
      {
        type: "1",
        name: "前滩40-01地块项目 [北边设备]",
        state: "1",
        stateName: "正常"
      },
      {
        type: "1",
        name: "前滩40-01地块项目 [南边设备]",
        state: "3",
        stateName: "超标"
      }
    ]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    date: "2019/06/30-2019/09/30",
    sbgh: "上海浦东城建…",
    Mn: "小小永",
    cbz: "150217364633",
    cbcs: "115",
    state: "3",
    sb: [
      { type: "1", name: "设备1", state: "1", stateName: "正常" },
      { type: "1", name: "设备2", state: "2", stateName: "故障" },
      { type: "1", name: "设备3", state: "4", stateName: "离线" },
      { type: "1", name: "设备4", state: "1", stateName: "正常" },
      { type: "1", name: "设备5", state: "3", stateName: "超标" }
    ]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    date: "2019/06/30-2019/09/30",
    sbgh: "上海浦东城建…",
    Mn: "小小永",
    cbz: "150217364633",
    cbcs: "115",
    state: "2",
    sb: [
      { type: "1", name: "设备1", state: "1", stateName: "正常" },
      { type: "1", name: "设备2", state: "2", stateName: "故障" },
      { type: "1", name: "设备3", state: "4", stateName: "离线" },
      { type: "1", name: "设备4", state: "1", stateName: "正常" },
      { type: "1", name: "设备5", state: "1", stateName: "正常" }
    ]
  },
  {
    key: "4",
    name: "Joe Black",
    age: 32,
    date: "2019/06/30-2019/09/30",
    sbgh: "上海浦东城建…",
    Mn: "小小永",
    cbz: "150217364633",
    cbcs: "115",
    state: "1",
    sb: [
      { type: "1", name: "设备1", state: "1", stateName: "正常" },
      { type: "1", name: "设备2", state: "1", stateName: "正常" },
      { type: "1", name: "设备3", state: "4", stateName: "离线" },
      { type: "1", name: "设备4", state: "1", stateName: "正常" },
      { type: "1", name: "设备5", state: "1", stateName: "正常" }
    ]
  },
  {
    key: "5",
    name: "Joe Black",
    age: 32,
    date: "2019/06/30-2019/09/30",
    sbgh: "上海浦东城建…",
    Mn: "小小永",
    cbz: "150217364633",
    cbcs: "115",
    state: "4",
    sb: [{ type: "1", name: "设备3", state: "4", stateName: "离线" }]
  }
];
const columns = [
  {
    title: "设备名称",
    dataIndex: "equipment_name",
    width: 300,
    scopedSlots: { customRender: "equipment_name" }
  },
  {
    title: "型号",
    dataIndex: "equipment_tpnum",
    width: 300,
    scopedSlots: { customRender: "equipment_tpnum" }
  },
  {
    title: "设备经度",
    dataIndex: "equipment_Longitude",
    width: 160,
    scopedSlots: { customRender: "equipment_Longitude" }
  },
  {
    title: "设备纬度",
    dataIndex: "equipment_Latitude",
    width: 160,
    scopedSlots: { customRender: "equipment_Latitude" }
  },
  // {
  //   title: "设备杆编号",
  //   dataIndex: "equipment_bnum",
  //   width: 200,
  //   scopedSlots: { customRender: "equipment_bnum" }
  // },
  {
    title: "MN码",
    dataIndex: "equipment_MNnum",
    width: 200,
    scopedSlots: { customRender: "equipment_MNnum" }
  },
  {
    title: "状态",
    dataIndex: "RecordType_type",
    width: 100,
    scopedSlots: { customRender: "RecordType_type" }
  }
  // {
  // title: "操作",
  // // fixed: "right",
  // width: 100,
  // // dataIndex: "operation",
  // scopedSlots: { customRender: "operation" }
  // }

  // equipment_UId	int(10)	否		设备唯一标识码
  // equipment_name	varchar(64)	否		设备名称
  // equipment_tpnum	varchar(64)	是		设备型号
  // equipmentlab_name	varchar(64)	否	0	设备杆名称
  // equipment_bnum	varchar(64)	否		设备杆编号
  // equipment_MNnum	varchar(64)	否		MN码

  // RecordType_Id	int(11)	是		设备记录类型
  // Operator_Id	int(11)	否	0	所属运维商
  // Construction_Id	int(11)	否		所属工地
  // Provider_Id	int(11)	否		所属供应商

  // equipment_address	varchar(255)	是		所属地质
  // equipment_Longitude	double	否	0	设备经度
  // equipment_Latitude	double	否		设备纬度
  // equipment_type	varchar(50)	否		设备类型
];
const data = [];
// for (let i = 0; i < 4; i++) {
//   data.push({
//     key: i.toString(),

//     // name: `Edrward ${i}`,
//     equipment_UId: "1440-0028-sclw-5874", //设备唯一标识码
//     equipment_name: `扬尘监测仪器${i}`, //设备名称
//     equipment_tpnum: "INVOO-YC-云和", //设备型号
//     equipment_bnum: "1440-0028-sclw", //设备杆编号
//     equipment_MNnum: "1440-0028-sclw", //MN码
//     state: i + 1,
//     equipment_Longitude: "20.111111", //设备经度
//     equipment_Latitude: "20.111111" //设备纬度
//     // equipment_address: "设备地址",//设备地址
//     // equipment_type: "", //设备类型
//     // address: `London Park no. ${i}`
//   });
// }
const rowSelection = {
  Datalist: [],
  onChange: (selectedRowKeys, selectedRows) => {
    rowSelection.Datalist = selectedRows;
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  }
};
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
import locationData from "../../../static/js/location";
import util from "../../http.utils.js";
import moment from "moment";
import Geocoding from "@/components/pages/geocoding";
export default {
  name: "gdgl", //工地管理
  components: {
    Geocoding
  },
  data() {
    const province = [];
    for (let code in locationData) {
      let item = locationData[code];
      province.push(
        Object.assign(item, {
          label: item.name
        })
      );
    }
    this.cacheData = data.map(item => ({ ...item }));
    return {
      typeName: "工地管理",
      current: 1,
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      visible: false,
      province,
      city: [],
      county: [],
      selectProvince: null,
      selectCity: null,
      selectCounty: null,
      User_Id: "",

      pageno: 1,
      pagesize: 10,
      TotalCount: 10,

      previewVisible: false,
      previewImage: "",
      fileList: [],

      API_HOST: "",

      geocodingData: {},
      isGeocoding: false,

      visible1: false,
      visible2: false,
      visible3: false,
      data: [],
      columns,
      data1: [],
      columns1,
      rowSelection,
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
      },

      addData: {
        Construction_Id: "",
        _name: "",
        Construction_name: "", //站点名称
        Construction_type: "", //项目类型
        Construction_protp: "", //工程类型
        Porvice_Id: "", //省份编号
        City_Id: "", //市级编号
        County_Id: "", //县级编号
        Construction_address: "", //站点地址
        Construction_longitude: "", //站点经度
        Construction_latitude: "", //站点纬度
        Construction_person: "", //联系人名称
        Construction_tel: "", //联系人电话
        Construction_Start: "", //开始施工时间
        Construction_end: "", //结束施工时间
        Construction_boss: "", //运维商
        Construction_area: "", //占地面积
        Construction_stage: "", //施工阶段
        Construction_mv: "", //站点视频
        Construction_picture: "" //站点图片
      },
      ConstructionData: {},
      ConstructionType: []
    };
  },

  //加载后执行
  mounted() {},

  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChangeImg({ file, fileList }) {
      if (file.status === "done") {
        if (file.response.Code === "0") {
          file.status = "error";
        }
        this.addData.Construction_picture = file.response.Data;
      }
      this.fileList = fileList;
    },
    DeletePhotoProvider({ file, fileList, DataLength, type }) {
      var _this = this;

      if (file.status === "done") {
        if (file.response.Code === "0") {
          file.status = "error";
        }
        var url = file.response.Data;

        fileList.map((_d, i) => {
          if (_d.name === file.name) {
            file.thumbUrl = url;
            file.url = url;
          }
        });
      }
    },
    setGeocodingData(_d, lnglat) {
      this.geocodingData.Porvice_Id = _d.addressComponent.province;
      this.geocodingData.City_Id = _d.addressComponent.city;
      this.geocodingData.County_Id = _d.addressComponent.district;
      this.geocodingData.Construction_address = _d.formattedAddress;
      this.geocodingData.Construction_longitude = lnglat.split(",")[0];
      this.geocodingData.Construction_latitude = lnglat.split(",")[1];
    },

    setIsGeocoding(val) {
      this.addData = {
        ...this.addData,
        ...this.geocodingData
      };
      this.isGeocoding = val;
    },
    // beforeUpload(file, info) {
    //   getBase64(file, imageUrl => {
    //     this.imageUrl = imageUrl;
    //     this.loading = false;
    //   });
    //   this.addData.Construction_picture = file;
    //   return false;
    // },
    showDrawer1(data) {
      this.equipment.Construction_Id = data.Construction_Id;
      this.equipment.Construction_name = data.Construction_name;

      this.ConstructionData = data;
      this.visible1 = true;
      var _this = this;
      this.PageEquipment();
    },
    PageEquipment(data) {
      var _this = this;
      util._httpData(this, "Equipment/PageEquipment", {
        pageno: 1,
        pagesize: 1000,
        construction_Id: this.equipment.Construction_Id
      }).then = function() {
        if (this.state) {
          var datas = this.data.Data;
          datas.map((_d, i) => {
            _d.key = i;
          });
          _this.data = datas;
          // _this.$message.success(this.message, 4);
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    GetConstructionType() {
      this.visible = true;
      this.addData = {
        Construction_Id: "",
        _name: "",
        Construction_name: "", //站点名称
        Construction_type: "", //项目类型
        Construction_protp: "", //工程类型
        Porvice_Id: "", //省份编号
        City_Id: "", //市级编号
        County_Id: "", //县级编号
        Construction_address: "", //站点地址
        Construction_longitude: "", //站点经度
        Construction_latitude: "", //站点纬度
        Construction_person: "", //联系人名称
        Construction_tel: "", //联系人电话
        Construction_Start: "", //开始施工时间
        Construction_end: "", //结束施工时间
        Construction_boss: "", //运维商
        Construction_area: "", //占地面积
        Construction_stage: "", //施工阶段
        Construction_mv: "", //站点视频
        Construction_picture: "" //站点图片
      };
      if (this.ConstructionType.length === 0) {
        var _this = this;
        util._httpData(
          this,
          "ConstructionType/GetConstructionType",
          {}
        ).then = function() {
          if (this.state) {
            var list = this.datas;
            list.map((_d, key) => {
              _this.ConstructionType.push(_d.ConstructionType_name);
            });
            // _this.ConstructionType = this.datas;

            // _this.visible = false;
            // _this.$message.success(this.message, 4);
          } else {
            _this.$message.error(this.message, 4);
          }
        };
      }
    },
    handleChange3(value) {
      this.addData.Construction_stage = value;
    },
    handleChangeConstructionType(input, option) {
      this.addData.Construction_type = input;
      return (
        option.componentOptions.children[0].text
          .toUpperCase()
          .indexOf(input.toUpperCase()) >= 0
      );

      // console.log(`Selected: ${this.Provider_type}`);
    },
    onClose1() {
      this.visible1 = false;
    },
    handleOk(_d) {
      var _this = this;
      this.addData.Construction_type = this.addData.Construction_type.toString();
      util._httpData(this, "Construction/AddConstruction", {
        ...this.addData,
        User_Id: this.User_Id
      }).then = function() {
        if (this.state) {
          _this.visible = false;
          _this.PageConstructionAsync(_this.pageno, _this.pagesize);
          _this.$message.success(this.message, 4);
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    handleOk1() {},

    onPaging(current) {
      this.pageno = current;
      this.PageConstructionAsync(this.pageno, this.pagesize);
    },
    onChangeDate(date, dateString) {
      console.log(date, dateString);
    },
    onShowSizeChange(current, size) {
      this.pageno = current;
      this.pagesize = size;
      this.PageConstructionAsync(this.pageno, this.pagesize);
    },

    proviceHandle(value) {
      const city = [];
      for (let code in value.cities) {
        let item = value.cities[code];
        city.push(
          Object.assign(item, {
            label: item.name
          })
        );
      }
      this.city = city;
      this.county = [];
      this.selectProvince = value.name;
      this.selectCity = null;
      this.selectCounty = null;
    },
    cityHandle(value) {
      const county = [];
      for (let code in value.districts) {
        let item = value.districts[code];
        county.push({
          code,
          label: item,
          name: item
        });
      }
      this.county = county;
      this.selectCity = value.name;
      this.selectCounty = null;
    },
    countyHandle(value) {
      this.selectCounty = value.name;
    },
    getConstructionData(_d) {
      this.visible3 = true;
      if (this.ConstructionType.length === 0) {
        var _this = this;
        util._httpData(
          this,
          "ConstructionType/GetConstructionType",
          {}
        ).then = function() {
          if (this.state) {
            var list = this.datas;
            list.map((_d, key) => {
              _this.ConstructionType.push(_d.ConstructionType_name);
            });
          } else {
            _this.$message.error(this.message, 4);
          }
        };
      }
      _d.Construction_Start = _d.Construction_Start.replace(/T/g, " ");
      _d.Construction_end = _d.Construction_end.replace(/T/g, " ");

      this.addData = _d;
    },
    iconStyle(list) {
      if (!list) return { color: "#d2d2d2" };
      var color = "";
      var state = 0;
      var toColor = function(key) {
        if (key === 4) {
          key = 0;
        }
        if (key > state) {
          state = key;
        }
      };
      for (var key in list) {
        toColor(list[key].RecordType_type);
      }
      switch (state) {
        case 1:
          color = "#0bbe79";
          break;
        case 2:
          color = "#e98337";
          break;
        case 3:
          color = "red";
          break;
        case 0:
          color = "#d2d2d2";
          break;
      }

      return { color: color };
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      var _this = this;
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];

      if (target) {
        delete target.editable;
        this.data = newData;
        this.cacheData = newData.map(item => ({ ...item }));

        util._httpPost(_this, "Equipment/UpdateEquipment", {
          ...target
        }).then = function() {
          if (this.state) {
            // _this.PageEquipment();
            _this.$message.success(this.message, 4);
          } else {
            _this.$message.error(this.message, 4);
          }
        };
      }
    },
    cancel(key) {
      var _this = this;
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter(item => key === item.key)[0]
        );
        delete target.editable;
        this.data = newData;
      }
    },
    PageConstructionAsync(pageno, pagesize) {
      var _this = this;
      util._httpData(this, "Construction/PageConstruction", {
        pageno: pageno,
        pagesize: pagesize,
        user_Id: this.User_Id,
        construction_Name: ""
      }).then = function() {
        if (this.state) {
          var datas = this.data.Data;
          if (datas) {
            datas.map((_d, i) => {
              _d.key = i + "_";
            });
          }
          _this.data1 = datas;
          _this.TotalCount = this.data.TotalCount;
        }
      };
    },
    ondelete(data) {
      var _this = this;
      util._httpPost(_this, "Equipment/DeleteEquipment", {
        equipment_Id: data.equipment_Id
      }).then = function() {
        if (this.state) {
          _this.PageEquipment();
          _this.$message.success(this.message, 4);
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    deleteData() {
      this.rowSelection;
    },
    handleSubmit(e) {
      var _this = this;
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          util._httpPost(_this, "Equipment/AddEquiption", {
            ...values,
            Construction_Id: _this.ConstructionData.Construction_Id
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
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`
      });
    }
  },
  computed: {
    address() {
      const { selectProvince, selectCity, selectCounty } = this;
      return (
        (selectProvince ? selectProvince : "") +
        (selectCity ? " " + selectCity : "") +
        (selectCounty ? " " + selectCounty : "")
      );
    }
  },
  //加载前执行
  created() {
    var User = this.$cookies.get("User");
    if (!User) return;
    this.User_Id = User.User_Id;
    this.API_HOST = process.env.API_HOST;
    this.PageConstructionAsync(this.pageno, this.pagesize);
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>














