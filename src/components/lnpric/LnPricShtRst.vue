<template>
  <div>
      <mu-list>
        <mu-list-item title="定价结果" toggleNested>
          <mu-list-item slot="nested" disabled>
            <mu-flexbox>
              <mu-flexbox-item>
                底线利率
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.BottomRate * 100 | bankRound(2)}} %
              </mu-flexbox-item>
              <mu-flexbox-item>
                上浮比例
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{ this.bottomRateFloat  * 100 | bankRound(2) }} %
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                优惠利率
              </mu-flexbox-item>
              <mu-flexbox-item  v-if="lnPric.SceneRate < lnPric.BottomRate">
                {{  lnPric.BottomRate * 100  | bankRound(2) }} %
                <font class="warning">({{lnPric.SceneRate * 100  | bankRound(2) }} %)</font>
              </mu-flexbox-item>
              <mu-flexbox-item v-else>
                {{  lnPric.SceneRate * 100  | bankRound(2) }} %
              </mu-flexbox-item>

              <mu-flexbox-item>
                上浮比例
              </mu-flexbox-item>
              <mu-flexbox-item  v-if="lnPric.SceneRate < lnPric.BottomRate">
               {{ this.bottomRateFloat * 100  | bankRound(2)}} %
               <font class="warning">({{this.sceneRateFloat * 100  | bankRound(2) }} %)</font>

              </mu-flexbox-item>
               <mu-flexbox-item v-else>
               {{ this.sceneRateFloat * 100  | bankRound(2)}} %
              </mu-flexbox-item>
            </mu-flexbox>            
            <mu-flexbox>
              <mu-flexbox-item>
                目标利率
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.TgtRate * 100 | bankRound(2)}} %
              </mu-flexbox-item>
              <mu-flexbox-item>
                上浮比例
              </mu-flexbox-item>
              <mu-flexbox-item>
               {{ this.tgtRateFloat * 100 | bankRound(2)}} %
              </mu-flexbox-item>
            </mu-flexbox>
                        <mu-flexbox>
              <mu-flexbox-item>
                执行利率
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.IntRate * 100 | bankRound(2)}} %
              </mu-flexbox-item>
              <mu-flexbox-item>
                上浮比例
              </mu-flexbox-item>
              <mu-flexbox-item>
               {{ this.intRateFloat * 100 | bankRound(2)}} %
              </mu-flexbox-item>
            </mu-flexbox>
                <mu-divider />
            <mu-flexbox>
              <mu-flexbox-item>
                单ROC
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.OneLnRaroc * 100 | bankRound(2)}} %
              </mu-flexbox-item>
              <mu-flexbox-item>
                单EVA
              </mu-flexbox-item>
              <mu-flexbox-item>
               {{lnPric.OneLnYearEva | bankRound(2)}} 
              </mu-flexbox-item>
            </mu-flexbox>
                        <mu-flexbox>
              <mu-flexbox-item>
                合ROC
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.SumRaroc  | bankRound(2)}} %
              </mu-flexbox-item>
              <mu-flexbox-item>
                合EVA
              </mu-flexbox-item>
              <mu-flexbox-item>
               {{ lnPric.SumEva  | bankRound(2)}}
              </mu-flexbox-item>
            </mu-flexbox>
 <mu-divider />
         <chart  :options="bar" auto-resize ></chart>

                    <!--<mu-list-item slot="nested" toggleNested disabled>
            <mu-flexbox>
              <mu-flexbox-item>
                资金成本率
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.FtpRate * 100 }}%
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                运营费用率
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.OcRate * 100 }}%
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                违约概率
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.PdRate * 100 }}%
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                违约损失率
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.LgdRate * 100 }}%
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                预期损失率
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.ElRate * 100 }}%
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                资本回报率
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.CapCostRate * lnPric.CapPftRate * 100 }}%
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                经济资本占用率
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.EcRate * 100 }}%
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                优惠点数
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{(lnPric.StockPoints+lnPric.DerviedDPPoints+lnPric.DerviedIBPOints+lnPric.QualitativeDiscount) * 100 }}%
              </mu-flexbox-item>
            </mu-flexbox>
          </mu-list-item>
          </mu-list-item>
        </mu-list-item>
      </mu-list>-->

          </mu-list-item>
        </mu-list-item>
      </mu-list>
    </div>
    
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import {
    pageSize
  } from '../../config'
  export default {
    components: {

    },
    data() {
      var self = this
      var bottom = 12
      return {
        lnBusiness: {},
        organ: {},
        product: {},
        cust: {},
        industry: {},
        bottomRateFloat:0,
        sceneRateFloat:0,
        tgtRateFloat:0,
        intRateFloat:0,
        bar:{
          baseOption: {
            color: ['#009688'],
    title : {
        // text: '过程参数',
        // x:'center'
    },
        legend: {
        data: ['资金', '运营', '违概', '违损', '经资', '资本', '回报','增税','所税','优惠'],
         align: 'top',
        // left: 10
    },    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    tooltip : {
                trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: "{a} <br/>{b} : {c}"
    },
    xAxis : [
        {
            type : 'category',
            data : ['资金', '运营', '违概', '违损', '经资', '资本', '回报','增税','所税','优惠'],
            // axisTick: {
            //     alignWithLabel: true
            // }
        }
    ],    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            type: 'bar',
            radius : '60%',
            center: ['50%', '60%'],
            data:[0,0,0,0,0,0,0,0,0,0
                // {value:0, name:'资金'},
                // {value:0, name:'运营'},
                // {value:0, name:'违概'},
                // {value:0, name:'违损'},
                // {value:0, name:'经资'},
                // {value:0, name:'资本'},
                // {value:0, name:'回报'},
                // {value:0, name:'增税'},
                // {value:0, name:'所税'},
                // {value:0, name:'优惠'}
                
            ],
            label:{
                normal:{
                    show:true,
                    formatter:'{c}%',
                    position:'outside',
                    textStyle:{
                      color:"#000000",
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
   
      },
      media: [
    {
        query: {
            minAspectRatio: 1           // 当长宽比小于1时。
        },
        option: {
            legend: {                   // legend 放在底部中间。
                right: 'center',
                bottom: 10,
                orient: 'horizontal'    // legend 横向布局。
            },
            series: [                   // 两个饼图左右布局。
                {
                    radius: [50,'80%'],
                    center: ['50%', '60%']
                }
            ]
        }
    },  
    {
        query: {
            maxWidth: 500               // 当容器宽度小于 500 时。
        },
        option: {
            legend: {
                right: 10,              // legend 放置在右侧中间。
                top: '50%',
                orient: 'vertical'      // 纵向布局。
            },
            series: [                   // 两个饼图上下布局。
                {
                    radius: [30,'60%'],   //第一个为中间圈大小 第二个为总大小
                    center: ['50%', '50%']
                }
            ]
        }
    }
]
 }
      }
    },
    computed: mapGetters({
      lnPric: 'checkOutLnPrics'
    }),mounted(){
 //this.bar.baseOption.series[0].data[0] = 2
    },
    watch: {
      'lnPric': function (val) {
        this.lnBusiness = val.LnBusiness
        this.organ = this.lnBusiness.Organ
        this.cust = this.lnBusiness.Cust
        this.industry = this.cust.Industry
        this.product = this.lnBusiness.Product

        this.bottomRateFloat = (val.TgtRate-val.BaseRate)/val.BaseRate
        this.sceneRateFloat = (val.SceneRate-val.BaseRate)/val.BaseRate
        this.tgtRateFloat = (val.TgtRate-val.BaseRate)/val.BaseRate
        this.intRateFloat = (val.IntRate-val.BaseRate)/val.BaseRate
console.log('1----------',this.bar.baseOption.series[0].data,val)
        this.bar.baseOption.series[0].data = [(val.FtpRate *100).round(2),(val.OcRate *100).round(2),val.PdRate *100,(val.LgdRate *100).round(2),val.EcRate *100,val.CapCostRate *100,val.CapPftRate *100,val.AddTax *100,val.IncomeTax *100,((val.StockPoints+val.DerviedDPPoints+val.DerviedIBPOints+val.QualitativeDiscount) * 100).round(2)]//val.FtpRate *100
console.log('2----------',this.bar.baseOption.series[0].data,val)
        // this.bar.baseOption.series[0].data[1] = (val.OcRate *100).round(2)
        // this.bar.baseOption.series[0].data[2] = val.PdRate *100
        // this.bar.baseOption.series[0].data[3] = (val.LgdRate *100).round(2)
        // this.bar.baseOption.series[0].data[4] = val.EcRate *100
        // this.bar.baseOption.series[0].data[5] = val.CapCostRate *100
        // this.bar.baseOption.series[0].data[6] = val.CapPftRate *100
        // this.bar.baseOption.series[0].data[7] = val.AddTax *100
        // this.bar.baseOption.series[0].data[8] = val.IncomeTax *100
        // this.bar.baseOption.series[0].data[9] = ((val.StockPoints+val.DerviedDPPoints+val.DerviedIBPOints+val.QualitativeDiscount) * 100).round()
        // console.log('2----------',this.bar.baseOption.series[0])
      }
    }
  }
</script>
<style lang="css" scoped>
.echarts {
height: 50vh;
margin-left: -50px;
}
.mu-item-wrapper{
  margin-left: -20px;
}
.warning{
  color: red;
}
</style>