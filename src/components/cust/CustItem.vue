<template>

<div class="demo-infinite-container">

  <mu-list>
    <template v-for="item in lncusts">
     
       
      <mu-list-item >
      <mu-avatar v-if="item.Status == '01'"  backgroundColor="orange900"  slot="leftAvatar">{{item.CustName | avatar}}</mu-avatar>
      <mu-avatar v-if="item.Status == '02'"  backgroundColor="teal500" slot="leftAvatar">{{item.CustName | avatar}}</mu-avatar>
      <div @click="custBrief(item)">
      <span >{{item.CustName}}</span><br>
      <span >{{item.CustCode}}</span>
      </div>
        <mu-icon-menu v-if="item.Status == '01'" slot="right" icon="more_vert" tooltip="操作">
        <mu-menu-item  title="编辑" @click="editCust(item)"/>
        <mu-menu-item  title="删除" @click="delCust(item)"/>

      </mu-icon-menu>
    </mu-list-item>


      <mu-divider/>
    </template>
  </mu-list>
  <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>

    <mu-toast v-if="toast" :message="message.msg" @close="hideToast" />

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
      num: 15,
      loading: false,
      scroller: null,
      open:false,
      toast:false
    }
  },
  mounted () {
    this.scroller = this.$el
  },
    computed: mapGetters({
    lncusts: 'checkOutLnCusts',
    message:'checkOutMessage'
  }),
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
       }, 200)
    },
    custBrief(item){
     
             this.$store.dispatch('getLnCust',{'CustCode':item.CustCode})
             router.push({name:"custbrief",params:{custCode:item.CustCode}})
    },editCust(item){
      console.log("item",item)
      this.$store.state.editCust=item
      this.$store.state.editOrAdd="edit"
        router.push({name:'addcust'})
    },delCust(item){
       this.$store.dispatch('delLnCust',item)
    }
    
  },mounted(){
    
  }
  ,created () {
    var params = {'StartRowNumber':0, 
        'CurrentPage':0,
        'NextPage':1,
        'OrderAttr':'CREATE_TIME'}
    this.$store.dispatch('getMyLnCusts',params)
  },watch:{
        'message':function(val){
       this.toast= true
       if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => { this.toast = false }, 2000)

    }
  }
}
</script>

<style lang="css">
.demo-infinite-container{
       height: calc(100vh - 160px);     

  overflow: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid #d9d9d9;
}
</style>