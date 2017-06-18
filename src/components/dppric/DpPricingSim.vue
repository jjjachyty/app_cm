<template>
<div>
    <div>
      <mu-appbar title="存款测算" v-show="showTabBar">
        <mu-icon-button icon='keyboard_backspace' slot="left" touch href="/" />
      </mu-appbar>
    </div>
<div >
  <mu-popup position="left" :open="leftPopup" popupClass="demo-popup-left" @close="closePop">
    <div class="left-input">
    <mu-row gutter>
    <mu-col width="30" tablet="50" desktop="33">
   <mu-sub-header ><strong>机构</strong></mu-sub-header>
    </mu-col>
    <mu-col width="70" tablet="50" desktop="33">
    <mu-picker fullWidth  @change="branchChange" :slots="branchSlots" :visible-item-count="1"   :values="branch"/>
    </mu-col>
    </mu-row>
    <mu-divider />

    <mu-row gutter>
    <mu-col width="30" tablet="50" desktop="33">
    <mu-sub-header><strong>等级</strong></mu-sub-header>
    </mu-col>
    <mu-col width="70" tablet="50" desktop="33">
  <mu-select-field fullWidth v-model="custImpl"   hintText="下拉选择">
    <mu-menu-item value="1" title="核心"/>
    <mu-menu-item value="2" title="潜力"/>
    <mu-menu-item value="3" title="非目标"/>
  </mu-select-field>    </mu-col>
    </mu-row>
    <mu-divider />

    <mu-row gutter>
    <mu-col width="30" tablet="50" desktop="33">
    <mu-sub-header><strong>规模</strong></mu-sub-header>
    </mu-col>
    <mu-col width="70" tablet="50" desktop="33">
    <mu-select-field fullWidth v-model="custSize"  hintText="下拉选择" >
    <mu-menu-item value="1" title="大型"/>
    <mu-menu-item value="2" title="中型"/>
    <mu-menu-item value="3" title="小型"/>
    <mu-menu-item value="4" title="微型"/>
    <mu-menu-item value="5" title="事业"/>
    <mu-menu-item value="6" title="零售"/>
    <mu-menu-item value="7" title="未知"/>
  </mu-select-field></mu-col>
    </mu-row>
    <mu-divider />

    <mu-row gutter>
    <mu-col width="30" tablet="50" desktop="33">
    <mu-sub-header><strong>评级</strong></mu-sub-header>
    </mu-col>
    <mu-col width="70" tablet="50" desktop="33">
  <mu-select-field fullWidth v-model="custGrade" hintText="下拉选择">
    <mu-menu-item value="AAA" title="AAA"/>
    <mu-menu-item value="AA" title="AA"/>
    <mu-menu-item value="A" title="A"/>
    <mu-menu-item value="BBB" title="BBB"/>
    <mu-menu-item value="BB" title="BB"/>
    <mu-menu-item value="B" title="B"/>
    <mu-menu-item value="CCC" title="CCC"/>
    <mu-menu-item value="CC" title="CC"/>
    <mu-menu-item value="C" title="C"/>
    <mu-menu-item value="D" title="D"/>
  </mu-select-field>
  </mu-col>
    </mu-row>
    <mu-divider />

    <mu-row gutter>
    <mu-col width="30" tablet="50" desktop="33">
    <mu-sub-header><strong>产品</strong></mu-sub-header>
    </mu-col>
    <mu-col width="70" tablet="50" desktop="33">
    <mu-select-field fullWidth v-model="product" hintText="下拉选择">
    <mu-menu-item value="1" title="流动资金贷款"/>
    <mu-menu-item value="2" title="固定资产贷款"/>
    <mu-menu-item value="3" title="信用贷款"/>
    <mu-menu-item value="4" title="抵押贷款"/>
  </mu-select-field>
  </mu-col>
    </mu-row>
    <mu-divider />

    <mu-row gutter>
    <mu-col width="30" tablet="50" desktop="33">
    <mu-sub-header><strong>期限</strong></mu-sub-header>
    </mu-col>
    <mu-col width="70" tablet="50" desktop="33">
    <mu-picker :slots="termSlots" :visible-item-count="1" @change="termChange" :values="term"/>

  </mu-col>
    </mu-row>
    <mu-divider />

    <mu-row gutter>
    <mu-col width="30" tablet="50" desktop="33">
    <mu-sub-header><strong>利率</strong></mu-sub-header>
    </mu-col>
    <mu-col width="45" tablet="50" desktop="33">
             <mu-slider v-model="rate" :min="0" :step="1" :max="100" class="demo-slider"/>
  </mu-col>
    <mu-col width="25" tablet="50" desktop="33">          {{rate}}%
  </mu-col>
    </mu-row>
    <mu-divider />

    <mu-row gutter>
    <mu-col width="30" tablet="50" desktop="33">
    <mu-sub-header><strong>金额</strong></mu-sub-header>
    </mu-col>
    <mu-col width="45" tablet="50" desktop="33">
             <mu-slider v-model="principal" :min="0" :step="1" :max="900" class="demo-slider"/>
  </mu-col>
    <mu-col width="25" tablet="50" desktop="33">          {{principal}}万
</mu-col>
    </mu-row>
    <mu-divider />
    <br>
      <mu-sub-header><strong>修改信息后点击右侧灰色区域查看结果👉</strong></mu-sub-header>

    </div>
  </mu-popup>
<div>
  <mu-popup position="right" :open="rightPopup" popupClass="demo-popup-right" @close="closePop">
     <mu-paper class="demo-paper" :zDepth="3" >

    <mu-sub-header><strong>抵质押</strong></mu-sub-header>

  <mu-row gutter>
    <mu-col width="30" tablet="50" desktop="33">金融质押</mu-col>
    <mu-col width="60" tablet="50" desktop="33">
    <mu-slider v-model="mortJR" :min="0" :step="10" :max="100"/>
    </mu-col>
    <mu-col width="15" tablet="50" desktop="33">{{mortJR}}%</mu-col>
  </mu-row>
  <mu-row gutter>
    <mu-col width="30" tablet="50" desktop="33">应收帐款</mu-col>
    <mu-col width="60" tablet="50" desktop="33">
    <mu-slider v-model="mortYS" :min="0" :step="10" :max="100"/>
    </mu-col>
    <mu-col width="15" tablet="50" desktop="33">{{mortYS}}%</mu-col>
  </mu-row>
  <mu-row gutter>
    <mu-col width="30" tablet="50" desktop="33">土地房产</mu-col>
    <mu-col width="60" tablet="50" desktop="33">
    <mu-slider v-model="mortTD" :min="0" :step="10" :max="100"/>
    </mu-col>
    <mu-col width="15" tablet="50" desktop="33">{{mortTD}}%</mu-col>
  </mu-row>
  <mu-row gutter>
    <mu-col width="30" tablet="50" desktop="33">担保</mu-col>
    <mu-col width="60" tablet="50" desktop="33">
    <mu-slider v-model="mortDB" :min="0" :step="10" :max="100"/>
    </mu-col>
    <mu-col width="15" tablet="50" desktop="33">{{mortDB}}%</mu-col>
  </mu-row>
   </mu-paper>
        <mu-paper class="demo-paper" :zDepth="3" >

    <mu-sub-header><strong>派生</strong></mu-sub-header>
  <mu-row gutter>
    <mu-col width="30" tablet="50" desktop="33">支付结算</mu-col>
    <mu-col width="60" tablet="50" desktop="33">
    <mu-slider v-model="discountZF" :min="0" :step="10" :max="100"/>
    </mu-col>
    <mu-col width="15" tablet="50" desktop="33">{{discountZF}}%</mu-col>
  </mu-row>
  <mu-row gutter>
    <mu-col width="30" tablet="50" desktop="33">投行业务</mu-col>
    <mu-col width="60" tablet="50" desktop="33">
    <mu-slider v-model="discountTH" :min="0" :step="10" :max="100"/>
    </mu-col>
    <mu-col width="15" tablet="50" desktop="33">{{discountTH}}%</mu-col>
  </mu-row>
  <mu-row gutter>
    <mu-col width="30" tablet="50" desktop="33">活期存款</mu-col>
    <mu-col width="60" tablet="50" desktop="33">
    <mu-slider v-model="discountHQ" :min="0" :step="10" :max="100"/>
    </mu-col>
    <mu-col width="15" tablet="50" desktop="33">{{discountHQ}}%</mu-col>
  </mu-row>
  <mu-row gutter>
    <mu-col width="30" tablet="50" desktop="33">定期业务</mu-col>
    <mu-col width="60" tablet="50" desktop="33">
    <mu-slider v-model="discountDQ" :min="0" :step="10" :max="100"/>
    </mu-col>
    <mu-col width="15" tablet="50" desktop="33">{{discountDQ}}%</mu-col>
  </mu-row>
  <br>
      <mu-sub-header><strong>抵质押和派生均为所占金额的百分比</strong></mu-sub-header>
      <mu-sub-header><strong>👈调整后点击左侧灰色区域查看结果</strong></mu-sub-header>

   </mu-paper>
</mu-popup>
</div>




</div>

<div class="div" v-finger:swipe="this.swipe">
      <mu-sub-header><strong>测算结果</strong></mu-sub-header>

        <!-- <LnPricingSimRate></LnPricingSimRate>-->
                 <chart  :options="Rate" auto-resize ></chart>  

               <mu-sub-header><strong>EVA</strong></mu-sub-header>

  <mu-row gutter class="content">
<!--    <mu-col width="30" tablet="30" desktop="30"><strong>底线:</strong>
    {{evaBottom}}
    <mu-linear-progress mode="determinate" :max="evaTgt*2" :size="20" color="yellow" :value="evaBottom"/>
    </mu-col>-->
    <mu-col width="40" tablet="40" desktop="40">
    <strong>单笔:</strong> 
    {{evaScene}}
        <mu-linear-progress mode="determinate" :max="evaTgt*2" :size="20" color="amber" :value="evaScene"/>

    </mu-col>
    <mu-col width="40" tablet="40" desktop="40"><strong>综合:</strong> 
    {{evaTgt}}
        <mu-linear-progress mode="determinate" :max="evaTgt*2" :size="20" color="orange" :value="evaTgt"/>
</mu-col>
  </mu-row>
             <mu-sub-header><strong>RAROC</strong></mu-sub-header>

<!--         <LnPricingSimRaroc></LnPricingSimRaroc>-->
<chart  :options="Raroc" style="height:'100px'" auto-resize ></chart>  
         
               <mu-sub-header><strong>过程参数</strong></mu-sub-header>
        
         <chart  :options="Pars" auto-resize ></chart>
          <mu-divider />
         
</div>

</div>
</template>

<script>
const branch = {"重庆":["渝中分行","渝北分行","南岸分行","万州分行","云阳分行"],
                "四川":["成都分行","绵阳分行","南充分行","遂宁分行","攀枝花分行"]
}

const rateType={
  '固定利率':['-'],
  '浮动利率':['一个月','三个月','六个月','一年']
}
const term = {
               "1":["年","月","日"],
               "2":["年","月","日"],
               "3":["年","月","日"],
               "4":["年","月","日"],
               "5":["年","月","日"],
               "6":["年","月","日"],
               "7":["年","月","日"],
               "8":["年","月","日"],
               "9":["年","月","日"],
               "10":["年","月","日"],
               "15":["年","月","日"],
               "20":["年","月","日"],
               "30":["年","月","日"]
}
/**期限 */
const ftpRateTerm={'1':0.019115,'7':0.022644,'14':0.024394,'30':0.025394,'90':0.030394,'180':0.034955,'270':0.036304,'360':0.037496,'720':0.039825,'1080':0.040497,'1800':0.042846,'3600':0.046841,'5400':0.051569,'7200':0.053709,'10800':0.056769}
const ftpDay=['1','7','14','30','90','180','270','360','720','1080','1800','3600','5400','7200','10800']

/**產品 */
const ocRateProduct={'1':0.0318,'2':0.0301,'3':0.0325,'4':0.031}
const ocRateBranch={'渝中分行':0.012,'渝北分行':0.013,'南岸分行':0.014,'万州分行':0.015,'云阳分行':0.016,'成都分行':0.014,'绵阳分行':0.013,'南充分行':0.013,'遂宁分行':0.012,'攀枝花分行':0.013}
/**評級 */
const pdRateArr={'AAA':0.00095,'AA':0.00095,'A':0.00861,'A':0.023023,'BBB':0.04150,'BB':0.06428,'B':0.10471,'CCC':0.16068,'CC':0.23138,'C':0.63504,'D':1}
/**抵押品 */
const lgdRateJR={'0':0,'10':0.045,'20':0.09,'30':0.135,'40':0.18,'50':0.225,'60':0.27,'70':0.315,'80':0.36,'90':0.405,'100':0.45}
const lgdRateYS={'0':0,'10':0.035,'20':0.07,'30':0.105,'40':0.14,'50':0.175,'60':0.21,'70':0.245,'80':0.28,'90':0.315,'100':0.35}
const lgdRateTD={'0':0,'10':0.035,'20':0.07,'30':0.105,'40':0.14,'50':0.175,'60':0.21,'70':0.245,'80':0.28,'90':0.315,'100':0.35}
const lgdRateDB={'0':0,'10':0.04,'20':0.08,'30':0.12,'40':0.16,'50':0.2,'60':0.24,'70':0.28,'80':0.32,'90':0.36,'100':0.40}

/**派生優惠 */
const scenenArr={'0':0,'10':0.1,'20':0.20,'30':0.30,'40':0.40,'50':0.50,'60':0.60,'70':0.70,'80':0.8,'90':0.9,'100':1}
// const lgdRateTH={'0':'1','10':'0.95','20':'1.20','30':'1.35','40':'1.40','50':'1.55','60':'0.60','70':'0.65','80':'0.60','90':'0.55','100':'0.50'}
// const lgdRateHQ={'0':'1','10':'0.95','20':'1.20','30':'1.35','40':'1.40','50':'1.55','60':'0.60','70':'0.65','80':'0.60','90':'0.55','100':'0.50'}
// const lgdRateDQ={'0':'1','10':'0.98','20':'1.26','30':'1.34','40':'1.42','50':'1.50','60':'0.68','70':'0.86','80':'0.84','90':'0.82','100':'0.80'}

/**利率類型 */
const rateTypeArr={'-':0.001,'一个月':0.0003,'三个月':0.0006,'六个月':0.0009,'一年':0.001}
/**客戶等級 */
const custImplArr={'1':0.3,'2':0.4,'3':0.5}
/**客戶規模 */
const custSizeArr={'1':'0.7','2':'0.8','3':'0.88','4':'0.85','5':'0.8','6':'0.99','7':'1',}
/**經濟資本 */
const ecRate=0.108
/**資本成本 */
const capRate=0.04
/**資本回報 */
const prfRate=0.09
/**增值稅 */
const addRate=0.0672
/**所得稅 */
const incomRate=0.25

const baseRate={'0':4.35,'360':4.75,'1800':4.9}




  import LnPricingSimRate from 'components/lnpric/LnPricingSimRate'
  import LnPricingSimRaroc from 'components/lnpric/LnPricingSimRaroc'

  export default {
    components: {
LnPricingSimRate,
LnPricingSimRaroc
    },
  data () {
      var self = this
      let tgtRateValue = 7.853
    return {
      branchSlots: [
        {
          width: '100%',
          textAlign: 'left',
          values: Object.keys(branch),
        }, {
          width: '100%',
          textAlign: 'left',
          values: ["渝中分行","渝北分行","南岸分行","万州分行","云阳分行"],
        }
      ],
            termSlots: [
        {
          width: '100%',
          textAlign: 'left',
          values: Object.keys(term)
        }, {
          width: '100%',
          textAlign: 'left',
          values: ["年","月","日"]
        }
      ],  rateTypeSlots: [
        {
          width: '100%',
          textAlign: 'left',
          values: Object.keys(rateType)
        }, {
          width: '100%',
          textAlign: 'left',
          values: ['-']
        }
      ],
      branch: ["重庆","渝中分行"],
      branchProvince: '重庆',
      branchCity: '渝中分行',
      term: ["6","月"],
      showTabBar:false,
      termProvince: '6',
      termCity: '月',
      rateType: ["固定利率","-"],
      rateTypeProvince: '固定利率',
      rateTypeCity: '无',
      principal:"10",
      rate:"10",
      mortJR:"0",
      mortYS:"0",
      mortTD:"0",
      mortDB:"0",  
      discountZF:0,
      discountTH:0,
      discountHQ:0,
      discountDQ:0,
      discountZFRate:0,
      discountTHRate:0,
      discountHQRate:0,
      discountDQRate:0,
      discount:0,
      product:"1",
      custImpl:"1",
      custSize:"1",
      custGrade:"AAA",
      productName:"固定资产贷款",
      //evaBottom:0,
      //evaScene:0,
      //evaTgt:0,
      //bottomRate:0,
      //sceneRate:0,
      //tgtRate:0,
      bottomRateFloat:0,
      termDay:180,
      sceneRateFloat:0,
      tgtRateFloat:0,
      ocRateBranch:1.2,
      ocRateProduct:1.9,
      custImplRate:0.3,
      lgdJR:0,
      lgdYS:0,
      lgdTD:0,
      lgdDB:0,
      pdRate:0,
      ecRate:0.108,
        /**資本成本 */
        capRate:0.04,
        /**資本回報 */
        prfRate:0.042,
        /**增值稅 */
        addRate:0.0672,
        /**所得稅 */
        incomRate:0.25,
      indcator:{
          ocRate:0
      },
    // ftpRate:{'1':'1.9115','7':'2.2644','14':'2.4394','30':'2.5394','90':'3.0394','180':'3.4955','270':'3.6304','360':'3.7496','720':'3.9825','1080':'4.0497','1800':'4.2846','3600':'4.6841','5400':'5.1569','7200':'5.3709','10800':'5.6769'},
    // ocRate:{'1':'2.3','2':'1.9','3':'2.7','4':'3.1'},
    // pdRate:{'AAA':'0.095','AA':'0.095','A':'0.861','A':'2.3023','BBB':'4.150','BB':'6.428','B':'10.471','CCC':'16.068','CC':'23.138','C':'63.504','D':'100'},
    // lgdRateJR:{'0':'100','10':'90','20':'80','30':'70','40':'60','50':'50','60':'40','70':'30','80':'20','90':'100','100':'0'},
    // lgdRateYS:{'0':'100','10':'95','20':'90','30':'85','40':'80','50':'75','60':'70','70':'65','80':'60','90':'55','100':'50'},
    // lgdRateTD:{'0':'100','10':'95','20':'90','30':'85','40':'80','50':'75','60':'70','70':'65','80':'60','90':'55','100':'50'},
    // lgdRateDB:{'0':'100','10':'98','20':'96','30':'94','40':'92','50':'90','60':'88','70':'86','80':'84','90':'82','100':'80'},
    // custImpArr:{'1':'0.6','2':'0.9','3':'1'},
    ftpRateTermValue:0,
    ftpRateType:0,
    // ecRate:'10.8',
    // capRate:'4',
    // prfRate:'6',
    // addRate:'6.72',
    //incomRate:'25',
      leftPopup:false,
      rightPopup:false,
              Pars:{
          baseOption: {
            color: ['#009688'],
                    grid: {
            top:'3%',
        left: '3%',
        right: '4%',
         bottom: '3%',
        containLabel: true
    },
    barWidth:20,
 
    tooltip : {
                trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: "{a} <br/>{b} : {c}"
    },
    xAxis : 
        {
            type : 'category',
            data : ['资金', '运营', '违概', '违损', '经资', '资本', '回报','增税','所税','优惠'],
            // axisTick: {
            //     alignWithLabel: true
            // }
             nameTextStyle:{
                color:'#009688',
                fontStyle:'oblique',
                fontSize:20
            },
            nameGap:300,
            nameRotate:200
        }
    ,    yAxis : [
        {
            type : 'value',
            max:50
        }
    ],
    series : [
        {
            type: 'bar',
            radius : '10%',
            center: ['10%', '10%'],
            data:[0,0,0,45,10.8,4,6.3,6.72,25],
            label:{
                normal:{
                    show:true,
                    formatter:'{c}',
                    position:'outside',
                    textStyle:{
                      color:"#009688",
                      fontStyle:'normal'
                    }
                }},
            labelLine:{
                normal:{
                show:true,
              length:5,
              length2:4
            }}
        }
    ]
   
      }
 }    ,    Raroc : {
    tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        feature: {
        }
    },

    series: [
        // {
        //     name: '底线利率',
        //     type: 'gauge',
        //     radius : '80%',
        //     center : ['20%', '45%'],    // 默认全局居中
        //     max:20,
        //     min:3,
        //     endAngle: 40,
        //     splitNumber:7,
        //     detail: 
        //     {
        //         show:true,

        //         textStyle:{
        //             fontSize:16
        //         },
        //         formatter:'{value}%'
        //         },
        //     data: [{value: 0,name:'底线'}],
        //     axisLine: {            // 坐标轴线
        //         lineStyle: {       // 属性lineStyle控制线条样式
        //             width: 8,
        //             color:[[0.2, '#c23531'],[0.5, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]

        //         }
        //     },           axisTick: {            // 坐标轴小标记
        //         show: true
        //     },axisLabel:{
        //         show:false
        //     } , pointer: {
        //         width:2
        //     },
        // },
        {
            name: '利率',
            type: 'gauge',
            center : ['25%', '45%'],    // 默认全局居中
            radius : '80%',
            max:20,
            min:3,
            //endAngle: 0,
            detail: {textStyle:{
                    fontSize:16
                },formatter:'{value}%'},
            data: [{value: 10,name:'单笔'}],
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 12,
                   color:[[0.2, '#c23531'],[0.5, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]

                }
            },           axisTick: {            // 坐标轴小标记
                show: true
            },axisLabel:{
                show:false
            } , pointer: {
                width:2
            },
        },
        {
            name: '利率',
            type: 'gauge',
            center : ['80%', '45%'],    // 默认全局居中
            radius : '80%',
            max:18,
            min:3,
            
            detail: {textStyle:{
                    fontSize:14
                },
                formatter:'{value}%'},
            data: [{value: 10,name:'综合'}],
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 12,
                    color:[[0.2, '#c23531'],[0.5, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]
                }
            },  
             axisTick: {            // 坐标轴小标记
                show: true,
                lineStyle: { 
                                   
                }
            },axisLabel:{
                show:false
            } , pointer: {
                width:2
            },
        }
    ]
},
     
    Rate: {
        barWidth:20,
    tooltip: {
        trigger: 'axis'
    },
        grid: {
            top:'3%',
        left: '3%',
        right: '4%',
         bottom: '3%',
        containLabel: true
    },
    title : {
        //text: '测算利率',
        left:"40%",
        bottom:'0%'
    },
    toolbox: {
        feature: {

        }
    },
    // legend: {
    //     data:['利率','较基准上浮']
    // },
    xAxis: [
        {
            type: 'category',
            data: ['底线利率','优惠利率','目标利率']
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '利率%',
            min: 0,
            max: 30,
            interval: 5,
            axisLabel: {
                formatter: '{value} '
            }
        },
        {
            type: 'value',
            name: '基准上浮%',
            min: -40,
            max: 80,
            interval: 20,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
            name:'利率',
            type:'bar',
            color: ['#009688'],
            data:[0, 0, 0],
            label:{
                normal:{
                    show:true,
                    formatter:'{c}%',
                    position:'outside',
                    textStyle:{
                      color:"#009688",
                      fontStyle:'normal',
                      fontSize:18
                    }
                }}
        },
        {
            name:'较基准上浮',
            type:'line',
            color: ['#009688'],
            yAxisIndex: 1,
            data:[0, 0, 0],
            lineStyle:{
              normal:{
                 color:"#ff5722"
              }  
            },
            label:{
                normal:{
                    show:true,
                    formatter:'{c}%',
                    position:'top',
                    textStyle:{
                      color:"#ff5722",
                      fontStyle:'oblique',
                      fontSize:14
                    }
                }}
        }
    ]
}
    }
  },computed: {

      evaBottom:function(){
                         //     var scene = this.principal*10000*(this.termDay/360)*((1-this.incomRate)*(this.bottomRate/100/(1+this.addRate)-this.ftpRate-this.ocRate-this.elRate)-this.ecRate*this.capRate)
          return Number(0)
      },
      evaScene:function(){
                    var evaScene = this.principal*10000*(this.termDay/360)*((1-this.incomRate)*(this.tgtRate/(1+this.addRate)-this.ftpRate-this.ocRate-this.elRate)-this.ecRate*this.capRate)
                    console.log("evaScene",evaScene)
          return Number((evaScene).toFixed(2))
      },
      evaTgt:function(){
        //贷款金额*(贷款期限(实际天数)/360)*((1-所得税)*(贷款目标利率/(1+增值税)-资金成本率-运营费用率-预期损失率)-经济资本占用率*资本成本率)
          var eTgt = this.principal*10000*(this.termDay/360)*((1-this.incomRate)*(this.tgtRate/(1+this.addRate)-this.ftpRate-this.ocRate-this.elRate)-this.ecRate*this.capRate)
          console.log("evaTgt==>",this.principal*10000,this.termDay/360,this.tgtRate)
          return Number((eTgt+this.discountEva).toFixed(2))
      },
      rarocTgt:function(){
         //var rocTgt =  ((this.tgtRate/(1+this.addRate)-this.ftpRate-this.ocRate-this.elRate)*(1-this.incomRate))/this.ecRate
         var rocTgt = (this.evaTgt+(this.principal*10000*(this.termDay/360)*this.ecRate*this.capRate))/(this.ecRate*this.principal*10000*(this.termDay/360))
         console.log("rocTgt==>",rocTgt,Number((rocTgt*100).toFixed(2)))
         return Number((rocTgt*100).toFixed(2))
      },
      oneLnNetProfit:function(){
               var oneLnNetProfit = this.principal*10000*(this.termDay/360)*((1-this.incomRate)*(this.tgtRate/(1+this.addRate)-this.ftpRate-this.ocRate-this.elRate))
               console.log("oneLnNetProfit==>",oneLnNetProfit)
               return Number((oneLnNetProfit+this.discountEva-this.ecRate*this.capRate*this.principal*10000*(this.termDay/360)).toFixed(2))
      },
    rarocScene:function(){
         var rocScene =  ((this.tgtRate/(1+this.addRate)-this.ftpRate-this.ocRate-this.elRate)*(1-this.incomRate))/this.ecRate
         console.log("rocScene==>",rocScene,Number((rocScene*100).toFixed(2)))
         return Number((rocScene*100).toFixed(2))
      },
      tgtRate:function(){
       var tgt = (this.ftpRate+this.ocRate+this.elRate+(this.ecRate*(this.capRate+this.prfRate))/(1-this.incomRate))*(1+this.addRate)
       console.log("tgtRate==>",tgt,this.ftpRate,this.ocRate,this.elRate,this.ecRate,this.capRate,this.prfRate,1-this.incomRate,1+this.addRate)
        return  Number((tgt).toFixed(4))
      },

      sceneRate:function(){
                 var scene = this.tgtRate-this.discount/100
        return  Number((scene).toFixed(4))
      },
      bottomRate:function(){
       var bottom = (this.ftpRate+this.ocRate+this.elRate+(this.ecRate*(this.capRate))/(1-this.incomRate))*(1+this.addRate)
       console.log("bottom==>",bottom,this.ftpRate,this.ocRate,this.elRate,this.ecRate,this.capRate,1-this.incomRate,1+this.addRate)
        return  Number((bottom).toFixed(4))
      },
      ftpRate:function(){
                   var ftp =this.ftpRateTermValue + this.ftpRateType
                   console.log("ftpRate==>",this.ftpRateTermValue,this.ftpRateType,this.ftpRateTermValue * this.ftpRateType)
        return  Number((ftp).toFixed(4))
      },
      ocRate:function(){
            return Number(((this.ocRateBranch * this.ocRateProduct)*this.custImplRate*100).toFixed(4))
      },
      lgdRate:function(){

           //45% 0-100 mortJR
           //35% 0-125 mortYS
           //30% mortTD
           // mortDB
           //var E1 = 100-this.mortJR
          
            // lgdRateJR
            // lgdRateYS
            // lgdRateTD
            // lgdRateDB
            var maxLGD = 0.45
            var lgd = 0.45 - this.lgdJR - this.lgdYS - this.lgdTD - this.lgdDB

            if (lgd < 0) {
                return 0
            }else {
                return lgd
                } 

      },
      elRate:function(){
            return Number(this.pdRate* this.lgdRate)
      },
      discountEva:function(){
          console.log("discountEva==>",this.discountZF,this.discountTH,this.discountHQ,this.discountDQ)
        return this.principal*10000*(this.discountZF+this.discountTH+this.discountHQ+this.discountDQ)/30/100
      }      
  },
  methods: {
    branchChange (value, index) {   
        
      switch (index) {
        case 0:
          this.branchProvince = value
          const arr = branch[value]
          this.branchSlots[1].values = arr
          this.branchCity = arr[0]
          break
        case 1:
          this.branchCity = value
          break
      }
     
      this.branch = [this.branchProvince, this.branchCity]
    },    
    termChange (value, index) {
      switch (index) {
        case 0:
          this.termProvince = value
          const arr = term[value]
          this.termSlots[1].values = arr
          this.termCity = arr[0]
          break
        case 1:
          this.termCity = value
          break
      }
     
      this.term = [this.termProvince, this.termCity]
    },
    rateTypeChange (value, index) {
      switch (index) {
        case 0:
          this.rateTypeProvince = value
          const arr = rateType[value]
          this.rateTypeSlots[1].values = arr
          this.rateTypeCity = arr[0]
          break
        case 1:
          this.rateTypeCity = value
          break
      }
      
      this.rateType = [this.rateTypeProvince, this.rateTypeCity]
    },double(e){
        console.log("double")
    },swipe(e){
        if("Right" == e.direction){
            this.leftPopup=true
        }else if("Left" == e.direction){
            this.rightPopup=true
        }else if("Down" == e.direction){
            this.showTabBar=true
        }else if("Up" == e.direction){
            this.showTabBar=false
        }
    },closePop(){
        this.leftPopup=false
        this.rightPopup=false
    },cacule(){
        
    },getBaseRate(term){
          if(term <361 && term >0 ){
             return 4.35
          }else if (term < 1800 && term > 360){
              return 4.75
          }else{
                return 4.9
          }
    }
    },watch:{
        branch:function(newvalue){
            this.ocRateBranch = ocRateBranch[newvalue[1]]
            console.log("branch",this.ocRateBranch)
        },
        custSize:function(newvalue){
            this.custSizeRate = custSizeArr[this.custSize]
            this.prfRate = this.custSizeRate*prfRate
            console.log("custSize==>",this.custSizeRate,this.prfRate)
        },
        custImpl:function(nv){
            this.custImplRate = custImplArr[nv]
            console.log("custImpl",this.custImplRate)
        },
        custGrade:function(nv){
            this.pdRate = (pdRateArr[nv]*1).toFixed(5)
            console.log("pdRate",this.pdRate)
        },
        product:function(nv){
            this.ocRateProduct = ocRateProduct[nv]
            console.log("product",this.ocRateProduct)
        },
        term:function(nv){
            console.log("term-nv",nv)
            var termMt = 1
            var term = 0
            var before=0
            var after = 0
            switch(nv[1]){
                case '年':
                termMt = 360
                break
                case '月':
                termMt = 30
                break
                default:
                termMt= 1
            }

           

            term=nv[0]*termMt
            console.log("term==>",term,termMt)
            this.ftpRateTermValue = ftpRateTerm[term]
            if (undefined == this.ftpRateTermValue){
                console.log("ftpDay.length",ftpDay.length)
                for(var i =0;i<16;i++){
                    console.log("ftpDay[i]",ftpDay[i])
                    if(ftpDay[i]>term){
                        after= ftpDay[i]
                        before=ftpDay[i-1]
                        break
                    }
                }
                this.termDay=term
                console.log("before",before,"after",after,term)
             this.ftpRateTermValue =   (ftpRateTerm[before]+(((term-before)/(after-before))*(ftpRateTerm[after]-ftpRateTerm[before])))
           
            }
             console.log("this.ftpRateTermValue",this.ftpRateTermValue)
        },
        rateType:function(nv){
            this.ftpRateType= rateTypeArr[nv[1]]
            console.log("rateType---nv",nv,this.ftpRateType)
        },
        mortJR:function(nv){
            this.lgdJR = lgdRateJR[nv]
        console.log("this.lgdJR ",this.lgdJR )
        },
        mortYS:function(nv){
            this.lgdYS = lgdRateYS[nv]
        console.log("this.lgdYS ",this.lgdYS )
        },
        mortTD:function(nv){
            this.lgdTD = lgdRateTD[nv]
        console.log("this.lgdTD ",this.lgdTD )
        },
        mortDB:function(nv){
            this.lgdDB = lgdRateDB[nv]
        console.log("this.lgdDB ",this.lgdDB )
        },discountZF:function(nv){
            this.discountZFRate = scenenArr[nv]
this.discount =   this.discountTHRate + this.discountZFRate + this.discountHQRate + this.discountDQRate       
 console.log("this.discount ",this.discount )
        },discountTH:function(nv){
            this.discountTHRate = scenenArr[nv]
            this.discount =   this.discountTHRate + this.discountZFRate + this.discountHQRate + this.discountDQRate

        console.log("this.discount ",this.discount )
        },discountHQ:function(nv){
            this.discountHQRate = scenenArr[nv]
this.discount =   this.discountTHRate + this.discountZFRate + this.discountHQRate + this.discountDQRate
        console.log("this.discount ",this.discount )
         },discountDQ:function(nv){
            this.discountDQRate = scenenArr[nv]
this.discount =   this.discountTHRate + this.discountZFRate + this.discountHQRate + this.discountDQRate
        console.log("this.discount ",this.discount )
         },
         tgtRate:function(nv){
             var baseRate = this.getBaseRate(this.termDay)
              var data = this.Rate.series[0].data
              this.Rate.series[0].data = [data[0],data[1],(nv*100).toFixed(2)]
              var tgtFloat = (((nv*100-baseRate)/baseRate)*100).toFixed(1)
              console.log("tgtRate=wathc=>",nv,baseRate)
              this.Rate.series[1].data = [this.Rate.series[1].data[0],this.Rate.series[1].data[1],tgtFloat]
         },
         bottomRate:function(nv){
             var baseRate = this.getBaseRate(this.termDay)
             var bottomFloat = (((nv*100-baseRate)/baseRate)*100).toFixed(1)
              var data = this.Rate.series[0].data
              this.Rate.series[0].data = [(nv*100).toFixed(2),data[1],data[2]]
              this.Rate.series[1].data = [bottomFloat,this.Rate.series[1].data[1],this.Rate.series[1].data[2]]
         },
         sceneRate:function(nv){
                          var baseRate = this.getBaseRate(this.termDay)
             var sceneFloat = (((nv*100-baseRate)/baseRate)*100).toFixed(1)
              var data = this.Rate.series[0].data
              this.Rate.series[0].data = [data[0],(nv*100).toFixed(2),data[2]]
              this.Rate.series[1].data = [this.Rate.series[1].data[0],sceneFloat,this.Rate.series[1].data[2]]
         },
         ftpRate:function(nv){
             var data = this.Pars.baseOption.series[0].data
              this.Pars.baseOption.series[0].data = [(nv*100).toFixed(2),data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8]]
         },
         ocRate:function(nv){
             var data = this.Pars.baseOption.series[0].data
              this.Pars.baseOption.series[0].data = [data[0],(nv*100).toFixed(2),data[2],data[3],data[4],data[5],data[6],data[7],data[8]]
         },
         pdRate:function(nv){
            var pd =  (nv*1).toFixed(5)
             var data = this.Pars.baseOption.series[0].data
              this.Pars.baseOption.series[0].data = [data[0],data[1],pd*100,data[3],data[4],data[5],data[6],data[7],data[8]]
         },lgdRate:function(nv){
             var data = this.Pars.baseOption.series[0].data
              this.Pars.baseOption.series[0].data = [data[0],data[1],data[2],(nv*100).toFixed(4),data[4],data[5],data[6],data[7],data[8]]
         },rarocTgt:function(nv){
             
             this.Raroc.series[1].data[0].value = nv
             console.log("rarocTgt=watch=>",nv,this.Raroc.series[0].data[0].value) //= nv
         },rarocScene:function(nv){
            
             this.Raroc.series[0].data[0].value = nv
              console.log("rarocScene=watch=>",nv,this.Raroc.series[0].data[0].value) //= nv
         },prfRate:function(nv){
             var data = this.Pars.baseOption.series[0].data
              this.Pars.baseOption.series[0].data = [data[0],data[1],data[2],data[3],data[4],data[5],(nv*100).toFixed(2),data[7],data[8]]
             
         }
  },mounted(){
    //this.ftpRate=3.4955
    //this.branch = ["重庆","渝中分行"]
   this.ftpRateType= rateTypeArr["-"]
   this.ftpRateTermValue = ftpRateTerm["360"]
    this.ocRateBranch = ocRateBranch["渝中分行"]
    this.ocRateProduct = ocRateProduct["1"]
    this.pdRate=pdRateArr["AAA"]
    this.lgdRate=0.45
    this.discount = 0
    //this.custImplRate = custImplArr['1']
    //this.lgdJR=0
    // this.lgdRate=1
    // this.ocRate=1.9
    // this.principal=10
    // this.custImpl="1"
    // this.custSize="1"
    //this.custGrade="AAA"
    //this.pdRate=0.00095
    //this.lgdRate=1
  }
}

</script>

<style>
.mu-picker-item{
    line-height: 36px;
    padding: 0 10px;
    font-size: 10px;
}
.mu-popup {
    background-color: rgba(255, 255, 255, 0);
}
.mu-picker-item.selected {
    line-height: 36px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.87);
}

.product{
    float:left
}

.div{ 
    height:736px;
    background-color: #fff;
}

.echarts{
    height:140px;
}
.demo-popup-left {
  width: 80%;
  max-width: 375px;
  height: 100%;
  align-items: center;
  padding:16px;
  
}
.demo-popup-right {
  width: 80%;
  max-width: 375px;
  height: 100%;
  align-items: center;
      background-color: rgba(255, 255, 255, 0);

  
}
.content{
    padding-left:16px;
     padding-right:16px;
}
.demo-paper {
  display: inline-block;
  height: 200px;
  width: 100%;
  margin: 50px 10px 0 -5px;
  background-color:#e0f2f1;

  text-align: center;
}

</style>