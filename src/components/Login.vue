<template>
  <div class="login">
    <div class="vux-demo">
      <img class="logo" src="../assets/images/login.png">
      <p style="color:#009688"><h7>客户经理版</h7></p>
    </div>
    <div class="demo-grid">
      <mu-row gutter>
        <mu-col width="10" tablet="10" desktop="10"></mu-col>
        <mu-col width="80" tablet="80" desktop="80">
          <!--<mu-text-field hintText="工号"  icon="assignment_ind"/>-->
          <mu-text-field hintText="工号" type="text" icon="assignment_ind" v-model="loginUser.username" fullWidth /><br/>
        </mu-col>
        <mu-col width="10" tablet="10" desktop="10"></mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col width="10" tablet="10" desktop="10"></mu-col>
        <mu-col width="80" tablet="80" desktop="80">
          <mu-text-field hintText="密码" type="password" icon="lock"  v-model="loginUser.password" fullWidth /><br/>
        </mu-col>
        <mu-col width="10" tablet="10" desktop="10"></mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col width="20" tablet="20" desktop="20"></mu-col>
        <mu-col width="60" tablet="60" desktop="60">
          <mu-raised-button label="登录" class="demo-raised-button" @click="userLogin" primary fullWidth/>
        </mu-col>
        <mu-col width="20" tablet="20" desktop="20"></mu-col>
      </mu-row>
      <div class="mu-footer">
        © 2017 Copyright <br> 重庆天健金管科技服务有限公司
      </div>
          <mu-toast v-if="toast"  :message="message.msg" primary/>
    </div>
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
        toast:false,
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
        loginUser:{username:'',password:''}
      }
    },
    computed:{
      ...mapGetters({
       message:'checkOutMessage'
    })
     
    },
    methods: {
          userLogin () {
            //this.$store.state.message={}
           this.$store.dispatch('userLogin',this.loginUser)
                       router.push({ path: "/" })
            }

    },watch:{
      'message':function(val){
        console.log('message',val,val.code)
        if(val.code == "400"){
          this.toast = true
      if (this.toastTimer) clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
        }

      }
    }
  }
</script>
<style scoped>
  .demo-grid div[class*="col-"] {
    background: #fff;
    text-align: center;
    color: #000;
    /*border: 1px solid #ddd;*/
    /*padding: 8px;*/
    /*margin-bottom: 8px;*/
  }
  
  .mu-footer {
    /*background-color: #fff;*/
    text-align: center;
    color: #212121;
    padding: 1.5%
  }
  
  .login {
    /*background-color: #fbf9fe;*/
    align-content: center;
    text-align: center;
    padding-top: calc(100vh - 96vh)
  }
  
  .logo {
    width: 100px;
    height: 80px
  }
  .mu-toast{
    background-color: #009688;
  }
</style>