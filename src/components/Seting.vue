<template>
  <div>
    <br>
    <div class="seting-conext">
  
      <mu-card>
        <mu-card-header :title="auth.user_name" :subTitle="auth.user_phone">
          <mu-avatar color="blueGrey50" backgroundColor="teal500" slot="leftAvatar" :size="20">{{auth.user_name}}</mu-avatar>
        </mu-card-header>
        <mu-card-media>
          <mu-avatar color="blueGrey50" backgroundColor="teal500" slot="leftAvatar" :size="120">{{auth.user_name}}</mu-avatar>
        </mu-card-media>
        <mu-card-title :title="auth.org_unit_desc" :subTitle="auth.role_name" />
  
        <mu-card-text>
  
        </mu-card-text>
  
      </mu-card>
  
      <br>
  
      <mu-flexbox>
        <mu-flexbox-item>
          完成测算
        </mu-flexbox-item>
        <mu-flexbox-item>
          100 次
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-divider />
      <br>
      <mu-flexbox>
        <mu-flexbox-item>
          发放贷款
        </mu-flexbox-item>
        <mu-flexbox-item>
          20 笔
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-divider />
      <br>
      <mu-flexbox>
        <mu-flexbox-item>
          发放金额
        </mu-flexbox-item>
        <mu-flexbox-item>
          23204 万
        </mu-flexbox-item>
      </mu-flexbox>

      <mu-divider />
      <br>
      <mu-flexbox>
        <mu-flexbox-item>
          派生追踪
        </mu-flexbox-item>
        <mu-flexbox-item>
          89%
        </mu-flexbox-item>
      </mu-flexbox>

      <mu-divider />
      <br>
      <mu-flexbox>
        <mu-flexbox-item>
          全行排名(233)
        </mu-flexbox-item>
        <mu-flexbox-item>
          10
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-divider />
      <br>
      <mu-flexbox>
        <mu-flexbox-item>
          本机构排名(10)
        </mu-flexbox-item>
        <mu-flexbox-item>
          2
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-divider />
      <br>
      <mu-row gutter>
        <mu-col width="20" tablet="20" desktop="20"></mu-col>
        <mu-col width="60" tablet="60" desktop="60">
          <mu-raised-button label="退出" class="demo-raised-button" @click="loginOut" primary fullWidth /></mu-col>
        <mu-col width="20" tablet="20" desktop="20"></mu-col>
  
      </mu-row>
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

    }
  }, computed: {
    ...mapGetters({
      auth: 'checkOutAuth'
    })
  }
  , methods: {
    loginOut() {

      sessionStorage.setItem('sid', "")
      router.push({ path: "/login" })


      this.$store.dispatch("loginOut")
      router.push({ path: "/login" })

    }
  }
}
</script>
<style>
.seting-conext {
  padding: 16px;
  padding-bottom: 200px;
  /*padding-right: 16px;*/
}
</style>