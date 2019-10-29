<template>
  <div id="geocoding">
    <div class="body">
      <div class="addresses">
        <div>坐标地址：{{coordinates}}</div>
        <div>详细地址：{{formattedAddress}}</div>

        <div class="global-search-wrapper">
          搜索地址：
          <a-auto-complete
            class="global-search"
            size="small"
            v-model="resultName"
            @select="onSelect"
            @search="handleSearch"
            optionLabelProp="text"
          >
            <!--  @search="handleSearch" -->
            <template slot="dataSource">
              <a-select-option
                v-for="(item,i) in resultDataList"
                :key="i+''"
                :text="item.district + item.name"
                :name="{P:item.location.P,Q:item.location.Q,lat:item.location.lat,lng:item.location.lng}"
              >
                {{item.district + item.name}}
                <a-icon v-if="item.location.P>0" type="environment" />
              </a-select-option>
            </template>
            <!-- <a-input>
              <a-button slot="suffix" class="search-btn" size="small" type="primary">
                <a-icon type="search" />
              </a-button>
            </a-input>-->
          </a-auto-complete>
        </div>
      </div>
      <div :id="'allmap_geocoding_'+id" class="allmap_geocoding" :ref="'allmap_geocoding_'+id"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "geocoding",
  data() {
    return {
      typeName: "geocoding",
      coordinates: "",
      regeoCode: {},
      formattedAddress: "",
      resultDataList: [],
      resultName: ""
    };
  },
  props: {
    id: {
      type: String
    },
    coordinate: {
      type: String
    },
    onClink: {
      type: Function,
      default: null
    }
  },
  methods: {
    result() {}, //搜索
    Location() {},

    onSelect(key, _d) {
      var lnglat = _d.data.attrs.name;
      var value = _d.data.attrs.text;
      this.result(value);
      this.Location(lnglat);
      // console.log("onSelect", value);
    },

    handleSearch(value, _d) {
      // this.resultName = value;

      this.result(value);
      this.resultName = value ? this.searchResult(value) : [];
    },

    getRandomInt(max, min = 0) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    searchResult(query) {
      return new Array(this.getRandomInt(5))
        .join(".")
        .split(".")
        .map((item, idx) => ({
          query,
          category: `${query}${idx}`,
          count: this.getRandomInt(200, 100)
        }));
    }
  },
  //加载前执行
  created() {},
  //加载后执行
  mounted() {
    let _this = this;

    this.$nextTick(function() {
      _this.AMap.load().then(() => {
        let map = new AMap.Map(_this.$refs["allmap_geocoding_" + _this.id], {
          zoom: 10
        });
        map.setMapStyle("amap://styles/901a4ca4add534a916a206c039210200"); // 自定义地图样式
        var geocoder;
        map.plugin(["AMap.Geocoder"], function() {
          geocoder = new AMap.Geocoder({
            // city: "010", //城市设为北京，默认：“全国”
            // radius: 1000 //范围，默认：500
          });
        });

        var marker = new AMap.Marker();
        function regeoCode() {
          var lnglat = _this.coordinates;
          map.add(marker);
          marker.setPosition(lnglat);
          geocoder.getAddress(lnglat, function(status, result) {
            if (status === "complete" && result.regeocode) {
              var address = result.regeocode.formattedAddress;
              _this.formattedAddress = address;
              _this.regeoCode = result.regeocode;
              if (_this.onClink)
                _this.onClink(result.regeocode, lnglat.toString());
            } else {
              // {formattedAddress:"根据经纬度查询地址失败"}
               _this.formattedAddress = "无效地址请重新选择";
              // console.log("根据经纬度查询地址失败");
            }
          });
        }

        map.on("click", function(e) {
          _this.coordinates = e.lnglat;
          regeoCode();
        });

        _this.Location = lnglat => {
          if (!lnglat.Q) return false;
          var _marker = new AMap.Marker({
            position: [lnglat.Q, lnglat.P]
          });
          lnglat = _marker.B.position;
          _this.coordinates = lnglat;
          regeoCode();
          map.setFitView();
        };
        var auto;
        map.plugin(["AMap.Autocomplete"], function() {
          var autoOptions = {
            // city: "" //城市，默认全国
          };
          auto = new AMap.Autocomplete(autoOptions);
          //查询成功时返回查询结果
          // if ( keywords.length > 0) {

          _this.result = Name => {
            auto.search([Name], function(status, result) {
              _this.resultDataList = result.tips;
            });
          };
        });

        _this.map = map;
      });
    });
  }
};
</script>

<style scoped lang="less">
// @import "./index.less";
#geocoding {
  height: 100%;
  width: 100%;
  // background: rgb(238, 214, 214);
  .body {
    height: 100%;
    width: 100%;
    .allmap_geocoding {
      height: 100%;
      width: 100%;
    }
    .addresses {
      // background: #96969629;
      text-align: left;
      padding-left: 20px;
      height: 90px;
      width: 70%;
      position: absolute;
      /* top: 125px; */
      z-index: 100;
    }
  }
  .global-search-wrapper {
    padding-right: 50px;
    z-index: 100;
  }

  .global-search {
    width: 90%;
  }

  .global-search.ant-select-auto-complete .ant-select-selection--single {
    margin-right: -46px;
  }

  .global-search.ant-select-auto-complete
    .ant-input-affix-wrapper
    .ant-input:not(:last-child) {
    padding-right: 62px;
  }

  .global-search.ant-select-auto-complete
    .ant-input-affix-wrapper
    .ant-input-suffix {
    right: 0;
  }

  .global-search.ant-select-auto-complete
    .ant-input-affix-wrapper
    .ant-input-suffix
    button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .global-search-item-count {
    position: absolute;
    right: 16px;
  }
}
</style>



