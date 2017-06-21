<template>
    <div>
        <!--导航头-->
      <div>
        <mu-appbar title="客户资料">
        <mu-icon-button icon='keyboard_backspace' slot="left" touch @click="back()"/>
        </mu-appbar>
      </div>
      <div>
      <!--客户头-->
    <div v-if="cust">
    <mu-list>
  <mu-row gutter >
    <mu-col width="5" tablet="5" desktop="5"/>
    <mu-col width="20" tablet="20" desktop="20">
            <mu-avatar  color="blueGrey50" backgroundColor="teal500" :size="80">{{cust.CustName | avatar}}</mu-avatar>

    </mu-col>
    <mu-col width="5" tablet="5" desktop="5"/>
    <mu-col width="70" tablet="70" desktop="70">
            <br>
            <mu-col width="100" tablet="50" desktop="50">{{cust.CustName}}</mu-col>
            <br>
            <mu-col width="100" tablet="50" desktop="50">{{cust.CustCode}}</mu-col>
    </mu-col>
   </mu-row>
    </mu-list>
    <mu-divider />
    <!--基本信息-->
    <mu-list>
      <mu-sub-header>基本信息</mu-sub-header>
      <div class="padd-left">
             <mu-flexbox nowrap>
            <mu-flexbox-item >
            机构
            </mu-flexbox-item>
            <mu-flexbox-item >
           {{Branch.OrganName}}
            </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
            <mu-flexbox-item >
            行业
            </mu-flexbox-item>
            <mu-flexbox-item >
             {{Industry.IndustryName}}
            </mu-flexbox-item>
            </mu-flexbox>
     
            <mu-flexbox>
            <mu-flexbox-item >
            规模
            </mu-flexbox-item>
            <mu-flexbox-item >
            {{cust.CustSize | dict('custSize')}}
            </mu-flexbox-item>
            </mu-flexbox>
  
            <mu-flexbox>
            <mu-flexbox-item >
            信用等级
            </mu-flexbox-item>
            <mu-flexbox-item >
           {{cust.CustCredit}}
            </mu-flexbox-item>
            </mu-flexbox>
      </div>
        <mu-list-item>
            <span >更多</span>
            <mu-icon slot="right" value="more_horiz"/>
             </mu-list-item>
    </mu-list>
      
        <mu-divider />
  <!--贷款定价单-->
</div>
  <div style="">

  <chart  :options="bar" auto-resize ></chart>

  </div>

  <!--贷款按钮-->
      <div class="padd-button">
        <mu-raised-button label="贷款定价" class="demo-raised-button" @click="lnpric" primary fullWidth/>
        <br>
         <br>
        <mu-raised-button label="存款定价" class="demo-raised-button" @click="" backgroundColor="teal200" fullWidth/>
      </div>
        
      </div>
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
  data () {
      var self = this
    return {
      num: 15,
      loading: false,
      scroller: null,
      custCode:"",
      bar: {
          baseOption:{
        title: {
          text: ''
        },
        tooltip: {},
        xAxis: {
        //    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        type: 'value'
        },
        yAxis: { 
            type: 'category',
            data: ['存款','贷款','贷款']
        },

       legend: {
        data: ['审批中','未完成','已完成'],
        align: 'left'
    },
    toolbox: {
        feature: {
            myTool1: {
                show: true,
                title: '全部',
                icon: 'path://M579.043025 517.708544c0.068207-0.295564 0.157886-0.587338 0.215989-0.884164 0.263986-1.364139 0.391559-2.747225 0.429451-4.131574 0.006315-0.232409 0.03284-0.462292 0.03284-0.693437s-0.026525-0.462292-0.03284-0.693437c-0.037893-1.384349-0.165465-2.766171-0.429451-4.131574-0.056839-0.296827-0.147782-0.588601-0.215989-0.884164-1.02942-4.452399-3.251199-8.683757-6.719649-12.153471l-302.170747-302.183378c-9.866011-9.864748-25.859281-9.866011-35.726555 0-9.866011 9.864748-9.866011 25.860544 0 35.725292l284.309364 284.320732-284.309364 284.321995c-9.864748 9.866011-9.864748 25.860544 0 35.725292 4.933637 4.932374 11.396879 7.397929 17.862646 7.397929s12.930272-2.466819 17.863909-7.399193l302.170747-302.183378C575.791827 526.393564 578.013605 522.160943 579.043025 517.708544z',
                onclick: function (){
                    self.$store.state.custCode= self.$route.params.custCode
                    router.push({name:"custpriclist",params:{custCode:self.cust.CustCode}})
                    
                }
            }
        }
    },
    series: [ {
            name: '审批中',
            type: 'bar',
            stack: '总量',
            // barMaxWidth: 200,
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [1,2]
        },
        {
            name: '未完成',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [5,3]
        },
        {
            name: '已完成',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [3,3]
        }]
          }, 
           media: [
            {
                option: {
                    legend: {
                        right: 'center',
                        bottom: 0,
                        orient: 'horizontal'
                    },
                    series: [
                        {
                            radius: [10, '10%'],
                            center: ['15%', '10%']
                        }
                    ]
                }
            },
            {
                query: {
                    maxWidth: 500
                },
                option: {
                    legend: {
                        right: 70,
                        top: '10%',
                        orient: 'horizontal'
                    },
                    series: [
                       
                    ]
                }
            }]
      }
    }
  },
    computed: {...mapGetters({
     cust: 'checkOutLnCust'
  }),Branch(){
           return this.cust.Branch
       },Industry(){
         return this.cust.Industry
       }},
  methods: {
    loadMore () {
      this.loading = true
    //   setTimeout(() => {
    //     for (let i = this.num; i < this.num + 15; i++) {
    //       this.list.push('1000' + (i + 1))
    //     }
    //     this.num += 15
    //     this.loading = false
    //   }, 2000)
    setTimeout(() => {
     this.$store.dispatch('getMyLnCusts',this.$store.state.lncustModule.params)
     this.loading = false
       }, 16)
    },
    back(){
      router.push({name:'custs'})
    },
    lnpric(){
         
         this.$store.state.lncust=this.cust
         this.$store.state.lnBusiness = {
        BusinessCode: "",
        Product: {
            ProductName: "",
            ProductCode: ""
        },
        Cust: {
            CustCode: "",
            CustName: ""
        },
        Term: null,
        TermMult: "M",
        Currency: "CNY",
        RateType: "",
        RpymType: "",
        RpymCapitalFreq: "",
        Principal: "",
        BaseRateType: "1",
        MainMortgageType: "4"
    }
    this.$store.state.editOrAdd="add"
        router.push({name:'lnpricinfo',params:{custCode:this.cust.CustCode}})
    }
    
  },created(){
    this.$store.dispatch('getLnCust',{'CustCode':this.$route.params.custCode})
  }
//   ,
  
//   watch: {  
//         'cust': function(val){
//             if(val){
//                  this.custCode = val[0].CustCode
//             }
        
//         }
//     } 
}
</script>

<style lang="css" scoped>
.padd-left{
    padding-left: 16px;
    padding-right: 16px;
}
.padd-button{
     padding-left: 16px;
      padding-right: 16px;
}
.echarts {
height: 160px;
left:16px;
}
</style>