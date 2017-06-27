<template>
<div>

<div class="gridlist-demo-container">
  <mu-grid-list class="gridlist-demo">
    <mu-grid-tile v-for="tile,index in list" :key="'tile' + index" titlePosition="bottom"  :rows="tile.featured ? 2 : 1" :cols="tile.featured ? 2 : 1">
     <img class="home-img" :src="tile.image"/>
      <span slot="title">{{tile.title}}</span>
      <mu-icon-button v-if="tile.button"icon="fingerprint" slot="action" :href="tile.href"/>
    </mu-grid-tile>
  </mu-grid-list>
      <mu-divider />
      <mu-list>
    <mu-list-item v-if="auth.role_id != 'rpmcm'" title="审批" @click="myApproves">
       <mu-badge :content="approvesCount" class="demo-icon-badge" circle slot="after" secondary>
    <mu-icon value="notifications"/>
  </mu-badge>
    </mu-list-item>
      </mu-list>
            <mu-divider />
    <!--<mu-icon value="access_alarm" class="tz" color="orange" :size="48"/>
     <mu-divider />

  <div class="">
   
  <mu-sub-header></mu-sub-header>
  <mu-content-block>
    <a>关于我行停止提供个人住房贷款通知</a>
  </mu-content-block>
</div>-->
</div>
   <!-- <a href="/lnpricsim">模拟定价</a>-->
</div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
export default {
  data () {
    return {
      list: [{
        image: 'static/images/slogin.png',
        title: '天健金管科技-外部产品定价产品',
        author: '',
        featured: true
      }, {
        image: 'static/images/ln.png',
        title: '贷款测算',
        href:'#/lnpricsim',
        button:true,
      }
      , {
        image: 'static/images/dp.png',
        title: '存款测算(未开放)',
        href:'',
        button:false
      }
      ]
    }
  },methods:{
    myApproves:function(){
      router.push("/approves")
    }
  },computed:{
    ...mapGetters({
            approvesCount:'checkOutApprovesCount',
            auth:'checkOutAuth'
    })
  },created(){
    var params = { userId: this.$store.state.auth.user_id }
    this.$store.dispatch("getMyApproves", params)
  }, watch: {
  }
}
</script>

<style>
.gridlist-demo-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.gridlist-demo{

  overflow-y: auto;
}
.tz{
  margin-right: 650px;
}
.home-img{
  width:100%
}
</style>