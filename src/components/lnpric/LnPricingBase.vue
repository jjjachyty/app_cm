<template>
<div>
<div >

        <mu-appbar title="贷款定价">
        <mu-icon-button icon='keyboard_backspace' slot="left" touch @click="handlePrev"/>
        </mu-appbar>
      </div>

<div class="padd-left">

            <mu-row  class="context">
            <mu-col width="40" tablet="30" desktop="30">
            <mu-sub-header><strong>定价单号</strong></mu-sub-header>
            </mu-col>
            <mu-col width="60" tablet="60" desktop="60"> 
           <mu-sub-header> {{lnBusiness.BusinessCode}}</mu-sub-header>
            </mu-col>
            </mu-row>          

    <mu-row  class="context">
    <mu-col width="45" tablet="30" desktop="30">
    <mu-sub-header><strong>产品</strong></mu-sub-header>
    </mu-col>
    <mu-col width="50" tablet="65" desktop="65"> 
    <mu-text-field hintText="选择产品" :errorText="productErr" fullWidth disabled :value="lnBusiness.Product.ProductName" /></mu-col>
    <mu-col width="5" tablet="5" desktop="5">
    <mu-icon-button icon="add_box" @click="openPop" iconClass="form-icon-color" />
    </mu-col>
    </mu-row>

    <mu-row  class="context">
    <mu-col width="45" tablet="30" desktop="30">
                <mu-sub-header><strong>期限</strong></mu-sub-header>
</mu-col>
    <mu-col width="15" tablet="40" desktop="40"> 
  <mu-text-field hintText="期限" :errorText="termErr" type="number"  v-model="lnBusiness.Term" fullWidth  />
  </mu-col>
    <mu-col width="15" tablet="10" desktop="10">
       <mu-radio label="年"  labelClass="termMult" name="TermMult" nativeValue="Y" v-model="lnBusiness.TermMult"   uncheckIcon="sentiment_dissatisfied" checkedIcon="sentiment_very_satisfied"/> <br/>
      </mu-col>
      <mu-col width="15" tablet="10" desktop="10">
      <mu-radio label="月" labelClass="termMult" name="TermMult" nativeValue="M" v-model="lnBusiness.TermMult"   uncheckIcon="sentiment_dissatisfied" checkedIcon="sentiment_very_satisfied"/> <br/>
       </mu-col>
       <mu-col width="10" tablet="10" desktop="10">
      <mu-radio label="日"  labelClass="termMult" name="TermMult" nativeValue="D" v-model="lnBusiness.TermMult"  uncheckIcon="sentiment_dissatisfied" checkedIcon="sentiment_very_satisfied"/> <br/>
    </mu-col>
    </mu-row>

            <mu-row  class="context">
            <mu-col width="45" tablet="30" desktop="30">
            <mu-sub-header><strong>币种</strong></mu-sub-header>
            </mu-col>
            <mu-col width="55" tablet="70" desktop="70"> 
            <mu-select-field v-model="lnBusiness.Currency" :errorText="currencyErr" fullWidth>
            <mu-menu-item value="CNY" title="人民币"/>
            <mu-menu-item value="USD" title="美元"/>
            <mu-menu-item value="HKD" title="港币"/>
            <mu-menu-item value="JPY" title="日元"/>
            <mu-menu-item value="EUR" title="欧元"/>
            <mu-menu-item value="GBP" title="英镑"/>
            <mu-menu-item value="CHF" title="瑞郎"/>
          </mu-select-field>
            </mu-col>
            </mu-row>  
     
          <mu-row  class="context">
            <mu-col width="35" tablet="30" desktop="30">
            <mu-sub-header><strong>利率类型</strong></mu-sub-header>
            </mu-col>
            <mu-col width="65" tablet="70" desktop="70"> 
                <mu-picker :slots="rateTypeSlots"   :visible-item-count="1" @change="rateTypeChange" :values="rateType"/>
            </mu-col>
            </mu-row>  
          
           <mu-row  class="context">
            <mu-col width="35" tablet="30" desktop="30">
            <mu-sub-header><strong>还款方式</strong></mu-sub-header></mu-col>
            <mu-col width="65" tablet="70" desktop="70"> 
                <mu-picker :slots="rpymTypeSlots"   :visible-item-count="1" @change="rpymTypeChange" :values="rpymType"/>
            </mu-col>
            </mu-row>  
           <mu-row  class="context">
            <mu-col width="45" tablet="30" desktop="30">
            <mu-sub-header><strong>金额</strong></mu-sub-header>
            </mu-col>
            <mu-col width="45" tablet="60" desktop="65"> 
           
            <mu-text-field hintText="金额" :errorText="principalErr" type="number" v-model="lnBusiness.Principal" fullWidth  />
             </mu-col>
            <mu-col width="10" tablet="10" desktop="5"> 
            <mu-sub-header>元</mu-sub-header>
            </mu-col>
            </mu-row> 

            <mu-row  class="context">
            <mu-col width="45" tablet="30" desktop="30">
            <mu-sub-header><strong>基准参考</strong></mu-sub-header></mu-col>
            <mu-col width="55" tablet="70" desktop="70"> 
             <mu-select-field v-model="lnBusiness.BaseRateType" :errorText="baseRateTypeErr" fullWidth>
            <mu-menu-item value="1" title="央行"/>
            <mu-menu-item value="2" title="LPR"/>
          </mu-select-field>            </mu-col>
            </mu-row>  
                        <mu-row  class="context">
            <mu-col width="45" tablet="30" desktop="30">
            <mu-sub-header><strong>主担保方式</strong></mu-sub-header></mu-col>
            <mu-col width="55" tablet="70" desktop="70"> 
             <mu-select-field v-model="lnBusiness.MainMortgageType" :errorText="mainMortgageTypeErr" fullWidth>
            <mu-menu-item value="1" title="抵押"/>
            <mu-menu-item value="2" title="质押"/>
            <mu-menu-item value="3" title="保证"/>
            <mu-menu-item value="4" title="信用"/>
          </mu-select-field>

            </mu-col>
            </mu-row>  

            

</div>
</mu-list>

       <mu-divider />
       <mu-toast v-if="toast" message="一段简单的文本" @close="hideToast"/>
  <div class="demo-step-content">
     <mu-row >
            <mu-col width="35" tablet="40" desktop="40"></mu-col>
            <mu-col width="50" tablet="30" desktop="30">
        <mu-raised-button  label="下一步" :disabled="activeStep >= 2"  @click="handleNext" backgroundColor="#a4c639"/>
        </mu-col>
        <mu-col width="15" tablet="30" desktop="30"></mu-col>
        </mu-row>
  </div>

<div>
    <div>
       
<mu-popup scrollable position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup">
    <mu-appbar title="产品">
      <mu-flat-button slot="right" label="关闭" color="white" @click="closePop"/>
    </mu-appbar>
    <mu-content-block>
    <mu-menu desktop autoWidth scrollable >
    <div v-for="lnProduct in lnProducts">
    
      <mu-menu-item :title="lnProduct.name" v-if="lnProduct.isParent == 1" value="lnProduct.id" @click="choiseProduct(lnProduct)" rightIcon="keyboard_arrow_right"/>
      <mu-menu-item :title="lnProduct.name" v-else value="lnProduct.id" @click="choiseProduct(lnProduct)"/>
       
    </div>
    </mu-menu>
    </mu-content-block>
  </mu-popup>
    </div>
</div>
</div>

</template>

<script>

const rateType={
  '固定利率':[''],
  '浮动利率':['一个月','三个月','六个月','一年']
}

const rpymType={
  '一次还款':[''],
  '等额本金':['一次还本','按月还本','按季还本','按年还本'],
  '等额本息':['一次还本','按月还本','按季还本','按年还本']
}

const rateTypeDict={'固定利率':'1','浮动利率':'2'}
const repriceFreqDict={'':'0','一个月':'30','三个月':'90','六个月':'180','一年':'360'}
const rpymTypeDict={'一次还款':'1','等额本金':'3','等额本息':'2','不定期不定额':'4'}
const rpymCapitalFreqDict={'一次还本':'0','按月还本':'30','按季还本':'90','按年还本':'360'}

  import {
    mapGetters,
    mapActions
  } from 'vuex'
import Validator from '../../validator'
export default {
        components: {
            
    },
  data () {
        return {
             bottomPopup: false,
             activeStep: 0,
             toast: false,
             principalErr:'',
             productErr:'',
             termErr:'',
             currencyErr:'',
             baseRateTypeErr:'',
             mainMortgageTypeErr:'',
            //  lnBusiness:{
            //    BusinessCode:"",
            //    Product:{
            //    ProductName:"",
            //    ProductCode:""
            //  },
            //  Cust:{
            //    CustCode:"",
            //    CustName:""
            //  },
            //  Organ:{
            //    OrganCode:"",
            //    OrganName:""
            //  },
            //  Term:0,
            //  TermMult:"",
            //  Currency:"",
            //  RateType:"",
            //  RpymType:"",
            //  RpymCapitalFreq:"",
            //  Principal:"",
            //  BaseRateType:"",
            //  MainMortgageType:""
            //  },
             rateTypeSlots: [
        {
          width: '100%',
          textAlign: 'right',
          values: Object.keys(rateType)
        }, {
          width: '100%',
          textAlign: 'left',
          values: ['固定利率','']
        }
      ],
            rateType: ['固定利率', ''],
            rateTypeItem: '固定利率',
            rateTypeSubItem: '',
      rpymTypeSlots: [
        {
          width: '100%',
          textAlign: 'right',
          values: Object.keys(rpymType)
        }, {
          width: '100%',
          textAlign: 'left',
          values: ['一次还款','一次还本']
        }
      ],
            rpymType: ['一次还款', '一次还本'],
            rpymTypeItem: '一次还款',
            rpymTypeSubItem: '一次还本'

        }
  },computed: {...mapGetters({
    // lnBusinessCode:'checkOutLnBusinessCode',
    lnProducts:'checkOutTree',
    lnBusiness:'checkOutLnBusiness',
    lnBusinessStatus:'checkOutSaveLnBusinessStatus'
  }),
  activeStep1:function(){
    return this.activeStep
  }
  },
  methods: { 
    goBack(){
            router.go(-1)
    },
    openPop () {
      this.$store.dispatch('getTree',{QueryType:"Product",ProductCode:"1901"})
      this['bottomPopup'] = true

    },
    closePop () {
      this['bottomPopup'] = false
    },choiseProduct(lnProduct){
      if(lnProduct.isParent == 1){ //父节点
        this.$store.dispatch('getTree',{QueryType:"Product",ProductCode:lnProduct.id})
      }else{
        this.$store.state.lnBusiness.Product.ProductName=lnProduct.name
        this.$store.state.lnBusiness.Product.ProductCode=lnProduct.id
        this.closePop()
      }
    },
     rateTypeChange (value, index) {
      switch (index) {
        case 0:
          this.rateTypeItem = value
          const arr = rateType[value]
         console.log("arr",arr)
          this.rateTypeSlots[1].values = arr
          this.rateTypeSubItem = arr[0]
          break
        case 1:
          this.rateTypeSubItem = value
          break
      }
       this.rateType = [this.rateTypeItem, this.rateTypeSubItem]
      this.lnBusiness.RateType=rateTypeDict[this.rateTypeItem]
      this.lnBusiness.RepriceFreq=repriceFreqDict[this.rateTypeSubItem]
    },     
    rpymTypeChange (value, index) {
      switch (index) {
        case 0:
          this.rpymTypeItem = value
          const arr = rpymType[value]
          console.log("arr",arr)
          this.rpymTypeSlots[1].values = arr
          this.rpymTypeSubItem = arr[0]
          break
        case 1:
          this.rpymTypeSubItem = value
          break
      }
       this.rpymType = [this.rpymTypeItem, this.rpymTypeSubItem]
       this.lnBusiness.RpymType=rpymTypeDict[this.rpymTypeItem]
       this.lnBusiness.RpymCapitalFreq=rpymCapitalFreqDict[this.rpymTypeSubItem]

    },    handleNext () {
      var lnBusiness = this.lnBusiness
      
      lnBusiness.Cust.CustCode = this.$route.params.custCode
      //lnBusiness.Cust.CustName = this.$store.state.lncust.CustName
      lnBusiness.RateType=parseInt(rateTypeDict[this.rateTypeItem])
      lnBusiness.RepriceFreq=parseInt(repriceFreqDict[this.rateTypeSubItem])
      lnBusiness.RpymType=parseInt(rpymTypeDict[this.rpymTypeItem])
      lnBusiness.RpymCapitalFreq=parseInt(rpymCapitalFreqDict[this.rpymTypeSubItem])
      lnBusiness.Principal = parseInt(lnBusiness.Principal)


      lnBusiness.Status="-1"

      this.validLnBusiness(lnBusiness)
   
      if(this.lnBusinessValid == 3){
        console.log("LnPricingBase.vue----",lnBusiness)
        this.$store.state.lnBusiness

       this.$store.dispatch('saveLnBusinessInfo',lnBusiness)

       if ('editlnpricinfo' == this.$route.name){
              router.push({ name: 'editlnpricmort', params: { custCode: this.$route.params.custCode, businessCode: this.$route.params.businessCode } })

       }else{
              router.push({ name: 'lnpricmort', params: { custCode: this.$route.params.custCode, businessCode: this.$route.params.businessCode } })

       }

      //  if(this.lnBusinessStatus.code == 200){
      //       this.activeStep++
      //       router.push({name:'lnpricmort'})
      //  }else{
      //    this.showToast()
      //  }
      }

    },
    validLnBusiness(lnBusiness){
      this.lnBusinessValid = 0
      if(lnBusiness.Principal == ""){
          this.principalErr="金额必填"
      }else{
        if (!Validator.positive(lnBusiness.Principal)){
          this.principalErr="请输入正数"
        }else{
          this.principalErr=''
          this.lnBusinessValid++
        }
        
      }
      if(lnBusiness.Product.ProductCode == ""){
          this.productErr="未选择产品"
      }else{
        this.productErr=''
        this.lnBusinessValid++
      }
      if(lnBusiness.Term == 0){
          this.termErr="期限必填"
      }else{
        if (!Validator.positiveInteger(lnBusiness.Term)){
          this.termErr="请输入正整数"
        }else{
          this.termErr=''
          this.lnBusinessValid++
        }
      }

    },
    handlePrev () {
      if(this.$route.name=='editlnpricinfo'){
                router.push({name:'list'})

      }else{
      router.push({name:'custbrief',params:{custCode:$route.params.custCode}})
    
      }

    },
      changeStep (index) {
        
          this.activeStep = index
        
      
    },
    showToast () {
      this.toast = true
      if (this.toastTimer) clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
    },    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    }
  
  },mounted () {

      //  this.rateTypeSlots: [
      //   {
      //     width: '100%',
      //     textAlign: 'right',
      //     values: Object.keys(rateType)
      //   }, {
      //     width: '100%',
      //     textAlign: 'left',
      //     values: ['固定利率','']
      //   }
      // ],
      var rateTypeVar = this.$store.state.lnBusiness.RateType
      var repriceFreqVar = String(this.$store.state.lnBusiness.RepriceFreq)
      var rpymTypeVar = this.$store.state.lnBusiness.RpymType
      var rpymCapitalFreqVar = String(this.$store.state.lnBusiness.RpymCapitalFreq)


       this.rateTypeSlots[1].values= rateType[rateTypeVar.dict('rateType')]
       this.rateType = [rateTypeVar.dict('rateType'), repriceFreqVar.dict('repriceFreq')]
   

    // switch(rpymType){
    //     case '1': //一次还款
    //     this.rpymTypeSlots[0].values=[rpymType.dict('rpymType')]
    //     this.rpymTypeSlots[1].values=[rpymCapitalFreq.dict('rpymCapitalFreq')]
    //     case '2': //等息

    //     case '3'://等本
    // }

        this.rpymTypeSlots[1].values=rpymType[rpymTypeVar.dict('rpymType')]
        this.rpymType=[rpymTypeVar.dict('rpymType'),rpymCapitalFreqVar.dict('rpymCapitalFreq')]

       

    console.log("mounted",this.$store.state.lnBusiness.BusinessCode)
    if ("" == this.$store.state.lnBusiness.BusinessCode){
          this.$store.dispatch('getLnBusinessCode',this.$store.state.lnBusiness)
          }
          this.$store.dispatch('getTree',{QueryType:"Product",ProductCode:"B"})
  }
  // ,watch :{
  //     'lnBusiness': function(){
  //      console.log("xxxxx")
  //      this.$store.state.lnBusiness = this.lnBusiness
  //      return this.lnBusiness
  //    }
  // }
}
</script>

<style >
.demo-popup-bottom {
height: 200px;
width: 100%;
}
.context{
  margin-right:16px;
}
.form-icon-color{
  color:teal;
}
.termMult{
   margin-left:-15px;
}
.mu-picker-item {
    line-height: 20px;
    font-size: 14px;

}
.mu-select-field .mu-dropDown-menu {
    display: block;
    width: 100%;
    height: 20px;
}
.mu-select-field .mu-dropDown-menu-text {
    line-height: 20px;
    height: 20px;
    padding-left: 0;
    padding-right: 24px;
    word-wrap: break-word;
    overflow: hidden;
}
.mu-sub-header {
    color: rgba(0, 0, 0, .54);
    font-size: 14px;
    line-height: 32px;
    padding-left: 16px;
    width: 100%;
}
</style>