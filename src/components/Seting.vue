<template>
  <div>
    <br>
    <div class="seting-conext">
  <mu-row gutter>
    <mu-col width="50" tablet="50" desktop="33">        <div class="mu-avatar" style="width: 120px; height: 120px; color: rgb(236, 239, 241); background-color: rgb(0, 150, 136);"><div class="mu-avatar-inner"><!----> <!----> {{auth.user_name}}</div></div>
</mu-col>
    <mu-col width="50" tablet="50" desktop="33">
      <br>
      <span class="seting-title">{{auth.org_unit_desc}}</span>
      <br>
      <span class="seting-title">{{auth.role_name}}</span>
    </mu-col>
  </mu-row>
      <br>  
      <mu-flexbox>
        <mu-flexbox-item>
          <span class="seting-title">完成测算</span>
        </mu-flexbox-item>
        <mu-flexbox-item>
          <span class="seting-val">100 次 </span> 
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-divider />
      <br>
      <mu-flexbox>
        <mu-flexbox-item>
          
           <span class="seting-title">发放贷款</span>
        </mu-flexbox-item>
        <mu-flexbox-item>
                    <span class="seting-val">20 笔</span> 

        </mu-flexbox-item>
      </mu-flexbox>
      <mu-divider />
      <br>
      <mu-flexbox>
        <mu-flexbox-item>
          
            <span class="seting-title">发放金额</span>
        </mu-flexbox-item>
        <mu-flexbox-item>
                    <span class="seting-val">23021 万</span> 

        </mu-flexbox-item>
      </mu-flexbox>

      <mu-divider />
      <br>
      <mu-flexbox>
        <mu-flexbox-item>
          
          <span class="seting-title">派生追踪</span>
        </mu-flexbox-item>
        <mu-flexbox-item>
                    <span class="seting-val">75 %</span> 

        </mu-flexbox-item>
      </mu-flexbox>

      <mu-divider />
      <br>
      <mu-flexbox>
        <mu-flexbox-item>
          <span class="seting-title">全行排名</span>
        </mu-flexbox-item>
        <mu-flexbox-item>
                    <span class="seting-val">第 10 名</span> 

        </mu-flexbox-item>
      </mu-flexbox>
      <mu-divider />
      <br>
      <mu-flexbox>
        <mu-flexbox-item>
          
          <span class="seting-title">本机构排名</span>
        </mu-flexbox-item>
        <mu-flexbox-item>
                    <span class="seting-val">第 2 名</span> 

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

      //sessionStorage.setItem('sid', "")
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
.seting-val{
  font-family: Monoton; 
  font-size: 18px;
      color: rgba(0,150,136,.5);
    text-shadow: -1px 0 1px rgba(40,80,120,.8), 1px -1px 1px rgba(255,255,255,.8);
}
.mu-card-media {
    /* position: relative; */
    padding-left: 50%;
}
.seting-title {
    font-size: 16px;

    line-height: 36px;
          color: rgba(96,125,139,1);
    text-shadow: -1px 0 1px rgba(40,80,120,.8), 1px -1px 1px rgba(255,255,255,.8);
}
</style>