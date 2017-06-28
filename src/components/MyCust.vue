<template>
  <div>
      <div>
        <mu-appbar title="我的客户">
        <!--<mu-icon-button icon='expand_more' slot="right"/>-->
              <mu-icon-button slot="right" touch @click="addCust">+</mu-icon-button>

        </mu-appbar>
      </div>
      <div >
          <mu-text-field icon="search" @blur="serchCust" class="appbar-search-field" fullWidth hintText="请输入客户号/客户名字" v-model="serchValue"/>
       <CustItem></CustItem>
      </div>

  </div>

</template>


<script>
import CustItem from 'components/cust/CustItem'

export default {
            components: {
CustItem
    },
  data () {
    return {
      serchValue:null
    }
  },
  methods: {
    serchCust () {
        var parms = {'CustName':this.serchValue,'CustCode':this.serchValue,'CurrentPage':1, 'NextPage':2,'StartRowNumber': 0,'OrderAttr':'CREATE_TIME'}
           this.$store.dispatch('getMyLnCusts',parms)

    },addCust(){
        router.push({name:'addcust'})
    }
  }
}
</script>
<style lang="css" scoped>


</style>