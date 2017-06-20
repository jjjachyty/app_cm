<template>

<div class="demo-infinite-container">

  <mu-list>
    <template v-for="item in lncusts">
     
              <mu-list-item :title="item.CustName" @click="custBrief(item.CustCode)">
      <mu-avatar  color="blueGrey50" backgroundColor="teal500" slot="leftAvatar">{{item.CustName | avatar}}</mu-avatar>
 
      <span>{{item.CustCode}}</span>
      <!--<span slot="describe">
        <span style="color: rgba(0, 0, 0, .87)">
            </span>  {{item}}  <br>
        信用评级:AAA<br> 
        机构:人民路支行<br>行业:'零售业'<br>规模:'大型'
      </span>
      </span>-->
      <!--<mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
        <mu-menu-item title="回复" />
        <mu-menu-item title="标记" />
        <mu-menu-item title="删除" />
      </mu-icon-menu>-->
    </mu-list-item>
       
      <mu-divider/>
    </template>
  </mu-list>
  <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
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
      scroller: null
    }
  },
  mounted () {
    this.scroller = this.$el
  },
    computed: mapGetters({
    lncusts: 'checkOutLnCusts'
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
    custBrief(custCode){
              this.$store.dispatch('getLnCust',{'CustCode':custCode})
              router.push({name:"custbrief",params:{custCode:custCode}})
    },
    
  },created () {
    var params = {'StartRowNumber':0, 
        'CurrentPage':0,
        'NextPage':1,
        'OrderAttr':'CREATE_TIME'}
    this.$store.dispatch('getMyLnCusts',params)
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