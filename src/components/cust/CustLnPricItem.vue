<template>

<div class="pric-infinite-container">

  <mu-list>
    <template v-for="item in lnPrics">
     <div v-if="item.BusinessCode">
      <mu-list-item :title="item.BusinessCode" disabled >
      <span slot="describe">    
                 <mu-icon v-if="item.Status == 1" :size="20" value="warning" color="orange"/> <!--计算完成未保存-->
         <mu-icon v-if="item.Status == 0" :size="20" value="check_circle" color="orange"/> <!--未完成利率反算-->
         <mu-icon v-if="item.Status == -1" :size="20" value="error" color="red"/> <!--未完成贷款计算-->
         <mu-icon v-if="item.Status == 2" :size="20" value="done" color="teal"/> <!--计算完成并保存-->
          <mu-icon v-if="item.Status == 3" :size="20" value="history" color="teal"/> <!--	审批中-->
           <mu-icon v-if="item.Status == 4" :size="20" value="gavel" color="teal"/> <!--通过审批-->
            <mu-icon v-if="item.Status == 5" :size="20" value="pan_tool" color="teal"/> <!--驳回审批-->
             <mu-icon v-if="item.Status == 6" :size="20" value="check_box" color="teal"/> <!--已放款-->        
        <span>{{item.Term}} {{item.TermMult | dict('termMult')}}/</span>
        <span>{{item.Product.ProductName}}/</span>
        <span>{{item.Principal /10000 }}万/</span>
        <span>{{item.IntRate * 100 | bankRound(2) }}%</span>

        <!--<span >{{item.Status  | dict('pricingStatus') }}</span>-->
      </span>
      <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
        <mu-menu-item v-if="item.Status != '0' && item.Status != '-1' " title="详情" @click="lnPricDetail(item.BusinessCode)"/>
        <mu-menu-item title="定价" @click="lnpricing(item)"/>
        <mu-menu-item title="删除" @click="open(item)"/>
        <mu-menu-item v-if="item.Status == '2'" title="送审" @click="submitApprove(item)"/>

      </mu-icon-menu>
    </mu-list-item>
    
     </div>
    <mu-divider />
   
    </template>
  </mu-list>
  <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMorePric"/>
     
    <mu-dialog :open="dialog" title="提示">
    确定删除？
    <mu-flat-button label="确定" slot="actions" primary @click="confirm"/>
    <mu-flat-button label="取消" slot="actions" primary @click="close"/>
  </mu-dialog>

  <mu-toast v-if="toast" :message="toastMsg" />
</div>

</template>

<script>

  import {
    mapGetters,
    mapActions
  } from 'vuex'

export default {
        components: {

    },
  data () {
    return {
      loading: false,
      scroller: null,
      dialog: false,
      deleteItem:"",
      toast:false,
      toastMsg:""
    }
  },
  mounted () {
    this.scroller = this.$el
  },
    computed: mapGetters({
    lnPrics: 'checkOutLnPrics',
    messgae: 'checkOutMessage'
  }),
  methods: {
    loadMorePric () {
      this.loading = true

    setTimeout(() => {
    this.$store.dispatch('getLnBusiness',this.$store.state.lnpricingModule.params)

     this.loading = false
       }, 2000)
    },
    custBrief(custID){
              router.push({name:"custbrief",params:{custid:custID}})
    },
    lnPricDetail(businessCode){
       router.push({name:"lnpricdetail",params:{businessCode:businessCode}})
    },lnpricing(item){
     console.log('LnBusiness',item)
      this.$store.state.editOrAdd="edit"

      this.$store.dispatch('setLnBusiness',item)
       
      router.push({name:"editlnpricinfo",params:{businessCode:item.BusinessCode,custCode:item.Cust.CustCode}})

    },open(item){
      this.dialog = true
      this.deleteItem = item
    },
    close () {
      this.dialog = false
    },confirm(){
      this.$store.dispatch('deleteLnPric',{BusinessCode:this.deleteItem.BusinessCode,Status:this.deleteItem.Status})
      this.dialog = false
      router.go(0)
    },initLnPricing(){
      var params = {'StartRowNumber':0, 
        'CurrentPage':0,
        'CustCode':this.$route.params.custcode,
        'NextPage':1,
        'OrderAttr':'CREATE_TIME'}
    this.$store.dispatch('getLnBusiness',params)
    },openToast(message){
          this.toast=true
          this.toastMsg = message
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
    },submitApprove(item){
      var params ={
        businessKey:item.BusinessCode,
        businessCode:item.BusinessCode,
        userId:this.$store.state.auth.user_id,
        json:JSON.stringify({data:item})
      }
      console.log(params)
      this.$store.dispatch('submitApprove',params)

    }
  },created () {
    this.initLnPricing()
  },
  watch: {  
        'messgae': function(val){
          this.openToast(val)
          this.initLnPricing()
        }
    }  
}
</script>

<style lang="css">
.pric-infinite-container{
  height: calc(100vh - 210px);     
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid #d9d9d9;
}
.demo-paper {
  display: inline-block;
  height: 100px;
  width: 100px;
  margin: 20px;
  text-align: center;
}
</style>