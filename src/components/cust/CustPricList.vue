<template>
    <div>
            <!--导航头-->
      <div>
        <mu-appbar title="客户定价单">
        <mu-icon-button v-if="$route.path != '/list'" icon='keyboard_backspace' slot="left" touch @click="back()"/>
        </mu-appbar>
      </div>
    <div>
  <mu-tabs :value="activeTab" @change="handleTabChange">
    <mu-tab value="tab1" title="贷款"/>
    <mu-tab value="tab2" title="存款"/>
  </mu-tabs>
  <div v-if="activeTab === 'tab1'">
                <mu-text-field icon="search" @blur="serchLnPric" class="appbar-search-field" fullWidth hintText="请输入订单号" v-model="serchLnPricValue"/>

   <CustLnPricItem></CustLnPricItem>

  </div>
  <div v-if="activeTab === 'tab2'">
                <mu-text-field icon="search" @blur="serchDpPric" class="appbar-search-field" fullWidth hintText="请输入订单号" v-model="serchDpPricValue"/>
  </div>
</div>
    </div>
</template>

<script>
 import CustLnPricItem from 'components/cust/CustLnPricItem'
export default {
     components: {
      CustLnPricItem
    },
  data () {
      
    return {
      activeTab: 'tab1',
      serchLnPricValue:'',
      serchDpPricValue:''
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    },
    handleActive () {
      
    },
    back(){
      var custCode = this.$route.params.custCode
        router.push({name:"custbrief",params:{custCode:custCode}})

    },
    serchLnPric(){
      var params = {'StartRowNumber':0, 
        'CurrentPage':0,
        'CustCode':this.$route.params.custcode,
        'NextPage':1,
        'BusinessCode':this.serchLnPricValue,
        'OrderAttr':'UPDATE_TIME'}
    this.$store.dispatch('getLnBusiness',params)
    },

    serchDpPric(){

    }
  },mounted(){

  }
}
</script>