<template>
  <div>
  
    <mu-appbar title="贷款定价">
      <mu-icon-button icon='keyboard_backspace' slot="left" touch @click="goBack" />
    </mu-appbar>
  
    <!-- <mu-float-button icon="add"  mini primay class="demo-float-button"/>-->
    <mu-icon-menu icon="playlist_add" iconClass="icon-button" :anchorOrigin="leftTop" :targetOrigin="leftTop" @itemClick="toggle">
      <mu-menu-item title="抵质押" value="mort" />
      <mu-menu-item title="担保" value="guarante" />
    </mu-icon-menu>
    <mu-divider />
    <div>
      <mu-sub-header>抵押品</mu-sub-header>
      <!--<div v-if="lnBusiness.Morts">
            <mu-list-item v-for="mort in lnBusiness.Morts">
              <mu-sub-header>
                <span>{{mort.MortgageName}}</span>
                <span>{{mort.MortgageValue / 10000 }} 万</span>
                <span>{{mort.Currency | dict('currency') }}</span></mu-sub-header>
      
      
              <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
                <mu-menu-item title="编辑" @click="editMort(item)" />
                <mu-menu-item title="删除" @click="deleteMort(item)" />
              </mu-icon-menu>
            </mu-list-item>
          <mu-divider />
    
          </div>-->
      <div v-if="lnMorts">
        <mu-list-item v-for="lnMort in lnMorts">
          <mu-sub-header>
            <span>{{lnMort.MortgageName}}</span>
            <span>{{lnMort.MortgageValue / 10000 }} 万</span>
            <span>{{lnMort.Currency | dict('currency') }}</span></mu-sub-header>
          </mu-sub-header>
  
  
          <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
            <mu-menu-item title="编辑" @click="editMort(lnMort)" />
            <mu-menu-item title="删除" @click="deleteMort(lnMort)" />
          </mu-icon-menu>
        </mu-list-item>
      </div>
    </div>
    <mu-divider />
    <mu-divider />
  
    <mu-sub-header>保证人</mu-sub-header>
  
    <div>
  
      <!--<div v-if="lnBusiness.Guarantes">
            <mu-list-item v-for="guarante in lnBusiness.Guarantes" id="guarante.Guarante.CustName">
              <mu-sub-header>
                <span>{{guarante.Guarante.CustName }}</span>
                <span>{{guarante.GuaranteType | dict('mortgageType')}}</span>
              </mu-sub-header>
      
      
              <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
                <mu-menu-item title="编辑" @click="editGuarante(guarante)" />
                <mu-menu-item title="删除" @click="deleteGuarante(guarante)" />
              </mu-icon-menu>
            </mu-list-item>
      
          </div>-->
  
      <div v-if="lnGuarantes">
        <mu-list-item v-for="guarante in lnGuarantes">
          <mu-sub-header>
            <span>{{guarante.Guarante.CustName }}</span>
            <span>{{guarante.GuaranteType | dict('mortgageType')}}</span>
          </mu-sub-header>
  
  
          <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
            <mu-menu-item title="编辑" @click="editGuarante(guarante)" />
            <mu-menu-item title="删除" @click="deleteGuarante(guarante)" />
          </mu-icon-menu>
        </mu-list-item>
  
      </div>
  
  
    </div>
    <!--抵押品弹出框 -->
    <div>
      <mu-drawer :open="mortOpen" :docked="false" @close="mortToggle('drawerclose')">
        <mu-appbar title="抵押品" />
        <mu-row class="context">
          <mu-col width="30" tablet="30" desktop="30">
            <mu-sub-header><strong>抵押品</strong></mu-sub-header>
          </mu-col>
          <input type="hidden" v-model="Mort.UUID"/>
          <mu-col width="60" tablet="65" desktop="65">
            <mu-text-field hintText="选择抵押品" :errorText="mortErr" fullWidth disabled :value="Mort.MortgageName" /></mu-col>
          <mu-col width="10" tablet="5" desktop="5">
            <mu-icon-button icon="add_box" @click="openPop" iconClass="form-icon-color" />
          </mu-col>
        </mu-row>
  
        <mu-row class="context">
          <mu-col width="30" tablet="30" desktop="30">
            <mu-sub-header><strong>金额</strong></mu-sub-header>
          </mu-col>
          <mu-col width="60" tablet="60" desktop="65">
  
            <mu-text-field hintText="金额" :errorText="principalErr" type="number" v-model="Mort.MortgageValue" fullWidth />
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
            <mu-select-field v-model="Mort.Currency" :errorText="currencyErr" fullWidth>
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
        <!--<mu-list-item @click="mortToggle('close')" title="保存" />-->
              <mu-raised-button label="保存"  @click="mortToggle('close')" backgroundColor="#009688" fullWidth/>

      </mu-drawer>
    </div>
    <!--担保人弹出框 -->
    <div>
      <mu-drawer right :open="guaranteOpen" :docked="false" @close="guaranteToggle('drawerclose')">
        <mu-appbar title="保证人" />
        <mu-row class="context">
          <mu-col width="30" tablet="30" desktop="30">
            <mu-sub-header><strong>保证人</strong></mu-sub-header>
          </mu-col>
          <mu-col width="60" tablet="65" desktop="65">
            <mu-auto-complete :maxSearchResults="5" :errorText="guaranteCustsErr" v-model="Guarante.CustName" @select="selectGuarante" fullWidth @input="custsfilter" :dataSourceConfig="dataSourceConfig" :filter="myfilter" :dataSource="dataSource" /> <br/>
          </mu-col>
        </mu-row>
  
  
  
        <mu-row class="context">
          <mu-col width="30" tablet="30" desktop="30">
            <mu-sub-header><strong>担保类型</strong></mu-sub-header>
          </mu-col>
          <mu-col width="60" tablet="70" desktop="70">
            <mu-select-field v-model="Guarante.GuaranteType" fullWidth>
              <mu-menu-item value="1" title="企业" />
              <mu-menu-item value="2" title="担保公司" />
              <mu-menu-item value="3" title="信用" />
            </mu-select-field>
          </mu-col>
        </mu-row>
        <!--<mu-list-item @click="guaranteToggle('close')" title="保存" backgroundColor="#a4c639"/>-->
                  <mu-raised-button label="保存"  @click="guaranteToggle('close')" backgroundColor="#009688" fullWidth/>


      </mu-drawer>
    </div>
  
    <div>
      <mu-popup scrollable position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup">
        <mu-appbar title="抵押品">
          <mu-flat-button slot="right" label="关闭" color="white" @click="closePop" />
        </mu-appbar>
        <mu-content-block>
          <mu-menu desktop autoWidth scrollable>
            <div v-for="tree in trees">
  
              <mu-menu-item :title="tree.name" v-if="tree.isParent == 1" value="tree.id" @click="choiseTree(tree)" rightIcon="keyboard_arrow_right" />
              <mu-menu-item :title="tree.name" v-else value="tree.id" @click="choiseTree(tree)" />
  
            </div>
          </mu-menu>
        </mu-content-block>
      </mu-popup>
    </div>
  
    <div class="demo-step-content">
      <mu-row>
        <mu-col width="30" tablet="40" desktop="40"></mu-col>
        <mu-col width="40" tablet="30" desktop="30">
          <!--<mu-raised-button label="上一步" :disabled="activeStep === 0" @click="handlePrev" />-->
          <mu-raised-button :disabled="clickNext" label="下一步"  @click="handleNext" primary />
        </mu-col>
        <mu-col width="10" tablet="30" desktop="30"></mu-col>
      </mu-row>
    </div>
    <!--<mu-toast v-if="message.code == 400" :message="message.msg" />-->
  
  </div>
</template>

<script>
  const rateType = {
    '固定利率': [''],
    '浮动利率': ['一个月', '三个月', '六个月', '一年']
  }
  
  const rpymType = {
    '一次还款': [''],
    '等额本金': ['一次还本', '按月还本', '按季还本', '按年还本'],
    '等额本息': ['一次还本', '按月还本', '按季还本', '按年还本']
  }
  
  
  
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex'
  import Autocomplete from 'vue2-autocomplete-js'
  
  export default {
    components: {
      Autocomplete
    },
    data() {
      return {
        action:"add",
        mortOpen: false,
        guaranteOpen: false,
        bottomPopup: false,
        docked: true,
        clickNext:false,
        activeStep: 2,
        leftTop: {
          horizontal: 'right',
          vertical: 'top'
        },
        Mort: {},
        Guarante: {},
        mortErr: "",
        guaranteCustsErr: "",
        principalErr: "",
        currencyErr: "",
        dataSourceConfig: {
          text: 'CustName',
          value: 'CustCode'
        },
        //    dataSource: [{
        //   value: 't1',
        //   text: '张力'
        // }, {
        //   value: 't2',
        //   text: '张力123'
        // }, {
        //   value: 't3',
        //   text: '何培兵'
        // }],
  
      }
    },
  
    computed: {
      ...mapGetters({
        lnBusiness: 'checkOutLnBusiness',
        lnMorts: 'checkOutLnMorts',
        lnGuarantes: 'checkOutLnGuarantes',
        dataSource: "checkOutGuaranteCusts",
        trees: 'checkOutTree',
        message: 'checkOutMessage'
      }),
      ...mapState({
        // lnBusiness(state){
        //   return state.lnBusiness
        // },
        // message(state) {
        //   // if (400 == state.lnPricGuaranteModule.message.code) {
        //   //   setTimeout(() => {
        //   //     state.lnPricGuaranteModule.message.code = 200
        //   //   }, 4000)
        //   //   this.$store.state.lnBusiness.Guarantes.pop()
        //   // }
        //   // return state.lnPricGuaranteModule.message
        //   return state.mesesge
        // }
      })
    },
    methods: {
      goBack() {

          router.push({
            name: 'lnpricinfo',
            params: {
              custCode: this.$route.params.custCode,
              businessCode: this.$route.params.businessCode
            }
          })
        
      },
      toggle(item) {
        switch (item.value) {
          case 'mort':
            this.mortToggle("open")
            break
          case 'guarante':
            this.guaranteToggle("open")
            break
        }
      },
      guaranteToggle(flag) {
        this.guaranteOpen = !this.guaranteOpen
        switch (flag) {
          case 'open':
            this.Guarante = {}
          case 'close':
            console.log("this.Mort.guaranteToggle", this.Guarante)
            if (this.Guarante.CustCode) {
              var guaranteSave = {
                Guarante: this.Guarante,
                GuaranteType: this.Guarante.GuaranteType,
                BusinessCode: this.$route.params.businessCode
              }
  
              //guaranteSave.Guarante.CustCode = this.Guarante.CustCode
              //guaranteSave.Guarante.CustName = this.Guarante.CustName
              //guaranteSave.GuaranteType = this.Guarante.GuaranteType
  
              console.log("新增担保人---", guaranteSave)
              this.$store.dispatch('saveLnGuarante', guaranteSave)
              //this.$store.dispatch('getLnGuarantes', params)
  
              console.log("开始调用getLnGuarantes")
  
  
  
  
  
              // if (undefined == this.$store.state.lnBusiness.Guarantes) {
              //   this.$store.state.lnBusiness.Guarantes = new Array()
              // }
              //this.$store.state.lnBusiness.Guarantes.push(guaranteSave)
  
            }
  
        }
  
        console.log(this.mortOpen)
        //this.docked = !flag
      },
      mortToggle(flag) {
        this.mortOpen = !this.mortOpen
        switch (flag) {
          case 'open':
            this.action = "add"
            this.Mort = {}
          case 'close':
            console.log("this.Mort.MortgageCode", this.Mort.MortgageCode)
            if (this.Mort.MortgageCode) {
  
              var saveMort = {}
              saveMort.BusinessCode = this.$route.params.businessCode
              saveMort.MortgageCode = this.Mort.MortgageCode
              saveMort.MortgageName = this.Mort.MortgageName
              saveMort.MortgageValue = parseInt(this.Mort.MortgageValue)
              saveMort.Currency = this.Mort.Currency
              if ("edit" == this.action) {
                saveMort.UUID=this.Mort.UUID
                this.$store.dispatch('updateLnMorts', saveMort)
              } else {
                this.$store.dispatch('saveLnMorts', saveMort)
              }
              
  
            }
        }

      },
      handlePrev() {
        router.push({
          name: 'lnpricinfo',
          params: {
            custCode: this.$route.params.custCode,
            businessCode: this.$route.params.businessCode
          }
        })
        this.activeStep--
      },
      handleNext() {
        this.clickNext = true
        var params = {}
  
        params.BusinessCode = this.$route.params.businessCode
        params.CustCode = this.$route.params.custCode
        params.StockUsage = 0
  
        this.$store.dispatch('lnBasePricing', params)


        // router.push({
        //   name: 'lnpricrst',
        //   params: {
        //     custCode: this.$route.params.custCode,
        //     businessCode: this.$route.params.businessCode
        //   }
        // })
        

      },
      openPop() {
        this.$store.dispatch('getTree', {
          QueryType: "Mort",
          MortCode: "0"
        })
        this['bottomPopup'] = true
  
      },
      closePop() {
        this['bottomPopup'] = false
      },
      choiseTree(tree) {
        if (tree.isParent == 1) { //父节点
          this.$store.dispatch('getTree', {
            QueryType: "Mort",
            MortCode: tree.id
          })
        } else {
          // this.$store.state.lnBusiness.Product.ProductName=tree.name
          // this.$store.state.lnBusiness.Product.ProductCode=tree.id
          this.Mort.MortgageName = tree.name
          this.Mort.MortgageCode = tree.id
  
  
          this.closePop()
        }
      },
      myfilter(searchText, key) {
  
        return key
  
  
      },
      custsfilter(value) {
        var parms = {
          'CustName': value,
          'CustCode': value,
          'CurrentPage': 1,
          'NextPage': 2,
          'StartRowNumber': 0,
          'OrderAttr': 'CUST_NAME'
        }
        this.$store.dispatch('getGuaranteCusts', parms)
        console.log(value)
      },
      selectGuarante(item, index) {
        this.Guarante.CustCode = item.CustCode
        console.log("选择客户", item, index)
      },
      deleteGuarante(guarante) {
        var delGuarante = {
          BusinessCode: this.$route.params.businessCode,
          Guarante: {
            CustCode: guarante.Guarante.CustCode
          }
        }
        this.$store.dispatch('deleteLnGuarante', delGuarante)
        var params = {
          'StartRowNumber': 0,
          'CurrentPage': 0,
          'NextPage': 1,
          'OrderAttr': 'CUST_NAME',
          'BusinessCode': this.$route.params.businessCode
        }
        this.$store.dispatch('getLnGuarantes', params)
      },
      editMort(lnMort) {
        this.mortOpen = !this.mortOpen
        this.action = "edit"
        console.log("editMort----", lnMort)
        this.Mort = lnMort
      },
      deleteMort(lnMort) {
  
        // var delLnMort = {
        //   BusinessCode: this.$route.params.businessCode,
        //   Guarante: {
        //     CustCode:guarante.Guarante.CustCode
        //   }
        // }
        this.$store.dispatch('deleteLnMorts', lnMort)
        // var params = {
        //   'StartRowNumber': 0,
        //   'CurrentPage': 0,
        //   'NextPage': 1,
        //   'OrderAttr': 'CUST_NAME',
        //   'BusinessCode': this.$route.params.businessCode
        // }
        // this.$store.dispatch('getLnMorts', params)
      }
  
    },
    mounted() {
  
      //router.go(0)
  
  
      this.lnBusiness.test = "mounted"
  
    },
    created() {
  
      //查询抵押品保证人信息
      var params = {
        'StartRowNumber': 0,
        'CurrentPage': 0,
        'NextPage': 1,
        'OrderAttr': 'CUST_NAME',
        'BusinessCode': this.$route.params.businessCode
      }
      this.$store.dispatch('getLnMorts', params)
      this.$store.dispatch('getLnGuarantes', params)
  
      //this.$store.state.lnPricingSetp = 1
    },
    watch: {
      'dataSource': function() {
        if (0 == this.dataSource.length) {
          this.guaranteCustsErr = "无此用户"
        } else {
          this.guaranteCustsErr = ""
        }
      }
    }
  }
</script>

<style scoped>
  .icon-button {
    background-color:  teal;
  }
  
  .mu-toast {
    background-color: #ef5350;
    color: #ffffff;
  }
</style>