import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';
//自定义http请求
function obj() {

    this._httpData = function (Vue, usr, condition) {

        var User = Vue.$cookies.get("User");
        var token = "";
        if (User && User.Token && User.Token != "") {
            token = User.Token
        }
        var timeoutmid = 15000;
        // Vue.$http.default.headers.common['token'] = token;
        var postCfg = {
            'headers': {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token,
            },
            // 'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'application/x-www-form-urlencoded'
        };

        var _this = this;
        axios.post(process.env.API_HOST + usr,
            { ...condition },
            { ...postCfg }
        ).then(response => {
            console.log(response,usr);
            if (response.data.Code === 0x01) {
                var data = response.data.Data
                if (Array.isArray(data)) { //  true：数组  false：对象
                    this.datas = data;
                    this.data = {};
                } else {
                    this.datas = [];
                    this.data = data;
                }
                this.state = true;
                this.message = response.data.Msg ? response.data.Msg : '操作成功'
            } else {
                this.data = {};
                this.datas = [];
                this.state = false;
                this.message = response.data.Msg ? response.data.Msg : '操作失败'
            }
            _this.then();
        }, function (error) {
            _this.datas = [];
            _this.data = {};
            _this.state = false;
            _this.message = error.message;
            try {
                _this.reason = error.response.data.Message;
                _this.then();
            } catch (err) {

            }

        });

        return this;
    };


    this.ToData = function () {

    }

    this._httpPost = function (Vue, usr, condition) {
        var timeoutmid = 15e3;
        // Vue.$http.default.headers.common['token'] = token;
        var User = Vue.$cookies.get("User");
        var token = "";
        if (User && User.Token && User.Token != "") {
            token = User.Token
        }
        var postCfg = {
            'headers': {
                //     // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token
            },
            // 'Content-Type': 'application/x-www-form-urlencoded'
        };
        var _this = this;
        axios.post(process.env.API_HOST + usr,
            { ...condition },
            { ...postCfg }
        ).then(response => {
            console.log(response);
            if (response && response.data.Code === 1) {
                var data = response.data.Data
                if (Array.isArray(data)) { //  true：数组  false：对象
                    this.datas = data;
                    this.data = {};
                } else {
                    this.datas = [];
                    this.data = data;
                }
                this.state = true;
                this.message = response.data.Msg ? response.data.Msg : '操作成功'
            } else {
                this.data = {};
                this.datas = [];
                this.state = false;
                this.message = response.data.Msg ? response.data.Msg : '操作失败'
            }
            _this.then();
        }, function (error) {
            _this.datas = [];
            _this.data = {};
            _this.state = false;
            _this.message = error.message;
            try {
                _this.reason = error.response.data.Message;
                _this.then();
            } catch (err) {

            }


        });
        return this;
    };
    this._httpGet = function (Vue, usr) {
        return Vue.$http.get(process.env.API_HOST + usr);
    };
    this.Meteorological = function (name = "杭州市", implement) {
        $.get('http://wthrcdn.etouch.cn/weather_mini?city=' + name, implement);
    };
    this.CitySearch = function (name = "杭州市") {

        return axios({
            url: 'http://api.map.baidu.com/geocoder/v2/?address=' + name + '&output=json&ak=QvYHUnxIYS7SPXVY5O6ZuwG3WbXvUf2v&callback=showLocation',
            adapter: jsonpAdapter
        })

    }
    // // http://47.111.152.237:8083/api/services/app/getmessage/ExportEquipmentHistoryData?equipment_UId=1440-0028-sclw-5875&start_time=2019-10-1 00:00:00&end_time=2019-10-08 23:59:59
    this.ExportEquipmentHistoryData = function(equipment_UId,start_time,end_time){
        var url = "http://47.111.152.237:8083/api/services/app/getmessage/ExportEquipmentHistoryData?";
        var data = "equipment_UId="+equipment_UId+"5&start_time="+start_time+"&end_time="+end_time
        return axios({
            url: url + data,
            adapter: jsonpAdapter
        })
    },
    /**
    * 回调函数
    */
    this.then = function () {
        this
    }
}

/* 响应拦截器 */
axios.interceptors.response.use((response) => {
    // let token = localStorage.getItem("x-auth-token");

    // if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    //     response.headers.token = `${token}`;
    // }else{
    //     response.headers.token = response.data.Token
    // }

    return response;
}, function (error) {
    if (error && error.response) {

        switch (error.response.status) {

            case 400: error.message = '请求错误(400)'; break;

            case 401: error.message = '未授权，请重新登录(401)'; break;

            case 403: error.message = '拒绝访问(403)'; break;

            case 404: error.message = '请求出错(404)'; break;

            case 408: error.message = '请求超时(408)'; break;

            case 500: error.message = '服务器错误(500)'; break;

            case 501: error.message = '服务未实现(501)'; break;

            case 502: error.message = '网络错误(502)'; break;

            case 503: error.message = '服务不可用(503)'; break;

            case 504: error.message = '网络超时(504)'; break;

            case 505: error.message = 'HTTP版本不受支持(505)'; break;

            default: error.message = `连接出错(${error.response.status})!`;
        }
    } else {
        error.message = '服务器连接失败!'
    }
    if (401 === error.response.status) {
        window.location = '/';
        return false;
    }
    return Promise.reject(error);
});
export default new obj;




