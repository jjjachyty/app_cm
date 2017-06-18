<template>
  <div>
    <mu-appbar title="贷款定价">
      <mu-icon-button icon='keyboard_backspace' slot="left" touch @click="goBack" />
    </mu-appbar>
  
  
    <mu-list>
      <span class="title">存款派生</span>
       <mu-flat-button label="添加"  icon="control_point" @click="toggle('dp')" primary/>
        <div>
          <!--<div v-if="1">
          <mu-list-item v-for="mort in lnBusiness.Morts">
            <mu-sub-header>
              <span>{{mort.MortgageName}}</span>
              <span>{{mort.MortgageValue / 10000 }} 万</span>
              <span>{{mort.Currency | dict('currency') }}</span>
              </mu-sub-header>
    
    
            <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
              <mu-menu-item title="编辑" @click="editMort(item)" />
              <mu-menu-item title="删除" @click="deleteMort(item)" />
            </mu-icon-menu>
          </mu-list-item>
        <mu-divider />
        </div>-->
        </div>
      </mu-list-item>
  
    </mu-list>
  
    <mu-divider />
  
    <mu-list>
           <span class="title">中间业务派生</span>
       <mu-flat-button label="添加"  icon="control_point" primary/>
        <div>
          <!--<div v-if="1">
          <mu-list-item v-for="mort in lnBusiness.Morts">
            <mu-sub-header>
              <span>{{mort.MortgageName}}</span>
              <span>{{mort.MortgageValue / 10000 }} 万</span>
              <span>{{mort.Currency | dict('currency') }}</span>
              </mu-sub-header>
    
    
            <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
              <mu-menu-item title="编辑" @click="editMort(item)" />
              <mu-menu-item title="删除" @click="deleteMort(item)" />
            </mu-icon-menu>
          </mu-list-item>
        <mu-divider />
        </div>-->
        </div>
      </mu-list-item>
  
    </mu-list>
  
    <mu-divider />
  
    <mu-list>
      <mu-list-item title="存量优惠">
        <div>
          <mu-row gutter>
            <mu-col width="80" tablet="80" desktop="80">
              <mu-slider v-model="principal" :min="0" :step="1" :max="9999" class="demo-slider" />
            </mu-col>
            <mu-col width="20" tablet="20" desktop="20"> {{principal}}万
            </mu-col>
          </mu-row>
        </div>
      </mu-list-item>
  
    </mu-list>
    <mu-divider />
    <div class="gutter">
          <mu-raised-button label="计算优惠" class="demo-raised-button " @click="calculScene" primary fullWidth/>
    </div>


        <!--抵押存款出框 -->
    <div>
      <mu-drawer :open="dpOpen" :docked="false" @close="sceneDpProduct('close')">
        <mu-appbar title="存款" />
        <mu-row class="context">
          <mu-col width="30" tablet="30" desktop="30">
            <mu-sub-header><strong>存款</strong></mu-sub-header>
          </mu-col>
          <mu-col width="60" tablet="65" desktop="65">
            <mu-text-field hintText="选择存款产品" fullWidth disabled :value="sceneDp.Product" /></mu-col>
          <mu-col width="10" tablet="5" desktop="5">
            <mu-icon-button icon="add_box" @click="openPop" iconClass="form-icon-color" />
          </mu-col>
        </mu-row>
  
        <mu-row class="context">
          <mu-col width="30" tablet="30" desktop="30">
            <mu-sub-header><strong>金额</strong></mu-sub-header>
          </mu-col>
          <mu-col width="60" tablet="60" desktop="65">
  
            <mu-text-field hintText="金额" :errorText="principalErr" type="number" v-model="sceneDp.Principal" fullWidth />
          </mu-col>
          <mu-col width="10" tablet="10" desktop="5">
            <mu-sub-header>元</mu-sub-header>
          </mu-col>
        </mu-row>
  
        <mu-row class="context">
          <mu-col width="30" tablet="30" desktop="30">
            <mu-sub-header><strong>币种</strong></mu-sub-header>
          </mu-col>
          <mu-col width="70" tablet="70" desktop="70">
            <mu-select-field v-model="sceneDp.Currency" :errorText="currencyErr" fullWidth>
              <mu-menu-item value="CNY" title="人民币" />
              <mu-menu-item value="USD" title="美元" />
              <mu-menu-item value="HKD" title="港币" />
              <mu-menu-item value="JPY" title="日元" />
              <mu-menu-item value="EUR" title="欧元" />
              <mu-menu-item value="GBP" title="英镑" />
              <mu-menu-item value="CHF" title="瑞郎" />
            </mu-select-field>
          </mu-col>
        </mu-row>
        <mu-list-item @click="mortToggle('close')" title="保存" />
  
      </mu-drawer>
    </div>



  </div>
  




  </div>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex'
  
  export default {
    components: {
  
    },
    data() {
      return {
        principal: 0,
        dpOpen:false,
        sceneDp:{}
      }
    },
  
    computed: { ...mapGetters({
  
      })
    },
    methods: {
      goBack() {
        router.go(-1)
      },
      toggle(item) {
        switch (item) {
          case 'dp':
            this.dpToggle("open")
            break
          case 'ib':
            this.ibToggle("open")
            break
        }
      },
      dpToggle(type){
           this.dpOpen = !this.dpOpen
      },      ibToggle(type){

      },
      openPop() {
        this.$store.dispatch('getTree', {
          QueryType: "Product",
          ProductCode: "2"
        })
        this['bottomPopup'] = true
  
      },
      closePop() {
        this['bottomPopup'] = false
      },
      handlePrev() {
        router.push({
          name: 'lnpricmort',
          params: {
            custCode: this.$route.params.custCode,
            businessCode: this.$route.params.businessCode
          }
        })
  
      },
      handleNext() {
  
      },
      calculScene(){
                router.push({
          name: 'lnpricrst',
          params: {
            custCode: this.$route.params.custCode,
            businessCode: this.$route.params.businessCode
          }
        })
      },
      mounted() {
        console.log("第", this.$store.state.lnPricingSetp, "步")
  
        this.$store.state.lnPricingSetp = 2
  
  
      },
      created() {
        console.log("第", this.$store.state.lnPricingSetp, "步")
        this.$store.state.lnPricingSetp = 2
      }
    }
  }
</script>

<style >
.gutter{
       padding-left: 16px;
      padding-right: 16px;
}
.title{
   padding-left: 16px;
   font-size: 18px;
}
  .echarts {
height: 50vh;
margin-left: -16px;
}
</style>