<template>
  <div id="HomePage">
    <!-- 点击地图设备 显示信息 start-->

    <div class="tcxx sbxx" ref="tcxx1" v-show="information">
      <div class="to">
        <span class="fh">
          <!-- <a-icon style="color:red" type="left" /> -->
          {{informationData.name}}
          <a-badge :status="EquipmentState?'default':'success'" style="" text />
          <!-- <a-badge :numberStyle= "{color: '#52c41a'} " text="正常" /> -->
        </span>
        <span style="float: right;">
          <a title="返回首页" @click="statistical" style="margin-right: 25px;">
            <!-- <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" /> -->
            返回首页
          </a>

          <span
            @click="deviceInformation"
            style="color:red; line-height: 34px;cursor: pointer; font-size: 16px;"
          >关闭</span>
          <!-- <a-icon
            type="close-circle"
          />-->
        </span>
      </div>
      <div class="st1">
        <a-tabs @change="onSwitch" class="tabs-st1">
          <a-tab-pane tab="粉尘" key="1">
            <div v-if="Switch=='1'">
              <x-chart id="highcharts" class="high" :option="option" ref="option1"></x-chart>
            </div>
            <!-- <H3>数据监控</H3> -->
            <li>
              <a-row>
                <a-col style="text-align: center;">
                  <a-checkbox-group
                    :options="plainOptions"
                    v-model="checkedList"
                    @change="onChange1"
                  />
                </a-col>
                <!-- <a-col :span="3" :pull="21">数据类型</a-col> -->
              </a-row>
            </li>
            <!-- <li>
              <a-row>
                <a-col :span="21" :push="3">
                  <a-select size="small" defaultValue="15分钟均值">
                    <a-select-option value="15">15分钟均值</a-select-option>
                    <a-select-option value="30">30分钟均值</a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="3" :pull="21">统计类型</a-col>
              </a-row>
            </li>
            <li>
              <a-row>
                <a-col :span="21" :push="3">
                  <a-range-picker
                    style="width: 400px;"
                    size="small"
                    format="YYYY-MM-DD HH:mm:ss"
                    @change="onChange"
                  />
                </a-col>
                <a-col :span="3" :pull="21">起止时间</a-col>
              </a-row>
              noise; //噪音
          _this.wind_direction = wind_direction; //风向
          _this.wind_speed = wind_speed; //风速
          _this.temperature = temperature; //温度
          _this.humidity = humidity; //湿度
          _this.humidity = humidity; //湿度
            </li>-->
          </a-tab-pane>
          <a-tab-pane tab="噪声" key="2">
            <div v-if="Switch=='2'">
              <n-oise :equipment_Id="equipment_Id" :datas="[noise]" ref="oise"></n-oise>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="温度/湿度" key="3">
            <div v-if="Switch=='3'">
              <TemperatureAndHumidity :datas="[temperature,humidity]" ref="TemperatureAndHumidity"></TemperatureAndHumidity>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="风速/风向" key="4">
            <div v-if="Switch=='4'">
              <WindSpeedDirection :datas="[wind_direction,wind_speed]" ref="WindSpeedDirection"></WindSpeedDirection>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="气压" key="5">
            <div v-if="Switch=='5'">
              <Pressure :datas="[air_pressure]" ref="Pressure"></Pressure>
            </div>
          </a-tab-pane>

          <!-- <a-button slot="tabBarExtraContent">Extra Action</a-button> -->
        </a-tabs>
        <div class="gl">
          <span>详情</span>
          <!-- <a-icon :type="islb?'up':'down'" /> @click="islbXq" v-show="false"  -->
        </div>
        <div ref="lbXq" class="lb">
          <ul>
            <!-- <H3>详情</H3> -->
            <!-- <li>
              地址：浦东新区高青西路杨思西路交叉处
              <a @click="visible2=true">查看街道 ></a>
            </li>
            <li>区县：浦东新区</li>
            <li>建筑面积：92276.7（平方米）</li>
            <li>施工单位：中国建筑第八工程局有限公司</li>
            <li>数据时间：2017-07-06 10:00:00</li>
            <li>颗粒物：0.166（毫克/立方米）</li>
            <li>噪声：96.36dB（A）</li>
            <li>运维单位：杭州茵沃环保科技有限公司</li>
            <li>联系人：曹经理</li>
            <li>联系电话：13764057688</li>
            <li>施工阶段：基础</li>
            <li>占地面积：0</li>
            <li>
              监控视频：
              <a @click>点击查看 ></a>
            </li>-->
            <li>工地名称：{{firstConstruction_data.Construction_name}}</li>
            <li>工地项目类型：{{firstConstruction_data.Construction_type}}</li>
            <li>工地工程类型：{{firstConstruction_data.Construction_protp}}</li>
            <li>
              <div
                style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;width:200px;float: left;"
              >详细地址：{{firstConstruction_data.Construction_address}}</div>
              <a @click="visible2=true">查看街道 ></a>
            </li>
            <li>施工开始时间：{{firstConstruction_data.Construction_Start}}</li>
            <li>施工结束时间：{{firstConstruction_data.Construction_end}}</li>
            <li>所属承包商：{{firstConstruction_data.Construction_boss}}</li>
            <li>施工阶段：{{firstConstruction_data.Construction_stage}}</li>
            <li>占地面积：{{firstConstruction_data.Construction_area}}</li>
            <li>
              监控视频：
              <a @click>点击查看 ></a>
            </li>
          </ul>
          <ul></ul>
        </div>
      </div>
      <a-modal
        centered
        v-model="visible2"
        :okButtonProps="{ style: {display: 'none'} }"
        :cancelButtonProps="{ style: {display: 'none'} }"
      >
        <div>管辖单位：{{firstConstruction_data.Construction_boss}}</div>
        <div>地址：{{firstConstruction_data.Construction_address}}</div>
        <div>联系人电话：{{firstConstruction_data.Construction_tel}}</div>
        <div>经度纬度：{{firstConstruction_data.Construction_longitude}} , {{firstConstruction_data.Construction_latitude}}</div>
      </a-modal>
    </div>
    <!-- 点击地图设备 显示信息 and-->

    <!-- 设备数量 显示信息 start-->
    <div class="tcxx" ref="tcxx" v-show="!information">
      <div class="to">
        <!-- <a-icon type="pie-chart" /> -->
        <b style="color:#00bd74;font-size: 42px;">.</b>
        <span>设备数量</span>
        <!-- <span class="fh" @click="visible3=true" style="float: right">
          智能趋势图
          <a-icon type="right" />
        </span>-->
        <!-- <a-col :span="4">
          <span>
            在线设备：<span>{{OnlineCount}}</span>
          </span>
        </a-col>
        <a-col :span="4">
          <span>
            离线设备：<span>{{OutlineCount}}</span>
          </span>
        </a-col>-->

        <span style="margin-left: 90px">
          在线
          <span style="color:#00bd74">{{OnlineCount}}</span>
        </span>
        <span style="margin-left: 20px">
          离线
          <span style="color:#959595">{{OutlineCount}}</span>
        </span>
        <div class="fh" style="float: right;" @click="statistical">
          <a-icon type="menu-fold" />
        </div>
        <a-select
          size="small"
          class="s_sj"
          style="float: right;margin-top: 9px;"
          defaultValue
          @change="handleChange"
          optionFilterProp="children"
        >
          <!-- <a-menu-item :value="''">全部</a-menu-item> -->
          <a-select-option autofocus :value="''">全部</a-select-option>
          <a-select-option
            :key="key"
            v-for="(val,key) in ZoneDataScreening[County_Id]"
            :value="val.SumCount"
          >{{val.val}}</a-select-option>
          <!-- <a-menu-item
                @click="toSumCount = val.SumCount"
                :key="key"
                :value="val.val"
                v-for="(val,key) in ZoneDataScreening[County_Id]"
          >{{val.val}}</a-menu-item>-->
        </a-select>
      </div>

      <div class="st1">
        <div class style="padding: 15px;">
          <!-- <div class="sbsl"> -->
          <!-- <a-tabs defaultActiveKey="1" :style="{ height: '240px'}" @change>
            <a-tab-pane key="1">
              <span slot="tab">设备总数（{{SumCount}}）</span>
              <x-chart style="height: 166px;" id="highcharts4_0" :option="option4s[0]"></x-chart>
            </a-tab-pane>
            <a-tab-pane key="2">
              <span slot="tab">在线设备（{{OnlineCount}}）</span>
              <x-chart style="height: 166px;" id="highcharts4_1" :option="option4s[1]"></x-chart>
            </a-tab-pane>
            <a-tab-pane key="3">
              <span slot="tab">离线设备（{{OutlineCount}}）</span>
              <x-chart style="height: 166px;" id="highcharts4_2" :option="option4s[2]"></x-chart>
            </a-tab-pane>
            <a-tab-pane key="4">
              <span slot="tab">故障设备（{{TroubleCount}}）</span>
              <x-chart style="height: 166px;" id="highcharts4_3" :option="option4s[3]"></x-chart>
            </a-tab-pane>
          </a-tabs>-->
          <!-- <a-row type="flex" justify="center">
              <a-col :span="4">
                <span>
                  <h2>{{SumCount}}</h2>设备总数
                </span>
              </a-col>
              <a-col :span="4">
                <span>
                  <h2>{{OnlineCount}}</h2>在线设备
                </span>
              </a-col>
              <a-col :span="4">
                <span>
                  <h2>{{ExceedingCount}}</h2>超标设备
                </span>
              </a-col>
              <a-col :span="4">
                <span>
                  <h2>{{OutlineCount}}</h2>离线设备
                </span>
              </a-col>
              <a-col :span="4">
                <span>
                  <h2>{{TroubleCount}}</h2>故障设备
                </span>
              </a-col>
          </a-row>-->

          <!-- <a-row type="flex" justify="center">
            <a-col :span="6">
              <span>
                正常设备
                <h3>{{NormalCount}}</h3>
              </span>
            </a-col>
            <a-col :span="6">
              <span>
                故障设备
                <h3>{{TroubleCount}}</h3>
              </span>
            </a-col>
            <a-col :span="6">
              <span>
                超标设备
                <h3>{{ExceedingCount}}</h3>
              </span>
            </a-col>
          </a-row>-->
          <!-- </div> -->

          <a-row
            style="border-bottom: 1px solid #F2F2F2;margin-bottom: 10px;"
            type="flex"
            justify="center"
          >
            <div class="waveWrapper waveAnimation circle">
              <!--  -->
              <!-- <div class="waveWrapperInner bgTop">
              <div class="wave waveTop"></div>
              </div>-->
              <!-- <div class="bgTop"> -->
              <!-- <div :class="'waveTop ' + 'waveImg' + InPercentage(toSumCount,SumCount)"></div> -->
              <!-- </div>  -->
              <div class="waveWrapperInner bgMiddle">
                <div :class="'wave waveMiddle waveMiddle_' + InPercentage(toSumCount,SumCount)"></div>
              </div>
              <!-- <div class="waveWrapperInner bgMiddle">
              <div class="wave waveMiddle waveMiddle_90"></div>
              </div>-->
              <!-- <div class="waveWrapperInner bgBottom">
              <div class="wave waveBottom"></div>waveMiddle_90
              </div>-->
              <div class="text">{{toSumCount}}台</div>
            </div>
          </a-row>
          <b style="color:#a1a6af">全市扬尘&噪音小时平均值</b>
          <x-chart id="highcharts2_" class="high" style="height:150px" :option="option_city"></x-chart>
        </div>

        <!-- <a-modal
          title="超标工地"
          width="90%"
          :bodyStyle="{ height: '500px', overflowX: 'auto'}"
          class="cbgd"
          v-model="visible1"
          :footer="null"
        >
          <a-tabs defaultActiveKey="1">
            <a-tab-pane tab="今日超标" key="1">
              <a-collapse
                v-if="ExceedingEquipments.length > 0"
                defaultActiveKey="1"
                accordion
                :bordered="false"
              >
                <a-collapse-panel v-for="(val,key) in ExceedingEquipments" :key="key">
                  <template slot="header">
                    <td>
                      <div class="da">{{val.Construction_Name}}</div>
                      <div
                        class="tex"
                      >超标：{{val.ExceedingEquipmentCount}}台 | 设备数量：{{val.EquipmentCount}} | 超标次数：{{val.ExceedingCount}}</div>
                      <div class="tex">{{val.Construction_address}}</div>
                    </td>
                  </template>
                  <a-tabs defaultActiveKey="0" :style="{ height: '200px'}" @change="doChunk">
                    <a-tab-pane
                      v-for="(_d,i) in val.exceedingEquipmentList"
                      :tab="_d.equipment_name"
                      :key="i + _d.equipment_name"
                    >
                      <div class="highcharts_sb">
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
              </a-collapse>
            </a-tab-pane>
            <a-tab-pane tab="历史超标" key="2"></a-tab-pane>
          </a-tabs>
        </a-modal>-->

        <div class="lb">
          <div class="to" style="width: 460px">
            <div class="buot">
              <div
                :class="buot==='超标数据'?'red':''"
                @click="getExceedingEquipment('');buot='超标数据'"
              >超标数据</div>
              <div :class="buot==='重点关注'?'red':''" @click="pageAttention();buot='重点关注'">重点关注</div>
              <div
                class="green-h"
                :style="buot==='绿色排行'?'color:#00bd74':''"
                @click="pageAttention();buot='绿色排行'"
              >绿色排行</div>

              <span class="screen">
                <!-- <a-button-group> -->
                <div @click="is_to=true" :class="is_to?'_to':''" type="primary" size="small">今天</div>
                <div @click="is_to=false" :class="!is_to?'_to':''" size="small">7天</div>
                <!-- </a-button-group> -->
              </span>

              <span
                style="float: right"
                class="ant-dropdown-link"
                @click="()=>$router.push({ path: 'jrcb' })"
                href="#"
              >更多</span>
            </div>
            <div class="lb-body" v-if="buot==='超标数据'">
              <!-- <span>超标总数：{{ExceedingEquipmentTotalCount}}</span> -->
              <!-- <span style="float: right"> -->

              <!--  <a-dropdown style="margin-right: 20px;" :trigger="['click']">
                    <a class="ant-dropdown-link" href="#">
                      地区
                      <a-icon type="down" />
                    </a>
                    <a-menu slot="overlay">
                      <a-menu-item @click="getExceedingEquipment('')">全部</a-menu-item>
                      <a-menu-item
                        @click="getExceedingEquipment(val.val)"
                        :key="key"
                        v-for="(val,key) in ZoneDataScreening[County_Id]"
                      >{{val.val}}({{val.SumCounts}})</a-menu-item>
                    </a-menu>
              </a-dropdown>-->
              <!-- </span> -->
              <a-table
                :columns="ExceedingEquipmentColumns"
                :dataSource="ExceedingEquipment"
                :pagination="false"
              >
                <div slot="Construction_Name" slot-scope="Construction_Name">
                  <a-popover title="单位信息" trigger="hover" style="line-height: 28px;" class="f-left">
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
                  <!-- {{data.exceedingEquipmentList}} -->
                  <!-- <td style="" data-sparkline="87,44,74,41"></td> -->
                </div>
                <div slot="cb" slot-scope="cd,data">1.111</div>
                <div slot="cz" slot-scope="cz,data">
                  <a-dropdown :trigger="['click']">
                    <!-- <a class="ant-dropdown-link" href="#">
                        ...
                    </a>-->
                    <a-button class="an1" @click>
                      <b style="color:#2d75f0">.</b>
                      <b style="color:red">.</b>
                      <b style="color:#00bd74">.</b>
                    </a-button>
                    <!-- <div class="an1" style="font-size: 26px;cursor: default;">
                     
                    </div>-->
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
                      <!-- <a-menu-item key="1">
                        <div class="b-img2" target="_blank" rel="noopener noreferrer">查看记录</div>
                      </a-menu-item>-->
                      <!-- <a-menu-item key="2">
                        <div class="b-img3" target="_blank" rel="noopener noreferrer">单位信息</div>
                      </a-menu-item>-->
                      <a-menu-item key="3">
                        <div
                          class="b-img4"
                          target="_blank"
                          @click="visible=true"
                          rel="noopener noreferrer"
                        >发送通知</div>
                      </a-menu-item>
                      <!-- <a-menu-divider />
                      <a-menu-item key="3" disabled>3rd menu item（disabled）</a-menu-item>-->
                    </a-menu>
                  </a-dropdown>
                </div>
              </a-table>

              <!-- <table id="table-sparkline"> -->
              <!-- <thead>
                  
              </thead>-->
              <!-- <tbody id="tbody-sparkline"> -->

              <!-- <tr>
                  <td data-sparkline="87,44,74,41"></td>
              
                  <td>
                  <a-button type="primary" icon="sound" @click="visible=true" :size="'large'">通知</a-button>
                  </td>
              </tr>-->
              <!-- <tr>
                        <ht>名称</ht>
                        <ht>状态</ht>
                        <ht>超标均值</ht>
                        <ht>操作</ht>
              </tr>-->
              <!-- <tr v-for="val in ExceedingEquipment"> -->
              <!-- <td data-sparkline="23, 25, 29, 41, 44, 60, 34, 30, 25, 32"></td> -->
              <!-- <td :data-sparkline="val.dataList.map((_d)=>{return _d.Data_avg})"></td> -->
              <!-- <td>
                      <div class="sbsl">
                        <span>超标</span>
                        {{val.ExceedingEquipmentCount}}
                        <span>台</span>
                      </div>
              </td>-->
              <!--  -->
              <!-- {{val.dataList.map((_d)=>{return _d.Data_avg})}} -->
              <!-- <td>
                      <div class="da">{{val.Construction_Name}}</div>
                      <div>设备数量：{{val.EquipmentCount}} | 超标次数：{{val.ExceedingCount}}</div>
                      <div>{{val.Construction_address}}</div>
                    </td>
                    <td>
                      <a-button
                        v-if="val.IsAttention==0"
                        type="primary"
                        @click="AddOrCancelAttention(val,val.Construction_Id,1)"
                        :size="'large'"
                      >重点关注</a-button>
                      <a-button
                        v-else-if="val.IsAttention==1"
                        type="primary"
                        @click="AddOrCancelAttention(val,val.Construction_Id,2)"
                        :size="'large'"
                      >取消关注</a-button>
                    </td>
                  </tr>
                </tbody>
              </table>-->
            </div>
            <div class="lb-body" v-if="buot==='重点关注'">
              <!-- <div
                style="width: 180%; text-align: center; margin-left: -16px;"
                @click="pageAttention"
                slot="tab"
              >重点关注</div>-->
              <div>
                <a-table
                  :columns="ExceedingEquipmentColumns"
                  :dataSource="FollowData.Data"
                  :pagination="false"
                >
                  <div slot="Construction_Name" slot-scope="Construction_Name">
                    <a-popover
                      title="单位信息"
                      trigger="hover"
                      style="line-height: 28px;"
                      class="f-left"
                    >
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
                    <!-- {{data.exceedingEquipmentList}} -->
                    <!-- <td style="" data-sparkline="87,44,74,41"></td> -->
                  </div>
                  <div slot="cb" slot-scope="cd,data">1.111</div>
                  <div slot="cz" slot-scope="cz,data">
                    <a-dropdown :trigger="['click']">
                      <!-- <a class="ant-dropdown-link" href="#">
                        ...
                      </a>-->
                      <a-button class="an1" @click>
                        <b style="color:#2d75f0">.</b>
                        <b style="color:red">.</b>
                        <b style="color:#00bd74">.</b>
                      </a-button>
                      <!-- <div class="an1" style="font-size: 26px;cursor: default;">
                     
                      </div>-->
                      <a-menu slot="overlay">
                        <a-menu-item key="0">
                          <div
                            class="b-img1"
                            target="_blank"
                            rel="noopener noreferrer"
                            @click="AddOrCancelAttention(data,data.Construction_Id,2)"
                          >取消关注</div>
                        </a-menu-item>
                        <!-- <a-menu-item key="1">
                        <div class="b-img2" target="_blank" rel="noopener noreferrer">查看记录</div>
                        </a-menu-item>-->
                        <!-- <a-menu-item key="2">
                          <div class="b-img3" target="_blank" rel="noopener noreferrer">单位信息</div>
                        </a-menu-item>-->
                        <a-menu-item key="3">
                          <div
                            class="b-img4"
                            target="_blank"
                            @click="visible=true"
                            rel="noopener noreferrer"
                          >发送通知</div>
                        </a-menu-item>
                        <!-- <a-menu-divider />
                        <a-menu-item key="3" disabled>3rd menu item（disabled）</a-menu-item>-->
                      </a-menu>
                    </a-dropdown>
                  </div>
                </a-table>

                <!-- <table id="table-sparkline">
                  <tbody id="tbody-sparkline">
                    <tr v-for="val in FollowData.Data">
                      <td>
                        <div class="sbsl">
                          <span>超标</span>
                          {{val.ExceedingEquipmentCount}}
                          <span>台</span>
                        </div>
                      </td>
                      <td>
                        <div class="da">{{val.Construction_Name}}</div>
                        <div>设备数量：{{val.EquipmentCount}} | 超标次数：{{val.ExceedingCount}}</div>
                        <div>{{val.Construction_address}}</div>
                      </td>
                      <td>
                        <a-button
                          type="primary"
                          @click="AddOrCancelAttention(val,val.Construction_Id,2)"
                          :size="'large'"
                        >取消关注</a-button>
                      </td>
                    </tr>
                  </tbody>
                </table>-->
              </div>
            </div>
            <div class="lb-body" v-if="buot==='绿色排行'">
              <!-- <span class="phb-text">工地实时数据</span> -->
              <a-table :columns="columns4" :dataSource="data4" :pagination="false">
                <div slot="id" slot-scope="id,data">
                  <a-popover title="单位信息" trigger="hover">
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
                  {{id}}
                </div>
                <div slot="name" slot-scope="name,data">
                  <div
                    :style="'overflow: hidden;  white-space: nowrap; text-overflow: ellipsis;width: 160px;height: 24px;'+ (data.id<=3?'color:#00bd74':'')"
                  >{{name}}</div>
                </div>
                <div slot="TSP" slot-scope="TSP,data">
                  <div title="(mg/m3)">{{TSP}}</div>
                </div>
              </a-table>
            </div>

            <!-- <a-tabs @change>
              <a-tab-pane key="1"></a-tab-pane>
              <a-tab-pane key="2">
               
            </a-tab-pane>-->

            <!-- <a-tab-pane tab="绿色排行" key="3">绿色排行</a-tab-pane> -->
            <!-- </a-tabs> -->
            <!-- <span class="erj erj-ok">超标列表</span>
            <span class="erj">重点关注</span>
            <span class="erj">绿色排行</span>-->
          </div>
        </div>
      </div>
    </div>
    <!-- 设备数量 显示信息 and-->

    <div class="wk">
      <div class="dt">
        <template v-for="(placement, index) in MapPlug_in" v-on:click="onClickDZ(placement)">
          <a-dropdown placement="bottomCenter">
            <a-button :title="placement.type">
              <span
                class="text_red_img"
                :style="'background-position:'+placement.img.x+'px ' +placement.img.y+'px'"
                v-if="index == 0"
              ></span>
              <a-icon class="text_red" v-if="index != 0" :type="placement.icon" />
              {{placement.val}}
              <a-icon class="biao" v-if="!placement.selected" type="down" />
              <a-icon class="biao" v-if="placement.selected" type="up" />
            </a-button>
            <a-menu slot="overlay">
              <a-menu-item v-for="(val,int) in placement.datas" :key="int">
                <a
                  target="_blank"
                  v-on:click="onClickName(val,index,placement)"
                  rel="noopener noreferrer"
                >
                  <!-- {{val.img}} -->
                  <span
                    class="text_red_img"
                    :style="'background-position:'+val.img.x+'px ' +val.img.y+'px'"
                    v-if="index == 0"
                    :title="val.type"
                  ></span>
                  {{val.name}}
                  <span v-if="index == 0">({{val.SumCount}})</span>
                  <a-icon v-if="val.selected" type="check" />
                </a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
        <!-- <div class="dp" @click="$router.push('/BigScreen')">
          <a-icon class="text_red" type="select" />腾讯云图
        </div>-->
      </div>

      <div class="kd" id="allmap" ref="allmap"></div>

      <!-- <div class="lxdz lxdz0" @click="statistical">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        <div>设备数量</div>
      </div>-->
      <div class="lxdz lxdz1">
        <a-icon type="wechat" />
        <div>人工客服</div>
      </div>
      <div class="lxdz lxdz2">
        <a-icon type="phone" />
        <div>联系电话</div>
      </div>
      <div class="lxdz lxdz3">
        <a-icon type="mail" />
        <div>电子邮箱</div>
      </div>

      <div class="bj">
        <span slot="title">
          <a-icon type="environment" theme="twoTone" twoToneColor="rgb(84, 185, 122)" />
          <span>正常</span>
        </span>
        <span slot="title">
          <a-icon type="environment" theme="twoTone" twoToneColor="rgb(215, 52, 75)" />
          <span>超标</span>
        </span>
        <span slot="title">
          <a-icon type="environment" theme="twoTone" twoToneColor="rgb(232, 128, 48)" />
          <span>故障</span>
        </span>
        <span slot="title">
          <a-icon type="environment" theme="twoTone" twoToneColor="rgb(209, 209, 209)" />
          <span>离线</span>
        </span>
      </div>
      <div class="lxdz mb" @click="statistical">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        <div>设备数量</div>
        <!-- <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" /> -->
      </div>
    </div>

    <a-modal title="通知给：前滩40-01地块项目" centered v-model="visible" @ok="handleOk" :bodyStyle="{}">
      <a-textarea placeholder="请输入通知内容" :rows="6" />
      <br />
      <br />
      <a-checkbox @change="onChangeDx">短信通知: 15021345644</a-checkbox>
      <br />
      <a-checkbox @change="onChangeDx">微信推送</a-checkbox>
    </a-modal>

    <a-modal
      title="扬尘趋势图"
      width="90%"
      v-model="visible3"
      @ok="handleOk"
      :okButtonProps="{ style: {display: 'none'} }"
      :cancelButtonProps="{ style: {display: 'none'} }"
      :bodyStyle="{}"
    >
      <div class="xcqst">
        <ul>
          <li>
            <a-row>
              <a-col :span="22" :push="2">
                <a-checkbox-group
                  :options="plainOptions"
                  v-model="checkedList2"
                  @change="onChange2"
                />
              </a-col>
              <a-col :span="2" :pull="22">数据类型</a-col>
            </a-row>
          </li>
          <li>
            <a-row>
              <a-col :span="22" :push="2">
                <a-select defaultValue="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option
                    :key="key"
                    v-for="(val,key) in ZoneDataScreening[County_Id]"
                    :value="val.val"
                  >{{val.name}}</a-select-option>
                </a-select>
              </a-col>
              <a-col :span="2" :pull="22">区域选择</a-col>
            </a-row>
          </li>
          <li>
            <a-row>
              <a-col :span="22" :push="2">
                <!-- <a-checkbox-group
                  :options="plainOptions1"
                  v-model="checkedList1_1"
                  @change="onChange"
                />-->
                <a-radio-group name="radioGroup" :defaultValue="checkedList1_1">
                  <a-radio v-for="(val,i) in plainOptions1" :key="i" :value="val">{{val}}</a-radio>
                </a-radio-group>
              </a-col>
              <a-col :span="2" :pull="22">日期选择</a-col>
            </a-row>
          </li>
          <li>
            <div class="tu-h">
              <x-chart id="highcharts1" class="high" :option="option" ref="option2"></x-chart>
            </div>
          </li>
        </ul>
      </div>
    </a-modal>
  </div>
</template>


<script>
import util from "../../http.utils.js";
import XChart from "@/components/pages/charts/charts";
import NOise from "./Noise";
import TemperatureAndHumidity from "./TemperatureAndHumidity";
import WindSpeedDirection from "./WindSpeedDirection";
import Pressure from "./Pressure";

import HighCharts from "highcharts";
import locationData from "../../../static/js/location";
import "../../App.css";
let interval = null;
var doChunk = function() {};
var markers = []; //设备缓冲
const province = [];
for (let code in locationData) {
  let item = locationData[code];
  province.push(
    Object.assign(item, {
      label: item.name
    })
  );
}
let preIcon = {};

let clickIcon = {};
var direction = function(op, s) {
  if (s <= 0.2) {
    return "静风";
  }
  if (0 <= op >= 11.25 || op >= 348.76) {
    //384.76-11.2.5
    return "北";
  } else if (11.26 <= op >= 33.75) {
    //11.26-33.75
    return "北偏东北";
  } else if (33.76 <= op >= 56.25) {
    //33.76-56.25
    return "东北";
  } else if (56.26 <= op >= 78.75) {
    //56.26-78.75
    return "东偏东北";
  } else if (8.76 <= op >= 101.25) {
    //78.76-101.25
    return "东";
  } else if (101.26 <= op >= 123.75) {
    //101.26-123.75
    return "东偏东南";
  } else if (123.76 <= op >= 146.25) {
    //123.76-146.25
    return "东南";
  } else if (146.26 <= op >= 168.75) {
    //146.26-168.75
    return "南偏东南";
  } else if (168.76 <= op >= 191.25) {
    //168.76-191.25
    return "南";
  } else if (191.26 <= op >= 213.75) {
    //191.26-213.75
    return "南偏西南";
  } else if (213.76 <= op >= 236.25) {
    //213.76-236.25
    return "西南";
  } else if (236.26 <= op >= 258.75) {
    //236.26-258.75
    return "西偏西南";
  } else if (258.76 <= op >= 281.25) {
    //258.76-281.25
    return "西";
  } else if (281.26 <= op >= 303.75) {
    //281.26-303.75
    return "西偏西北";
  } else if (303.76 <= op >= 326.25) {
    //303.76-326.25
    return "西北";
  } else if (326.26 <= op >= 348.75) {
    //326.26-348.75
    return "北偏西北";
  }
};
// let PM2_5 = [], //PM2.5
//   PM10 = [], //PM10
//   TSP = [], //TSP
//   noise = [], //噪音
//   wind_direction = [], //风向
//   wind_speed = [], //风速
//   temperature = [], //温度
//   humidity = []; //湿度
export default {
  name: "HomePage",
  components: {
    XChart,
    NOise,
    TemperatureAndHumidity,
    WindSpeedDirection,
    Pressure
  },
  data() {
    var data = [
      [new Date().getTime() - 300000, 0.43],
      [new Date().getTime() - 240000, 0.42],
      [new Date().getTime() - 180000, 0.39],
      [new Date().getTime() - 120000, 0.361],
      [new Date().getTime() - 60000, 0.419],
      [new Date().getTime(), 0.389]
    ];
    var data2 = [
      [new Date().getTime() - 300000, 0.232],
      [new Date().getTime() - 240000, 0.222],
      [new Date().getTime() - 180000, 0.212],
      [new Date().getTime() - 120000, 0.265],
      [new Date().getTime() - 60000, 0.214],
      [new Date().getTime(), 0.212]
    ];
    var data3 = [
      [new Date().getTime() - 300000, 0.152],
      [new Date().getTime() - 240000, 0.121],
      [new Date().getTime() - 180000, 0.132],
      [new Date().getTime() - 120000, 0.121],
      [new Date().getTime() - 60000, 0.141],
      [new Date().getTime(), 0.211]
    ];

    var columns4 = [
      {
        title: "排行",
        dataIndex: "id",
        scopedSlots: { customRender: "id" },
        width: 60
      },
      {
        title: "名称",
        dataIndex: "name",
        scopedSlots: { customRender: "name" },
        width: 100
      },
      {
        title: "数据均值",
        dataIndex: "TSP",
        scopedSlots: { customRender: "TSP" },
        width: 100
      },
      {
        title: "所在区县",
        dataIndex: "szqx",
        width: 100
      }
    ];
    var data4 = [
      {
        key: 1,
        id: 1,
        name: "伍浦汇E地块迁房项目1",
        TSP: "0.202",
        szqx: "江干区"
      },
      {
        key: 2,
        id: 2,
        name: "伍浦汇E地块迁房项目2",
        TSP: "0.212",
        szqx: "江干区"
      },
      {
        key: 3,
        id: 3,
        name: "伍浦汇E地块迁房项目3",
        TSP: "0.242",
        szqx: "江干区"
      },
      {
        key: 4,
        id: 4,
        name: "伍浦汇E地块迁房项目4",
        TSP: "0.272",
        szqx: "江干区"
      },
      {
        key: 5,
        id: 5,
        name: "伍浦汇E地块迁房项目5",
        TSP: "0.312",
        szqx: "江干区"
      }
    ];

    return {
      plainOptions: ["PM10", "PM2.5", "TSP"],
      checkedList: ["TSP", "PM10", "PM2.5"],
      checkedList2: ["TSP", "PM10", "PM2.5"],
      plainOptions1: ["未来一周", "未来一月", "未来一季"],
      checkedList1_1: "未来一周",
      indeterminate: true,
      checkAll: false,

      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,

      islb: false,
      is_to: true,

      collapsed: true,
      Switch: "1",
      addtest: 1,

      PM2_5: [], //PM2.5
      PM10: [], //PM10
      TSP: [], //TSP
      noise: [], //噪音
      wind_direction: [], //风向
      wind_speed: [], //风速
      temperature: [], //温度
      humidity: [], //湿度
      air_pressure: [], //气压
      intervalData: {},

      equipment_Id: "", //设备ID

      buot: "超标数据",
      EquipmentState: "#fff",

      locationData,
      province,
      firstConstruction_data: {
        //设备数据
        User_Id: 0, //用户ID
        Construction_Id: 0, //工地ID
        Construction_name: "江干区10-11地块项目", //	工地名称
        Construction_type: "建筑工地", //工地项目类型
        Construction_protp: 0, //工地工程类型（1：住宅，2：商场，3：公共设施）
        Porvice_Id: "浙江省", //省
        City_Id: "杭州市", //城市
        County_Id: "江干区", //县区
        Construction_address: "杭州市江干区平安金融中心", //详细地址
        Construction_longitude: 120.2, //经度
        Construction_latitude: 30.2, //纬度
        Construction_person: "摸摸人", //联系人名称
        Construction_tel: "18324447823", //联系人电话
        Construction_Start: "2019-09-06T00:00:00", //施工开始时间
        Construction_end: "2019-09-30T00:00:00", //施工结束时间
        Construction_boss: "茵沃科技", //所属承包商
        Construction_area: 1421.0, //	占地面积
        Construction_stage: 0, //施工阶段（1：筹备中，2：施工中，2:施工完结）
        Construction_mv: "", //工地视频
        Construction_picture: "" //工地图片
      },
      HomeEquipment: [], //设备
      toSumCount: 0,
      SumCount: 0, //设备数量
      OutlineCount: 0, //离线设备
      OnlineCount: 0, //在线设备
      NormalCount: 0, //正常设备
      TroubleCount: 0, //故障设备
      ExceedingCount: 0, //超标设备
      RepairCount: 0, //维修设备
      MigrationCount: 0, //迁移设备
      ScrapCount: 0, //报废设备

      columns4,
      data4,
      // displayEquipment: 0,
      //       Construction_Id: 19
      // Construction_Name: "平安金融中心"
      // Construction_address: "杭州市江干区平安金融中心"
      // Construction_latitude: 30.211
      // Construction_longitude: 120.2123
      // EquipmentCount: 0
      // ExceedingCount: 0
      // ExceedingEquipmentCount: 0
      // IsAttention: 1
      ExceedingEquipmentColumns: [
        {
          dataIndex: "Construction_Name",
          title: "名称",
          // width: 120,
          scopedSlots: { customRender: "Construction_Name" }
        },
        {
          dataIndex: "type",
          title: "状态",
          // width: 120,
          scopedSlots: { customRender: "type" }
        },
        {
          dataIndex: "TSPAVG",
          title: "超标均值"
          // width: 80,
          // scopedSlots: { customRender: "TSPAVG" }
        },
        {
          dataIndex: "cz",
          title: "操作",
          scopedSlots: { customRender: "cz" }
        }
      ],
      ExceedingEquipment: [], //超标数据
      ExceedingEquipmentTotalCount: 0, //超标数量
      ExceedingEquipments: [], //全部超标数据
      ExceedingEquipmentPageno: 1,
      ExceedingEquipmentPagesize: 10,

      FollowData: [], //重点关注列表

      information: false, //显示信息

      informationData: {
        name: "前滩40-01地块项目"
      },
      kg: false,
      hackReset: false,
      cities: {},
      County_Id: "",
      recordType_type: "0",
      constructionType_name: "",
      regionName: "",
      MapPlug_in: [
        {
          val: "",
          icon: "filter",
          selected: false,
          type: "1",
          img: {},
          datas: [
            // { name: "杭州市", County_Id:0, selected: true, type: "", img: {} },
            // { name: "上海市", selected: false, type: "", img: {} },
            // { name: "北京市", selected: false, type: "", img: {} },
            // { name: "青铜峡", selected: false, type: "", img: {} },
            // { name: "滨江区", selected: false, type: "", img: {} },
            // { name: "余杭区", selected: false, type: "", img: {} },
            // { name: "于洪区", selected: false, type: "", img: {} },
            // { name: "哈尔滨", selected: false, type: "", img: {} }
          ]
        },
        {
          val: "不限", //设备筛选
          icon: "filter",
          selected: false,
          datas: [
            { name: "不限", selected: true },
            { name: "超标", selected: false },
            { name: "离线", selected: false },
            { name: "超标", selected: false }
          ]
        },
        {
          val: "场景选择", //场景选择
          icon: "select",
          selected: false,
          cities: {},
          datas: [
            { name: "全部", selected: true }
            // { name: "堆场码头", selected: false },
            // { name: "混凝土场地", selected: false },
            // { name: "搅拌场", selected: false }
          ]
        }
      ],
      ZoneDataScreening: {},
      map: null,
      Lo: 0,

      option_city: {},
      optionData: {},
      option: {
        chart: {
          type: "areaspline" //spline
          // events:{
          //    click: function(e) {
          //         //这个函数里边就是编写事件的逻辑

          //       }
          // }
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
            millisecond: "%H:%M:%S.%L",
            second: "%H:%M:%S",
            minute: "%H:%M",
            hour: "%H:%M",
            day: "%e. %b",
            week: "%e. %b",
            month: "%b '%y",
            year: "%Y"
          }
          // categories:[]
        },
        // tooltip: {
        //   dateTimeLabelFormats: {
        //     millisecond: "%H:%M:"
        //   }
        // },
        yAxis: {
          title: {
            text: "颗粒物(mg/m3)",
            rotation: 0,
            align: "high",
            x: 30,
            margin: -90
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
            },
            series: {
              pointStart: Date.UTC(2019, 10, 18),
              pointInterval: 36e5
            }
            // point: {
            //   events: {
            //     click: function(e) {
            //       //这个函数里边就是编写事件的逻辑

            //     }
            //   }
            // }
          }
          // threshold: null
        },
        tooltip: {
          // head + 每个 point + footer 拼接成完整的 table
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
            data: data
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
              stops: [[0, "#007eff"], [1, "#7ecef1"]]
            },
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
          }
        ]
      },
      option4: {
        title: {
          text: ""
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.y}台</b>"
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.y} 台",
              // style: {
              //   color: "rgb(221 242 243)"
              // },
              connectorColor: "silver"
            }
          }
        },
        series: [
          {
            type: "pie",
            name: "设备数量",
            data: []
          }
        ]
      },
      option4s: [],
      User_Id: 0
    };
  },
  methods: {
    GetConstructionAndCity() {
      var _this = this;
      new util._httpData(
        this,
        "Construction/GetConstructionAndCity",
        {}
      ).then = function() {
        if (this.state) {
          var DataList = this.datas;
          var locationData = _this.locationData;
          if (DataList[0]) {
            _this.toSumCount = DataList[0].SumCount;
            _this.SumCount = DataList[0].SumCount;
            _this.OutlineCount = DataList[0].OutlineCount;
            _this.OnlineCount = DataList[0].OnlineCount;
            _this.NormalCount = DataList[0].NormalCount;
            _this.TroubleCount = DataList[0].TroubleCount;
            _this.ExceedingCount = DataList[0].ExceedingCount;
            _this.RepairCount = DataList[0].RepairCount;
            _this.MigrationCount = DataList[0].MigrationCount;
            _this.ScrapCount = DataList[0].ScrapCount;
          }

          // MapPlug_in
          DataList.map((_d, key) => {
            var cityName = "";
            var cities = {};
            var data = {
              name: _d.City_Id,
              County_Id: _d.City_Id,
              SumCount: _d.SumCount,
              OutlineCount: _d.OutlineCount,
              OnlineCount: _d.OnlineCount,
              NormalCount: _d.NormalCount,
              TroubleCount: _d.TroubleCount,
              ExceedingCount: _d.ExceedingCount,
              RepairCount: _d.RepairCount,
              MigrationCount: _d.MigrationCount,
              ScrapCount: _d.ScrapCount,
              type: "",
              img: {}
            };

            // SumCount: 0, //设备数量
            // OutlineCount: 0, //离线设备
            // OnlineCount: 0, //在线设备
            // NormalCount: 0, //正常设备
            // TroubleCount: 0, //故障设备
            // ExceedingCount: 0, //超标设备
            // RepairCount: 0, //维修设备
            // MigrationCount: 0, //迁移设备
            // ScrapCount: 0, //报废设备

            var isdatas = false;
            if (_this.MapPlug_in[2].datas.length === 0) {
              isdatas = true;
            }

            _d.listCity.map((val, key) => {
              if (!_this.ZoneDataScreening[_d.City_Id]) {
                _this.ZoneDataScreening[_d.City_Id] = [];
              }
              _this.ZoneDataScreening[_d.City_Id].push({
                val: val.County_Id,
                name: val.County_Id,
                SumCount: val.SumCount,
                OutlineCount: val.OutlineCount,
                OnlineCount: val.OnlineCount,
                TroubleCount: val.TroubleCount
              });
            });

            _d.listConstruction.map((val, key) => {
              if (!_this.MapPlug_in[2].cities[_d.City_Id]) {
                _this.MapPlug_in[2].cities[_d.City_Id] = [
                  {
                    name: "全部",
                    selected: true
                  }
                ];
              }
              _this.MapPlug_in[2].cities[_d.City_Id].push({
                name: val.Construction_type,
                SumCount: val.SumCount,
                OutlineCount: val.OutlineCount,
                OnlineCount: val.OnlineCount,
                TroubleCount: val.TroubleCount,
                selected: false
              });
            });

            if (_this.MapPlug_in[0].datas.length === 0) {
              _this.MapPlug_in[0].val = _d.City_Id;
              _this.MapPlug_in[0].datas.push({
                selected: true,
                ...data
              });

              _this.County_Id = _d.City_Id;
            } else {
              _this.MapPlug_in[0].datas.push({
                selected: false,
                ...data
              });
            }
          });
          // IsOnLine: 0， //是否在线
          // SumCount: 0, //设备数量
          // OutlineCount: 0, //离线设备
          // OnlineCount: 0, //在线设备
          // NormalCount: 0, //正常设备
          // TroubleCount: 0, //故障设备
          // ExceedingCount: 0, //超标设备
          // RepairCount: 0, //维修设备
          // MigrationCount: 0, //迁移设备
          // ScrapCount: 0, //报废设备

          _this.onClickName({ name: "" }, 3, _this.ZoneDataScreening);
          _this.Meteorological();

          // _this.$message.success(this.message, 4);
        } else {
          _this.$message.console.error(this.message, 4);
        }
      };

      // _this.Meteorological();
    },
    onClickType() {
      data = [];
    },
    onChange1(checkedList) {
      this.option.series[0].data = this.TSP;
      this.option.series[1].data = this.PM10;
      this.option.series[2].data = this.PM2_5;
      try {
        var seriesData = this.option.series;
        if (this.$refs.option1) {
          var series = this.$refs.option1.chart.series;
          for (var key in seriesData) {
            if (series[0]) series[0].remove(false);
          }
        }
        var chart = this.$refs.option1.chart;

        for (var key in seriesData) {
          for (var k in checkedList) {
            if (seriesData[key].name === checkedList[k]) {
              chart.addSeries(seriesData[key]);
              break;
            }
          }
        }
        chart.redraw();
      } catch (err) {}

      this.indeterminate =
        !!checkedList.length && checkedList.length < this.plainOptions.length;
      this.checkAll = checkedList.length === this.plainOptions.length;
    },
    onChange2(checkedList) {
      try {
        var seriesData = this.option.series;
        if (this.$refs.option2) {
          var series = this.$refs.option2.chart.series;
          for (var key in seriesData) {
            if (series[0]) series[0].remove(false);
          }
        }
        var chart = this.$refs.option2.chart;
        for (var key in seriesData) {
          for (var k in checkedList) {
            if (seriesData[key].name === checkedList[k]) {
              chart.addSeries(seriesData[key]);
              break;
            }
          }
        }
        chart.redraw();
      } catch (err) {}
      this.indeterminate =
        !!checkedList.length && checkedList.length < this.plainOptions.length;
      this.checkAll = checkedList.length === this.plainOptions.length;
    },

    onChange(checkedList) {
      this.indeterminate =
        !!checkedList.length && checkedList.length < this.plainOptions.length;
      this.checkAll = checkedList.length === this.plainOptions.length;
    },
    onClickDZ(item) {
      item.selected = !item.selected;
    },
    onClickName(val, type, item) {
      // var map = this.map;
      console.log(val);

      switch (type) {
        case 0:
          item.datas.map((_d, key) => {
            _d.selected = false;
          });
          item.val = val.name;
          item.type = val.type;
          item.img = val.img;
          this.MapPlug_in[2].datas = this.MapPlug_in[2].cities[val.County_Id];
          this.County_Id = val.County_Id;
          this.SumCount = val.SumCount;
          this.OutlineCount = val.OutlineCount;
          this.OnlineCount = val.OnlineCount;
          this.NormalCount = val.NormalCount;
          this.TroubleCount = val.TroubleCount;
          this.ExceedingCount = val.ExceedingCount;
          this.RepairCount = val.RepairCount;
          this.MigrationCount = val.MigrationCount;
          this.ScrapCount = val.ScrapCount;

          var option0 = JSON.parse(JSON.stringify(this.option4)),
            option1 = JSON.parse(JSON.stringify(this.option4)),
            option2 = JSON.parse(JSON.stringify(this.option4)),
            option3 = JSON.parse(JSON.stringify(this.option4));

          this.ZoneDataScreening[val.name].map(val => {
            option0.series[0].data.push([val.name, val.SumCount]);
            option1.series[0].data.push([val.name, val.OnlineCount]);
            option2.series[0].data.push([val.name, val.OutlineCount]);
            option3.series[0].data.push([val.name, val.TroubleCount]);
          });
          this.option4s[0] = option0;
          this.option4s[1] = option1;
          this.option4s[2] = option2;
          this.option4s[3] = option3;

          this.AddEquipment();
          this.getExceedingEquipment("");
          break;
        case 1:
          item.datas.map((_d, key) => {
            _d.selected = false;
          });
          item.val = val.name;
          item.type = val.type;

          switch (val.name) {
            case "超标":
              this.recordType_type = "3";
              break;
            case "离线":
              this.recordType_type = "4";
              break;
            default:
              this.recordType_type = "0";
              break;
          }
          this.AddEquipment();
          this.getExceedingEquipment("");

          break;
        case 2:
          item.datas.map((_d, key) => {
            _d.selected = false;
          });
          item.val = val.name;
          item.type = val.type;
          if (val.name === "全部") {
            this.constructionType_name = "";
          } else {
            this.constructionType_name = val.name;
          }
          this.AddEquipment();
          this.getExceedingEquipment("");

          break;
        case 3:
          this.regionName = val.name;
          // setTimeout(this.getExceedingEquipment(val.name),1000)
          // this.getExceedingEquipment(
          //   val.name,
          //   this.ExceedingEquipmentPageno,
          //   this.ExceedingEquipmentPagesize
          // );
          break;
      }

      val.selected = true;
    },
    //获取设备所在工地详情
    firstConstruction(construction_Id) {
      var _this = this;
      new util._httpData(this, "Construction/FirstConstruction", {
        construction_Id: construction_Id
      }).then = function() {
        if (this.state) {
          _this.firstConstruction_data = this.data;
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    //获取当前设备数据
    GetEquipmentData(equipment_Id) {
      var _this = this;
      new util._httpData(this, "Construction/GetEquipmentData", {
        equipment_Id: equipment_Id,
        hour: 1
      }).then = function() {
        if (this.state) {
          var listData = this.datas;
          var PM2_5 = []; //PM2.5
          var PM10 = []; //PM10
          var TSP = []; //TSP
          var noise = []; //噪音
          var wind_direction = []; //风向
          var wind_speed = []; //风速
          var temperature = []; //温度
          var humidity = []; //湿度
          var air_pressure = []; //气压
          var dateTime = null;
          var d = new Date();

          listData.map((_d, key) => {
            dateTime = new Date(
              _d.Time.replace(
                /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
                "$1-$2-$3 $4:$5:$6"
              )
            ).getTime();

            PM2_5.push([dateTime, parseFloat(_d.PM2_5)]);
            PM10.push([dateTime, parseFloat(_d.PM10)]);
            TSP.push([dateTime, parseFloat(_d.TSP)]);
            noise.push([dateTime, parseFloat(_d.noise)]);
            wind_direction.push([
              parseFloat(_d.wind_speed),
              parseFloat(_d.wind_direction)
            ]);
            wind_speed.push([
              parseFloat(_d.wind_speed),
              parseFloat(_d.wind_direction)
            ]);
            temperature.push([dateTime, parseFloat(_d.temperature)]);
            humidity.push([dateTime, parseFloat(_d.humidity)]);
            air_pressure.push([dateTime, parseFloat(_d.air_pressure)]);
          });

          _this.PM2_5 = PM2_5; //PM2.5
          _this.PM10 = PM10; //PM10
          _this.TSP = TSP; //TSP
          _this.noise = noise; //噪音
          _this.wind_direction = wind_direction; //风向
          _this.wind_speed = wind_speed; //风速
          _this.temperature = temperature; //温度
          _this.humidity = humidity; //湿度
          _this.air_pressure = air_pressure; //气压

          // _this.$refs.option1.chart.series[0].setData(TSP, true, false, false);
          // _this.$refs.option1.chart.series[1].setData(PM10, true, false, false);
          // _this.$refs.option1.chart.series[2].setData(
          //   PM2_5,
          //   true,
          //   false,
          //   false
          // );
          var Series = _this.$refs.option1.chart;
          if (Series) {
            Series.series.map((_d, i) => {
              if (_d.name === "TSP") {
                _d.setData(TSP, true, false, false);
              } else if (_d.name === "PM10") {
                _d.setData(PM10, true, false, false);
              } else if (_d.name === "PM2.5") {
                _d.setData(PM2_5, true, false, false);
              }
            });
          }

          _this.option.series[0].data = _this.TSP;
          _this.option.series[1].data = _this.PM10;
          _this.option.series[2].data = _this.PM2_5;

          // setTimeout(()=>{
          //      _this.$refs.oise.series
          //       _this.$refs.TemperatureAndHumidity.series
          //       _this.$refs.WindSpeedDirection.series
          // },0)
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    onSwitch(k) {
      this.Switch = k;
    },
    handleOk(_d) {},
    doChunk(val) {
      val += "highcharts";
      // series.addPoint(data, true, false);
      let _this = this;
      setTimeout(function() {
        if (_this.$refs[val]) {
          // var series = this.$refs.option_2.chart.series[0];
          var chart = _this.$refs[val].chart;
          // chart.update({

          // })
        }
      }, 100);
    },
    FirstEquipmentData(equipment_Id, e,isInfo) {
      var _this = this;
      new util._httpData(_this, "Construction/FirstEquipmentData", {
        equipment_Id: equipment_Id
      }).then = function() {
        if (this.state) {
          _this.intervalData = this.data.minutedata ? this.data.minutedata : {};

          if (_this.PM2_5.length >= 60) {
            _this.PM2_5.shift(); //PM2.5
            _this.PM10.shift(); //PM10
            _this.TSP.shift(); //TSP
            _this.noise.shift(); //噪音
            _this.wind_direction.shift(); //风向
            _this.wind_speed.shift(); //风速
            _this.temperature.shift(); //温度
            _this.humidity.shift(); //湿度
          }
          e.EquipmentData = this.data.minutedata ? this.data.minutedata : {};
          var dateTime = 0;
          if (e.EquipmentData.Time) {
            dateTime = new Date(
              e.EquipmentData.Time.replace(
                /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
                "$1-$2-$3 $4:$5:$6"
              )
            ).getTime();
          }
          var PM2_5 = parseFloat(_this.intervalData.PM2_5);
          var PM10 = parseFloat(_this.intervalData.PM10);
          var TSP = parseFloat(_this.intervalData.TSP);
          var noise = parseFloat(_this.intervalData.noise);
          var wind_direction = parseFloat(_this.intervalData.wind_direction);
          var wind_speed = parseFloat(_this.intervalData.wind_speed);
          var temperature = parseFloat(_this.intervalData.temperature);
          var humidity = parseFloat(_this.intervalData.humidity);

          _this.PM2_5.push([dateTime, PM2_5]); //PM2.5
          _this.PM10.push([dateTime, PM10]); //PM10
          _this.TSP.push([dateTime, TSP]); //TSP
          _this.noise.push([dateTime, noise]); //噪音
          _this.wind_direction.push([wind_speed, wind_direction]); //风向
          _this.wind_speed.push([wind_speed, wind_direction]); //风速
          _this.temperature.push([dateTime, temperature]); //温度
          _this.humidity.push([dateTime, humidity]); //湿度

          // _this.IsExceedingTSP = _this.intervalData.IsExceedingTSP
          e.color = TSP >= 500 ? "#ea1446" : e.color;
          e.target.type = TSP >= 500 ? 3 : e.target.type
          if (e.Selection) {
            e.target.setIcon(clickIcon[e.target.type]);
          } else {
            e.target.setIcon(preIcon[e.target.type]);
          }
          if(isInfo) return false;
          if (_this.$refs.option1) {
            var Series = _this.$refs.option1.chart;

            Series.series.map((_d, i) => {
              if (_d.name === "TSP") {
                _d.addPoint([dateTime, TSP], true, true);
              } else if (_d.name === "PM10") {
                _d.addPoint([dateTime, PM10], true, true);
              } else if (_d.name === "PM2.5") {
                _d.addPoint([dateTime, PM2_5], true, true);
              }
            });
          }

          if (_this.$refs.oise) {
            var SeriesNoise = _this.$refs.oise._chart.chart.series[0];
            SeriesNoise.addPoint([dateTime, noise], true, true);
          } else if (_this.$refs.TemperatureAndHumidity) {
            var SeriesTemperature = _this.$refs.TemperatureAndHumidity.series;
            var Series2Humidity = _this.$refs.TemperatureAndHumidity.series2;

            SeriesTemperature.addPoint([dateTime, temperature], true, true);
            Series2Humidity.addPoint([dateTime, humidity], true, true);
          } else if (_this.$refs.WindSpeedDirection) {
            // _this.$refs.WindSpeedDirection.series;

            var SeriesWind_direction = _this.$refs.WindSpeedDirection.series;
            var Series2Wind_speed = _this.$refs.WindSpeedDirection.series2;

            SeriesWind_direction.addPoint(
              [wind_speed, wind_direction],
              true,
              true
            );
            Series2Wind_speed.addPoint(
              [wind_speed, wind_direction],
              true,
              true
            );
          }

          e.infoWindow.close();
          e.markerClick(e);
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    //超标工地
    getExceedingEquipment(county_Id) {
      var _this = this;
      new util._httpData(this, "Construction/GetExceedingConstruction", {
        city_Id: this.County_Id,
        county_Id: county_Id,
        recordType_type: this.recordType_type,
        constructionType_name: this.constructionType_name,
        pageno: 1,
        pagesize: 10
      }).then = function() {
        if (this.state) {
          _this.ExceedingEquipment = this.data.Data.listExceedingConstruction;

          var deleteDataList = function(list) {
            for (var key in list) {
              if (list[key].exceedingEquipmentList.length === 0) {
                list.splice(key, 1);
                deleteDataList(list);
                break;
              } else {
                for (var i in list[key].exceedingEquipmentList) {
                  if (
                    list[key].exceedingEquipmentList[i].dataList.length === 0
                  ) {
                    list.splice(key, 1);
                    deleteDataList(list);
                    break;
                  }
                }
              }
            }
          };
          deleteDataList(_this.ExceedingEquipment);

          for (var key in _this.ExceedingEquipment) {
            _this.ExceedingEquipment[key].key = key;
          }
          _this.ExceedingEquipmentTotalCount = this.data.TotalCount;
          var dataListCounty = this.data.Data.listCounty;
          var datalist = _this.ZoneDataScreening[_this.County_Id];
          for (var i = 0; i < datalist.length; i++) {
            for (var l = 0; l < dataListCounty.length; l++) {
              if (datalist[i].name === dataListCounty[l].County_Id) {
                datalist[i].SumCounts = dataListCounty[l].ExceedingCount;

                break;
              }
            }
            setTimeout(doChunk, 100);
          }
          // setTimeout(doChunk, 100);
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    //超标工地分页
    getExceedingEquipments(
      county_Id,
      ExceedingEquipmentPageno,
      ExceedingEquipmentPagesize
    ) {
      var _this = this;
      this.visible1 = true;
      new util._httpData(this, "Construction/GetExceedingConstruction", {
        city_Id: this.County_Id,
        county_Id: county_Id,
        pageno: ExceedingEquipmentPageno,
        pagesize: ExceedingEquipmentPagesize
      }).then = function() {
        if (this.state) {
          _this.ExceedingEquipmentPageno = this.data.TotalPage;
          // _this.ExceedingEquipmentPagesize = this.data.TotalCount;
          _this.ExceedingEquipments = this.data.Data;
          // setTimeout(doChunk, 100);
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    //重点关注
    pageAttention() {
      var _this = this;
      util._httpData(this, "Construction/PageAttention", {
        user_Id: this.User_Id,
        pageno: 1,
        pagesize: 10
      }).then = function() {
        if (this.state) {
          _this.FollowData = this.data;
          _this.FollowData.Data.map((_d, i) => {
            _d.key = i;
          });
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },

    onChangeDx(e) {
      console.log(`checked = ${e.target.checked}`);
    },
    handleChange(value) {
      if (value === "") {
        this.toSumCount = this.SumCount.toString();
      } else {
        this.toSumCount = value.toString();
      }

      // console.log(`selected ${value}`);
    },
    Meteorological() {
      let _this = this;
      var imgToXY = function(type) {
        var x = 0,
          y = 0;
        switch (type) {
          case "晴":
            x = 0;
            y = -30;
            break;
          case "雷阵雨转晴":
            x = 0;
            y = -60;
            break;
          case "小雪":
            x = 0;
            y = -90;
            break;
          case "冰雹":
            x = 0;
            y = -120;
            break;
          case "雷阵雨":
            x = -0;
            y = -150;
            break;
          case "阴":
            x = -30;
            y = -30;
            break;
          case "小雨":
            x = -30;
            y = -60;
            break;
          case "中雪":
            x = -30;
            y = -90;
            break;
          case "沙尘暴":
            x = -30;
            y = -120;
            break;
          case "中雨转晴":
            x = -30;
            y = -150;
            break;
          case "多云":
            x = -60;
            y = -30;
            break;
          case "阵雨":
            x = -60;
            y = -60;
            break;
          case "雨夹雪":
            x = -60;
            y = -90;
            break;
          case "雾霾":
            x = -60;
            y = -120;
            break;
          case "夜晚多云":
            x = -60;
            y = -150;
            break;
          case "多云转晴":
            x = -90;
            y = -30;
            break;
          case "大雨":
            x = -90;
            y = -60;
            break;
          case "夜晚":
            x = -90;
            y = -90;
            break;
          case "雨加冰雹":
            x = -90;
            y = -120;
            break;
          case "霜降":
            x = -90;
            y = -150;
            break;
        }
        return { x: x.toString(), y: y.toString() };
      };

      this.MapPlug_in[0].datas.map((_d, key) => {
        util.Meteorological(_d.name, json => {
          var data = JSON.parse(json).data;
          if (data && data.forecast) {
            _d.type = data.forecast[0].type;
            _d.img = imgToXY(_d.type);
            if (_d.selected) {
              _this.MapPlug_in[0].type = data.forecast[0].type;
              _this.MapPlug_in[0].img = imgToXY(data.forecast[0].type);
            }
          }
        });
      });

      this.onClickName(this.MapPlug_in[0].datas[0], 0, this.MapPlug_in[0]);
    },
    AddEquipment() {
      var map = this.map;
      // console.log(Lo);
      //实例化信息窗体 测试
      var title =
        '方恒假日酒店<span style="font-size:11px;color:#F00;">价格:318</span>';

      //关闭信息窗体
      function closeInfoWindow() {
        infoWindow.close();
      }
      //构建自定义信息窗体
      function createInfoWindow(title, content, e) {
        var info = document.createElement("div");
        info.className = "custom-info input-card";

        //info.style.width = "400px";
        // 定义顶部标题
        var top = document.createElement("div");
        var titleD = document.createElement("div");
        top.className = "info-top";
        titleD.innerHTML = title;
        titleD.onclick = function() {
          _this.collapsed = false;
          $(_this.$refs.tcxx).hide(1000);
          $(_this.$refs.tcxx1).show(1000);
          _this.GetEquipmentData(e.equipment_Id);
        };

        top.appendChild(titleD);
        info.appendChild(top);

        // 定义中部内容
        var middle = document.createElement("div");
        middle.className = "info-middle";
        middle.style.backgroundColor = "white";
        middle.innerHTML = content;
        info.appendChild(middle);

        // 定义底部内容
        var bottom = document.createElement("div");
        bottom.className = "info-bottom";
        bottom.style.position = "relative";
        bottom.style.top = "0px";
        bottom.style.margin = "0 auto";
        info.appendChild(bottom);

        return info;
      }
      if (!map) {
        // setTimeout(this.AddEquipment(Lo), 1000);
      } else {
        var _this = this;
        var dataMarker = null;
        var infoWindow = new AMap.InfoWindow({
          // anchor: "bottom-center",
          isCustom: true,
          offset: new AMap.Pixel(3, -38)
        });
        function markerClick(e) {
          // infoWindow.setContent(e.target.content);
          document.body.style.setProperty("--newsMapboxColor", e.color);
          e.EquipmentData.PM2_5;

          var content = [];
          //EquipmentData
          //IsExceedingTSP
          //

          content.push(
            "<div>PM10：" +
              (e.EquipmentData.PM10 ? e.EquipmentData.PM10 : "-") +
              " (mg/m3)</div>"
          );
          content.push(
            "<div>PM2.5：" +
              (e.EquipmentData.PM2_5 ? e.EquipmentData.PM2_5 : "-") +
              " (mg/m3)</div>"
          );
          content.push(
            "<div>TSP： " +
              (e.EquipmentData.TSP
                ? "<span " +
                  (e.EquipmentData.IsExceedingTSP == 1
                    ? "style='color:red'"
                    : "") +
                  "> " +
                  e.EquipmentData.TSP +
                  "</span>"
                : "-") +
              " (mg/m3)</div>"
          );
          content.push(
            "<div>噪声： " +
              (e.EquipmentData.noise ? e.EquipmentData.noise : "-") +
              " (dB)</div>"
          );
          content.push(
            "<div>温度： " +
              (e.EquipmentData.temperature
                ? e.EquipmentData.temperature
                : "-") +
              " (℃)</div>"
          );
          content.push(
            "<div>湿度： " +
              (e.EquipmentData.humidity ? e.EquipmentData.humidity : "-") +
              " (%)</div>"
          );
          content.push(
            "<div>风速： " +
              (e.EquipmentData.wind_speed ? e.EquipmentData.wind_speed : "-") +
              " (m/s)</div>"
          );

          content.push(
            "<div>风向： " +
              (e.EquipmentData.wind_direction
                ? direction(
                    parseFloat(e.EquipmentData.wind_direction),
                    parseFloat(e.EquipmentData.wind_speed)
                  )
                : "-") +
              "</div>"
          );

          content.push(
            "<div>气压： " +
              (e.EquipmentData.air_pressure
                ? e.EquipmentData.air_pressure
                : "-") +
              " (kPa)</div>"
          );
          // content.push("<dd>工地名称： " + e.Construction_name + "</dd>");
          // style='color:red'
          infoWindow.setContent(
            createInfoWindow(e.target.content, content.join(""), e)
          );

          infoWindow.open(map, e.target.getPosition());
        }

        new util._httpData(this, "Construction/GetHomeEquipment", {
          city_Id: _this.County_Id,
          recordType_type: _this.recordType_type,
          constructionType_name: _this.constructionType_name
        }).then = function() {
          if (this.state) {
            _this.HomeEquipment = this.datas; //设备数据

            // _this.displayEquipment = this.data.SumCount;
            preIcon = {
              1: new AMap.Icon({
                image: "../../static/img/BJ_1.png",
                size: new AMap.Size(32, 38), //图标大小
                imageSize: new AMap.Size(32, 38),
                color: "#00bd74",
                type: "正常"
              }),
              2: new AMap.Icon({
                image: "../../static/img/BJ_2.png",
                size: new AMap.Size(32, 38), //图标大小
                imageSize: new AMap.Size(32, 38),
                color: "#f77a00",
                type: "故障"
              }),
              3: new AMap.Icon({
                image: "../../static/img/BJ_3.png",
                size: new AMap.Size(32, 38), //图标大小
                imageSize: new AMap.Size(32, 38),
                color: "#ea1446",
                type: "超标"
              }),
              4: new AMap.Icon({
                image: "../../static/img/BJ_4.png",
                size: new AMap.Size(32, 38), //图标大小
                imageSize: new AMap.Size(32, 38),
                color: "#959595",
                type: "离线"
              })
            };

            clickIcon = {
              1: new AMap.Icon({
                image: "../../static/img/BJ^_1.png",
                size: new AMap.Size(32, 38), //图标大小
                imageSize: new AMap.Size(32, 38),
                color: "#00bd74",
                type: "正常"
              }),
              2: new AMap.Icon({
                image: "../../static/img/BJ^_2.png",
                size: new AMap.Size(32, 38), //图标大小
                imageSize: new AMap.Size(32, 38),
                color: "#f77a00",
                type: "故障"
              }),
              3: new AMap.Icon({
                image: "../../static/img/BJ^_3.png",
                size: new AMap.Size(32, 38), //图标大小
                imageSize: new AMap.Size(32, 38),
                color: "#ea1446",
                type: "超标"
              }),
              4: new AMap.Icon({
                image: "../../static/img/BJ^_4.png",
                size: new AMap.Size(32, 38), //图标大小
                imageSize: new AMap.Size(32, 38),
                color: "#959595",
                type: "离线"
              })
            };
            var lnglats = this.datas;

            map.remove(markers);
            for (var i = 0, marker; i < lnglats.length; i++) {
              var marker = new AMap.Marker({
                position: [
                  lnglats[i].equipment_Longitude,
                  lnglats[i].equipment_Latitude
                ],
                icon:
                  preIcon[lnglats[i].IsOnLine ? lnglats[i].RecordType_type : 4],
                map: map
              });
              markers.push(marker);

              marker.type = lnglats[i].IsOnLine
                ? lnglats[i].RecordType_type
                : 4;
              marker.IsOnLine = lnglats[i].IsOnLine;
              marker.content = lnglats[i].Construction_name;
              marker.equipment_name = lnglats[i].equipment_name;
              // marker.Construction_name = lnglats[i].Construction_name;
              marker.equipment_Id = lnglats[i].equipment_Id;
              marker.construction_Id = lnglats[i].Construction_Id;
              // marker.on("mouseover", markerClick);
              // marker.on("mouseout", function() {
              //   infoWindow.close();
              // });
              // marker.emit('click', {target: marker});
              marker.on("click", function(e) {
                infoWindow.close();
                e.color = this.IsOnLine
                  ? clickIcon[this.type].B.color
                  : clickIcon[4].B.color;
                e.Construction_name = this.Construction_name;
                e.equipment_Id = this.equipment_Id;
                e.markerClick = markerClick;
                e.infoWindow = infoWindow;
                e.EquipmentData = {};

                _this.firstConstruction(this.construction_Id);
                //心跳获取设备实时数据 60秒
                clearInterval(interval);
                _this.FirstEquipmentData(e.equipment_Id, e);
                interval = setInterval(() => {
                  _this.FirstEquipmentData(e.equipment_Id, e);
                }, 60000);
                _this.equipment_Id = e.equipment_Id + "";

                // new util._httpData(_this, "Construction/FirstEquipmentData", {
                //   equipment_Id: e.equipment_Id
                // }).then = function() {
                //   if (this.state) {
                //     if (this.data) {
                //       e.EquipmentData = this.data;
                //     }
                //     // else {
                //     //   e.EquipmentData = {
                //     //     PM2_5: null,
                //     //     PM10: null,
                //     //     TSP: null,
                //     //     noise: null,
                //     //     wind_direction: null,
                //     //     wind_speed: null,
                //     //     temperature: null,
                //     //     humidity: null
                //     //   };
                //     // }

                //     markerClick(e);
                //   } else {
                //     _this.$message.error(this.message, 4);
                //   }
                // };
                markerClick(e);

                if (dataMarker) {
                  dataMarker.target.setIcon(preIcon[dataMarker.target.type]);
                  dataMarker.Selection = false;
                }

                e.target.setIcon(clickIcon[this.type]);
                e.Selection = true;
                dataMarker = e;
                // _this.information = true; //显示设备数据
                _this.informationData.name = this.equipment_name;

                $(_this.$refs.tcxx).hide(1000);
                // $(_this.$refs.tcxx1).show(1000);

                _this.collapsed = false;
              });
              _this.FirstEquipmentData(marker.equipment_Id,{target:marker},true);
              // map.setFitView();
            }
            map.on("click", function(e) {
              infoWindow.close();
              $(_this.$refs.tcxx1).hide(1000);
              clearInterval(interval);
            });

            map.setFitView();
            // _this.$message.success("自动保存成功", 4);
          } else {
            _this.$message.error(this.message, 4);
          }
        };
      }
    },
    statistical() {
      if (this.collapsed) {
        $(this.$refs.tcxx).hide(1000);
        this.collapsed = !this.collapsed;
      } else {
        $(this.$refs.tcxx).show(1000);
        this.collapsed = !this.collapsed;
      }
      $(this.$refs.tcxx1).hide(1000);
    },
    deviceInformation() {
      $(this.$refs.tcxx1).hide(1000);
    },
    InPercentage(num, total) {
      return InPercentage(num, total);
    },
    islbXq() {
      if (this.islb) {
        $(this.$refs.lbXq).hide(1000);
        this.islb = false;
      } else {
        $(this.$refs.lbXq).show(1000);
        this.islb = true;
      }
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
            _this.pageAttention();
          }

          _this.$message.success(this.message, 4);
        } else {
          _this.$message.error(this.message, 4);
        }
      };
    },
    CityAverage() {
      var data = [
        [new Date().getTime() - 300000, 0.43],
        [new Date().getTime() - 240000, 0.42],
        [new Date().getTime() - 180000, 0.39],
        [new Date().getTime() - 120000, 0.361],
        [new Date().getTime() - 60000, 0.419],
        [new Date().getTime(), 0.389]
      ];
      var data2 = [
        [new Date().getTime() - 300000, 64],
        [new Date().getTime() - 240000, 54],
        [new Date().getTime() - 180000, 45],
        [new Date().getTime() - 120000, 65],
        [new Date().getTime() - 60000, 76],
        [new Date().getTime(), 32]
      ];
      var obj = {
        title: {
          text: "市级24小时平均值"
        }
      };
      var option = new this.MyOption(obj);
      option.addSeries({ noise: data2, TSP: data });
      this.option_city = option;
    },
    MyOption(Obj = {}) {
      //模板
      (this.chart = {
        type: "areaspline", //spline
        animation: false
        // ...Obj.chart
      }),
        (this.title = {
          text: ""
          // ...Obj.title
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
          // crosshair: true
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
            '<tr><br><td style="padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.3f}</b></td></tr>',
          footerFormat: "</table>",
          // shared: true,
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
                  stops: [[0, "#efd8db"], [1, "#ffffff99"]]
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
                  stops: [[0, "#ff0000"], [1, "#ff8080"]] //f600ff
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
                  stops: [[0, "#007eff"], [1, "#7ecef1"]] // 2f93fa
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
                  stops: [[0, "#ddf2f3"], [1, "#ffffff99"]] // rgb(221 242 243)
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
                  stops: [[0, "#00ffb8"], [1, "#6afbdc"]] //  rgb(112, 192, 219)  rgb(125, 210, 192)
                },
                name: "PM2.5",
                data: types[type]
              });
              break;
            case "noise":
              this.series.push({
                color: {
                  linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                  },
                  stops: [[0, "#c7e8ec"], [1, "#ffffff99"]]
                },
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
                // lineColor: "#f7a833",
                lineColor: {
                  linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                  },
                  stops: [[0, "#50ced4"], [1, "#4fecbc"]]
                },
                // type: "spline",
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

  mounted: function() {
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
            width: 80,
            height: 20,
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

    var start = +new Date(),
      $tds = $("td[data-sparkline]"),
      fullLen = $tds.length,
      n = 0;
    // Creating 153 sparkline charts is quite fast in modern browsers, but IE8 and mobile
    // can take some seconds, so we split the input into chunks and apply them in timeouts
    // in order avoid locking up the browser process and allow interaction.
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
    // this.doChunk = doChunk;

    this.$nextTick(function() {
      _this.AMap.load().then(() => {
        let map = new AMap.Map(_this.$refs.allmap, {
          // resizeEnable: true,
          // rotateEnable: true,
          // pitchEnable: true,
          // resizeEnable: true,
          showIndoorMap: false,
          zoom: 11,
          // pitch: 10,
          // viewMode: '3D', //开启3D视图,默认为关闭
          // buildingAnimation: true, //楼块出现是否带动画
          // expandZoomRange: true,
          zooms: [6, 40]
          // center:[120.210766, 30.25079]; //初始化坐标
        });
        map.setMapStyle("amap://styles/901a4ca4add534a916a206c039210200"); // 自定义地图样式
        _this.map = map;

        _this.GetConstructionAndCity();
        // _this.AddEquipment();
        // this.map = map;
        // map.add(Marker);
      });
    });
    var interval2;
    clearInterval(interval2);
    interval2 = setInterval(() => {
      if (this.EquipmentState === true) {
        this.EquipmentState = false;
      } else {
        this.EquipmentState = true;
      }
    }, 1000);

    this.CityAverage();
    this.pageAttention();
  },
  //离开当前页面后执行
  destroyed: function() {
    //清理定时器
    clearInterval(interval);
  },
  updated() {
    //获取用户信息
    var User = this.$cookies.get("User");
    if (!User) {
      this.$router.push({ path: "/" });
    } else {
      this.User_Id = User.User_Id;
      this.User_name = User.User_name;
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>

