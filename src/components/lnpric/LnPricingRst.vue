<template>
  <div>
    <mu-appbar title="贷款定价">
      <mu-icon-button icon='keyboard_backspace' slot="left" touch @click="goBack" />
      <mu-icon-button slot="right" touch @click="scene">派</mu-icon-button>
  
    </mu-appbar>
  
    <mu-list-item title="单笔定价结果" toggleNested :open="false">
      <mu-list-item slot="nested" disabled>
        <mu-flexbox>
          <mu-flexbox-item>
            底线利率
          </mu-flexbox-item>
          <mu-flexbox-item>
            {{lnPric.BottomRate * 100 | bankRound(2)}} %
          </mu-flexbox-item>
          <mu-flexbox-item>
            目标利率
          </mu-flexbox-item>
          <mu-flexbox-item>
            {{lnPric.TgtRate * 100 | bankRound(2)}} %
          </mu-flexbox-item>
  
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item>
            目标EVA
          </mu-flexbox-item>
          <mu-flexbox-item>
            {{lnPric.TgtEva}}
          </mu-flexbox-item>
          <mu-flexbox-item>
            目标ROC
          </mu-flexbox-item>
          <mu-flexbox-item>
            {{lnPric.TgtRaroc *100 | bankRound(2)}}%
          </mu-flexbox-item>
  
        </mu-flexbox>
      </mu-list-item>
    </mu-list-item>
  
    <mu-divider />
  
    <mu-list-item title="派生优惠" toggleNested :open="false">
      <mu-list-item slot="nested" disabled>
        <span class="title">派生业务</span>
        <mu-divider />
        <mu-flexbox>
          <mu-flexbox-item>
            存款
          </mu-flexbox-item>
          <mu-flexbox-item>
            EVA
          </mu-flexbox-item>
          <mu-flexbox-item>
            {{lnPric.DerviedDPEVA }}
          </mu-flexbox-item>
          <mu-flexbox-item>
            优惠
          </mu-flexbox-item>
          <mu-flexbox-item>
            {{lnPric.DerviedDPPoints *100| bankRound(2) }} %
          </mu-flexbox-item>
  
        </mu-flexbox>
        <mu-divider />
  
        <mu-flexbox>
          <mu-flexbox-item>
            中间
          </mu-flexbox-item>
          <mu-flexbox-item>
            EVA
          </mu-flexbox-item>
          <mu-flexbox-item>
            {{lnPric.DerviedIBEVA}}
          </mu-flexbox-item>
          <mu-flexbox-item>
            优惠
          </mu-flexbox-item>
          <mu-flexbox-item>
            {{lnPric.DerviedIBPOints *100 | bankRound(2)}}%
          </mu-flexbox-item>
  
        </mu-flexbox>
        <mu-divider />
        <br>
        <mu-divider />
        <mu-flexbox>
          <mu-flexbox-item>
            存量优惠
          </mu-flexbox-item>
          <mu-flexbox-item>
            {{lnPric.StockPoints *100 | bankRound(2)}}%
          </mu-flexbox-item>
        </mu-flexbox>
        <mu-divider />
        <br>
        <mu-divider />
  
        <mu-flexbox>
          <mu-flexbox-item>
            使用产品
          </mu-flexbox-item>
          <mu-flexbox-item>
            {{lnPric.UseProduct}}
          </mu-flexbox-item>
          <mu-flexbox-item>
            优惠
          </mu-flexbox-item>
          <mu-flexbox-item>
            {{lnPric.UseProductDiscount *100 | bankRound(2)}}%
          </mu-flexbox-item>
  
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item>
            合作年限
          </mu-flexbox-item>
          <mu-flexbox-item>
            {{lnPric.CooperationPeriod}}
          </mu-flexbox-item>
          <mu-flexbox-item>
            优惠
          </mu-flexbox-item>
          <mu-flexbox-item>
            {{lnPric.CooperationPeriodDiscount *100 | bankRound(2)}}%
          </mu-flexbox-item>
  
        </mu-flexbox>
  
      </mu-list-item>
    </mu-list-item>
  
    <mu-divider />
    <mu-list-item title="优惠结果" toggleNested>
      <mu-list-item slot="nested" disabled>
        <mu-flexbox>
          <mu-flexbox-item>
  
          </mu-flexbox-item>
          <mu-flexbox-item>
            综合底线
          </mu-flexbox-item>
          <mu-flexbox-item>
            综合优惠
          </mu-flexbox-item>
          <mu-flexbox-item>
            综合目标
          </mu-flexbox-item>
  
        </mu-flexbox>
  
        <mu-flexbox>
          <mu-flexbox-item>
            利率
          </mu-flexbox-item>
          <mu-flexbox-item>
            {{lnPric.BottomRate * 100 | bankRound(2)}} %
          </mu-flexbox-item>
          <mu-flexbox-item>
            {{lnPric.SceneRate * 100 | bankRound(2)}} %
  
          </mu-flexbox-item>
          <mu-flexbox-item>
            {{lnPric.TgtRate * 100 | bankRound(2)}} %
  
          </mu-flexbox-item>
  
        </mu-flexbox>
  
      </mu-list-item>
    </mu-list-item>
    </mu-list>
  
    <mu-divider />
    <mu-list-item title="过程参数" toggleNested :open="false">
      <mu-list-item slot="nested" disabled>
        <chart :options="bar" auto-resize></chart>
      </mu-list-item>
    </mu-list-item>
  
    <mu-list-item title="利率反算" toggleNested activeClass="title-bg">
      <mu-list-item slot="nested" disabled>
        <mu-flexbox>
          <mu-flexbox-item>
            基准利率
          </mu-flexbox-item>
          <mu-flexbox-item>
            {{lnPric.BaseRate *100}} %
          </mu-flexbox-item>
        </mu-flexbox>
  
        <mu-flexbox>
          <mu-flexbox-item>
            执行利率
          </mu-flexbox-item>
          <mu-flexbox-item>
            <mu-text-field hintText="执行利率" type="number" v-model="intRateInput" fullWidth />
  
          </mu-flexbox-item>
          <mu-flexbox-item>
            <mu-icon value="show_chart" color="blue" /> {{intRateFloat | bankRound(2)}} %
          </mu-flexbox-item>
  
        </mu-flexbox>
  
        <mu-flexbox>
          <mu-flexbox-item>
            上浮比例
          </mu-flexbox-item>
          <mu-flexbox-item>
            <mu-text-field hintText="上浮比例" type="number" v-model="intRateFloatInput" fullWidth />
          </mu-flexbox-item>
          <mu-flexbox-item>
            <mu-icon value="explore" color="blue" /> {{intRate | bankRound(2)}} %
          </mu-flexbox-item>
        </mu-flexbox>
  
        <div class="gutter" v-show="this.intRateInput > 0 || this.intRateFloatInput > 0">
          <mu-raised-button label="反算" class="demo-raised-button " @click="calcul" primary fullWidth :disabled="calculState" />
          <mu-divider />
        </div>
  
      </mu-list-item>
  
    </mu-list-item>
  
    <div v-show="clickedCalcul">
      <mu-list-item title="反算结果" toggleNested>
        <mu-list-item slot="nested" disabled>
  
          <mu-flexbox>
            <mu-flexbox-item>
  
            </mu-flexbox-item>
            <mu-flexbox-item>
              净利润(元)
            </mu-flexbox-item>
            <mu-flexbox-item>
              EVA(元)
            </mu-flexbox-item>
            <mu-flexbox-item>
              RAROC(%)
            </mu-flexbox-item>
          </mu-flexbox>
  
          <mu-flexbox>
            <mu-flexbox-item>
              单笔
            </mu-flexbox-item>
            <mu-flexbox-item>
              {{lnPric.OneLnNetProfit | bankRound(2)}}
            </mu-flexbox-item>
            <mu-flexbox-item>
              {{lnPric.OneLnYearEva | bankRound(2)}}
            </mu-flexbox-item>
            <mu-flexbox-item>
              {{lnPric.OneLnRaroc * 100 | bankRound(2)}}
            </mu-flexbox-item>
          </mu-flexbox>
  
            <mu-flexbox>
            <mu-flexbox-item>
              派生
            </mu-flexbox-item>
            <mu-flexbox-item>
              {{lnPric.SceneNetPorfit | bankRound(2)}}
            </mu-flexbox-item>
            <mu-flexbox-item>
              {{lnPric.SceneYearEva | bankRound(2)}}
            </mu-flexbox-item>
            <mu-flexbox-item>
              
            </mu-flexbox-item>
          </mu-flexbox>

                    <mu-flexbox>
            <mu-flexbox-item>
              综合
            </mu-flexbox-item>
            <mu-flexbox-item>
              {{lnPric.SumNetProfit | bankRound(2)}}
            </mu-flexbox-item>
            <mu-flexbox-item>
              {{lnPric.SumEva | bankRound(2)}}
            </mu-flexbox-item>
            <mu-flexbox-item>
              {{lnPric.SumRaroc * 100 | bankRound(2)}}
            </mu-flexbox-item>
          </mu-flexbox>


        </mu-list-item>
      </mu-list-item>
  
      <mu-list-item title="备注" toggleNested :open="false">
        <mu-list-item slot="nested" disabled>
          <div>
            <mu-text-field hintText="备注" multiLine :rows="3" v-model="lnPric.Remark" :rowsMax="6" icon="comment" />
            <br/>
          </div>
        </mu-list-item>
      </mu-list-item>
      <div class="gutter">
        <mu-raised-button label="保存" class="demo-raised-button " @click="save" primary :disabled="calculState" fullWidth/>
      </div>
    </div>
  
    <mu-toast v-if="toast" :message="message.code" @close="hideToast" />
  
  </div>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex'

export default {
  components: {

  },
  data() {
    return {
      intRateInput: null,
      lnPricIntRate: null,
      intRateFloatInput: null,
      clickedCalcul: false,
      calculState: false,
      toast: false,
      //message: "",
      // lnPric:{
      //   BaseRate:0.0435,
      //   BottomRate:0.078,
      //   IntCon:200,
      //   IntEva:189,
      //   IntRaroc:0.078,
      // },
      bar: {
        baseOption: {
          color: ['#009688'],
          title: {
            // text: '过程参数',
            // x:'center'
          },
          legend: {
            data: ['资金', '运营', '违概', '违损', '经资', '资本', '回报', '增税', '所税'],
            align: 'top',
            // left: 10
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: "{a} <br/>{b} : {c}"
          },
          xAxis: [{
            type: 'category',
            data: ['资金', '运营', '违概', '违损', '经资', '资本', '回报', '增税', '所税'],
            // axisTick: {
            //     alignWithLabel: true
            // }
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            type: 'bar',
            radius: '60%',
            center: ['50%', '60%'],
            data: [3.79, 0.65, 0.44, 35, 10, 3, 3, 6.72, 25
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
            label: {
              normal: {
                show: true,
                formatter: '{c}%',
                position: 'outside',
                textStyle: {
                  color: "#000000",
                  fontStyle: 'normal'
                }
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 5,
                length2: 4
              }
            }
          }]

        },
        media: [{
          query: {
            minAspectRatio: 1 // 当长宽比小于1时。
          },
          option: {
            legend: { // legend 放在底部中间。
              right: 'center',
              bottom: 10,
              orient: 'horizontal' // legend 横向布局。
            },
            series: [ // 两个饼图左右布局。
              {
                radius: [50, '80%'],
                center: ['50%', '60%']
              }
            ]
          }
        },
        {
          query: {
            maxWidth: 500 // 当容器宽度小于 500 时。
          },
          option: {
            legend: {
              right: 10, // legend 放置在右侧中间。
              top: '50%',
              orient: 'vertical' // 纵向布局。
            },
            series: [ // 两个饼图上下布局。
              {
                radius: [30, '60%'], //第一个为中间圈大小 第二个为总大小
                center: ['50%', '50%']
              }
            ]
          }
        }
        ]
      }
    }
  },
  computed: {

    ...mapGetters({
      lnPric: 'checkOutLnPric',
      message:'checkOutMessage'
    }),
    intRateFloat: function (value) {
      if (null == this.intRateInput || this.intRateInput == 0) {
        return 0
      }else{
              this.lnPricIntRate = this.intRateInput / 100
      this.intRateFloatInput = null
      return (this.intRateInput / 100 - this.lnPric.BaseRate) / this.lnPric.BaseRate * 100
      }

    },
    intRate: function (value) {
      if (null == this.intRateFloatInput || 0 == this.intRateFloatInput) {
        return 0
      }else{
              this.intRateInput = null
      this.lnPricIntRate = (this.intRateFloatInput / 100 + 1) * this.lnPric.BaseRate
      return (this.intRateFloatInput / 100 + 1) * this.lnPric.BaseRate * 100
      }

    },

    //  initRateFloat:function(value){
    //   console.log("initRate",value)
    //  return (this.initRate - this.lnPric.BaseRate)/this.lnPric.BaseRate
    // }

  },
  methods: {
    goBack() {
            router.push({
        name: 'lnpricmort',
        params: {
          custCode: this.$route.params.custCode,
          businessCode: this.$route.params.businessCode
        }
      })
    },
    scene() {


      router.push({
        name: 'lnpricingscene',
        params: {
          custCode: this.$route.params.custCode,
          businessCode: this.$route.params.businessCode
        }
      })


    },
    calcul() {
      if (this.lnPricIntRate > 0) {
        var params = {
          BusinessCode: this.$route.params.businessCode,
          IntRate: this.lnPricIntRate
        }
        this.calculState = true
        this.$store.state.message = {}
        console.log("状态位calculState", this.calculState)
        this.$store.dispatch("lnInversePricing", params)
        this.clickedCalcul = true
      } else {
        this.toast = true
        this.message.code = "请输入正数的执行利率"

        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => {
          this.toast = false
        }, 2000)

      }
    },
    hideToast() {

    },
    save() {
      this.lnPric.Status = "2" //计算完成并保存
      //this.lnPric.SceneRate = null

      this.$store.dispatch("saveLnPric", this.lnPric)



    },
    handlePrev() {
      router.push({
        name: 'lnpricmort',
        params: {
          custCode: this.$route.params.custCode,
          businessCode: this.$route.params.businessCode
        }
      })

    },
    handleNext() {

    }
  },
  mounted() {
    console.log("第", this.$store.state.lnPricingSetp, "步")

    this.$store.state.lnPricingSetp = 2
    console.log("执行利率", this.lnPric.IntRate)

    this.$store.dispatch('getLnPrics', {
      'BusinessCode': this.$route.params.businessCode
    })
    console.log("贷款定价单------mounted-----", this.lnPric)
  },
  created() {
    console.log("第", this.$store.state.lnPricingSetp, "步")
    this.$store.state.lnPricingSetp = 2


  },
  watch: {
    'lnPric': function (val) {
      this.calculState = false
      if(val.IntRate != 0){
     this.intRateInput = (val.IntRate * 100).round(2)
      }
 
      this.bar.baseOption.series[0].data = [(val.FtpRate * 100).round(2), (val.OcRate * 100).round(2), val.PdRate * 100, (val.LgdRate * 100).round(2), val.EcRate * 100, val.CapCostRate * 100, val.CapPftRate * 100, val.AddTax * 100, val.IncomeTax * 100] //val.FtpRate *100
    },
    // 'message':function(val){
    //   console.log("OneLnNetProfit",this.$store.state.lnpricingModule.lnPric.OneLnNetProfit)
    //    //this.calculState= false
    // }
  }
}
</script>

<style>
.title-bg {
  background-color: #009688;
  color: #ffffff;
}
</style>