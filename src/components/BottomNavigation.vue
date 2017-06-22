<template>
    <div class='bottom-nav'>
  <mu-paper style=" ">
    <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
      <mu-bottom-nav-item value="/" title="首页" icon="home"/>
      <mu-bottom-nav-item value="custs" title="客户" icon="people"/>
      <mu-bottom-nav-item value="list" title="业务" icon="list"/>
      <mu-bottom-nav-item value="seting" title="我的" icon="settings"/>
    </mu-bottom-nav>
  </mu-paper>

    </div>
</template>

<script>
export default {
  data () {
    return {
      bottomNav: '',
      toast: false
    //   ,
    //   bottomNavColor: 'home'
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
      this.$router.push({path:val})
    }
  },mounted(){
     this.bottomNav = this.$route.name
  }
}

</script>
<style>
.bottom-nav{
position: fixed;
left: 0;
right: 0;
bottom: 0
}
</style>