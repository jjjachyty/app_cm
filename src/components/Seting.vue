<template>
<div>
          <mu-raised-button label="退出" class="demo-raised-button" @click="loginOut" primary fullWidth/>

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
    data() {
      return {
       
  }
    },methods:{
        loginOut(){

                      sessionStorage.setItem('sid', "")
            router.push({ path: "/login" })

            
            this.$store.dispatch("loginOut")
                        router.push({ path: "/login" })

        }
    }
  }
</script>
<style>

</style>