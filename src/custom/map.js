import $ from "jquery";


export const BaiduMap = {
    init: function () {
        let AK = "QvYHUnxIYS7SPXVY5O6ZuwG3WbXvUf2v";//  QvYHUnxIYS7SPXVY5O6ZuwG3WbXvUf2v   // E4805d16520de693a3fe707cdc962045 //GxSayQ210moNmMmugVZWQMBCM5H6PdLH
        let BMapURL = 'https://api.map.baidu.com/api?v=3.0key=&services=true&callback=onBMapCallback';
        // <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=8c7f091027030be413b18050578f4299&callback=mapInit"></script> 
        // let BMapURL = 'https://api.map.baidu.com/geocoder?output=json&city=杭州';
        // const BMapURL = 'https://api.map.baidu.com/api?v=3.0&ak=' + AK + '&s=1&callback=onBMapCallback'
        return new Promise((resolve, reject) => {
            // 如果已加载直接返回
            if (typeof BMap !== 'undefined') {
                resolve(BMap)
                return true
            }
            // 百度地图异步加载回调处理
            window.onBMapCallback = function () {
                console.log('百度地图脚本初始化成功...')

                //自定义控件配置
                function AuxiliaryTools(posIndex, left, top, obj, datalist, implement) {
                    var position = [
                        BMAP_ANCHOR_TOP_LEFT,
                        BMAP_ANCHOR_TOP_RIGHT,
                        BMAP_ANCHOR_BOTTOM_LEFT,
                        BMAP_ANCHOR_BOTTOM_RIGHT
                    ];
                    this.defaultAnchor = position[posIndex];
                    this.defaultOffset = new BMap.Size(left, top);
                    this.name = obj.name;
                    this.logo = obj.logo;
                    this.datalist = datalist;
                    this.implement = implement;
                }
                AuxiliaryTools.prototype = new BMap.Control();
                AuxiliaryTools.prototype.initialize = function (map) {
                    
                    // var div = document.createElement("div");
                    // $(div).css({
                    //     // width: "190px",
                    //     height: "266px",
                    //     overflow: "auto",
                    //     // border: "1px solid #aaa",
                    //     backgroundColor: "rgba(255, 255, 255, 0)"
                    // });

                    // var div1 = document.createElement("div");
                    // div1.classList.add('dropdown');

                    // var span = document.createElement("span");
                    // this.logo.map((cla,i)=>{
                    //     span.classList.add(cla);
                    // })
                    // span.ariaHidden="true"
                    // div1.append(span)
                   
                    // var span = document.createElement("span");
                    // span.innerHTML = this.name;
                    // div1.append(span);

                    // var div2 = document.createElement("div");
                    // div2.classList.add('dropdown-content');
                    // div2.style.display = "none";

                    // let _this = this;
                    // this.datalist.map((_v,i)=>{
                        
                    //     var p = document.createElement("p");
                        
                    //     p.append(_v.name);

                    //     var span_ok = document.createElement("span");
                    //     span_ok.classList.add("glyphicon");
                    //     span_ok.classList.add("glyphicon-ok");
                    //     span_ok.style.display = "none";

                    //     p.append(span_ok);
                    //     // 绑定事件
                    //     p.addEventListener("click",function(e){
                    //         e.stopPropagation();
                    //         _this.datalist.map((_d)=>{
                    //             _d.selected = false;
                               
                    //         })
                    //         $(p).siblings().css("color","rgb(0, 0, 0)");
                    //         $(p).siblings().find('span').css("display","none");
                    //         _v.selected = true;
                    //         _this.name = _v.name;
                    //         span.innerHTML = _v.name;
                    //         p.style.color = "rgb(92, 166, 208)";
                    //         span_ok.style.display = "inline-block";

                    //         div2.style.display = "none";
                    //         _this.datalist.map((_d)=>{
                                
                    //             if(_d.selected){

                    //             }
                    //         })
                    //         if(_this.implement){

                    //             _this.implement(_v,i);
                    //         }
                            
                    //     });
                    //     div2.append(p);
                    // })

                    // div1.addEventListener("click",function(){
                        
                    //     if(div2.style.display === "block"){
                    //         div2.style.display = "none";
                    //     }else{
                    //         div2.style.display = "block"
                    //     }

                    // });
                    // div1.append(div2);
                    

                    // div.append(div1);
                    // map.getContainer().appendChild(div);
                    // return div;
                };


                //导入自定义控件
                BMap["Control"] = new Object;
                BMap["Control"].AuxiliaryTools = AuxiliaryTools;




                console.log('自定义控件初始化成功...')
                resolve(BMap)
            };


            // 插入script脚本
            let scriptNode = document.createElement('script')
            scriptNode.setAttribute('type', 'text/javascript')
            scriptNode.setAttribute('src', BMapURL)
            document.body.appendChild(scriptNode)
        })
    }
}