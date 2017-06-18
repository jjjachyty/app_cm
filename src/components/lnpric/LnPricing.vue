<template>
<div>
<div >

        <mu-appbar title="贷款定价">
        <mu-icon-button icon='keyboard_backspace' slot="left" touch @click="goBack"/>
        </mu-appbar>
      </div>
<div class="demo-step-container">
  <mu-stepper :activeStep="lnPricingSetp" :linear="false">
    <mu-step>
      <mu-step-button @click="changeStep(0)">
        基本信息
      </mu-step-button>
    </mu-step>
    <mu-step>
      <mu-step-button @click="changeStep(1)">
        抵押品
      </mu-step-button>
    </mu-step>
    <mu-step>
      <mu-step-button @click="changeStep(2)">
        定价
      </mu-step-button>
    </mu-step>
  </mu-stepper>

</div>
 <mu-divider />
      <div>

          <router-view></router-view>

      </div>
       <mu-divider />
       <mu-toast v-if="toast" message="一段简单的文本" @close="hideToast"/>
<!--  <div class="demo-step-content">
     <mu-row >
            <mu-col width="15" tablet="40" desktop="40"></mu-col>
            <mu-col width="60" tablet="30" desktop="30">
        <mu-raised-button  label="上一步" :disabled="activeStep === 0" @click="handlePrev"/>
        <mu-raised-button  label="下一步" :disabled="activeStep >= 2"  @click="handleNext"/>
        </mu-col>
        <mu-col width="10" tablet="30" desktop="30"></mu-col>
        </mu-row>-->
  </div>
</div>
</div>
</template>

<script>

  import {
    mapGetters,
    mapActions
  } from 'vuex'
import  v from '../../validator'
export default {
        components: {

    },
  data () {
        return {
      toast: false,
      lnBusinessValid:0
    }
  },
  mounted () {
    
  },
    computed: mapGetters({
      lnPricingSetp:'checkOutLnPricingSetp'
  }),
  methods: {  
    handleNext () {
         console.log(this.$root.$children[0].$children[0].$children[3])
      this.validLnBusiness(this.$root.$children[0].$children[0].$children[3].lnBusiness)
   
      if(this.lnBusinessValid == 3){
      this.lnPricingSetp++
      router.push({name:'lnmort'})
      }
      // console.log(this.$children[3])

      //this.showToast()
    },
    validLnBusiness(lnBusiness){
      this.lnBusinessValid = 0
      console.log()
      if(lnBusiness.Principal == ""){
          this.$children[3].$data.principalErr="金额必填"
      }else{
        if (!v.Validator.positive(lnBusiness.Principal)){
          this.$children[3].$data.principalErr="请输入正数"
        }else{
          this.$children[3].$data.principalErr=''
          this.lnBusinessValid++
        }
        
      }
      if(lnBusiness.Product.ProductCode == ""){
          this.$children[3].$data.productErr="未选择产品"
      }else{
        this.$children[3].$data.productErr=''
        this.lnBusinessValid++
      }
      if(lnBusiness.Term == 0){
          this.$children[3].$data.termErr="期限必填"
      }else{
        if (!v.Validator.positiveInteger(lnBusiness.Term)){
          this.$children[3].$data.termErr="请输入正整数"
        }else{
          this.$children[3].$data.termErr=''
          this.lnBusinessValid++
        }
      }

    },
    handlePrev () {
      router.push({name:'lnbase'})
      this.lnPricingSetp--
    },
      changeStep (index) {
        var custCode = this.$store.state.lnBusiness.Cust.CustCode
        var lnBUsinessCode = this.$store.state.lnBusiness.BusinessCode
        switch (index){
          case 0:
          router.push({ name: 'lnpricinfo' ,params:{custcode:custCode}})
          break;
        case 1:
          router.push({ name: 'lnpricmort' ,params:{businesscode:lnBUsinessCode}})
          break;
        case '2':
         }
    },
    goBack(){
            var cust = this.$store.state.lncust
            router.push({ name: 'custbrief',params:{custcode:cust.CustCode} })
    },
    showToast () {
      this.toast = true
      if (this.toastTimer) clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
    },    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    }
  },created () {
         
    
  }
}
</script>

<style lang="css">
.demo-step-content{
  margin-right:2;
}
</style>