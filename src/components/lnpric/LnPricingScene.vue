<template>
  <div>
    <mu-appbar title="贷款定价">
      <mu-icon-button icon='keyboard_backspace' slot="left" touch @click="goBack" />
    </mu-appbar>
  
    <mu-list>
      <span class="title">存款派生</span>
      <mu-flat-button label="添加" icon="control_point" @click="toggle('dp')" primary/>
      <div>
        <div v-if="sceneDps">
          <mu-list-item v-for="sceneDp in sceneDps">
            <mu-sub-header>
              <span>{{sceneDp.Product.ProductName}}</span>
              <span>{{sceneDp.Term | dict('sceneDPTerm')}}</span>
              <span>{{sceneDp.Rate * 100 | bankRound(2)}}%</span>
              <span>{{sceneDp.Value / 10000 }} 万</span>
              <span>{{sceneDp.Currency | dict('currency') }}</span>
            </mu-sub-header>
  
            <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
              <mu-menu-item title="编辑" @click="editSceneDp(sceneDp)" />
              <mu-menu-item title="删除" @click="delSceneDp(sceneDp)" />
            </mu-icon-menu>
          </mu-list-item>
          <mu-divider />
        </div>
      </div>
      </mu-list-item>
  
    </mu-list>
  
    <mu-divider />
  
    <mu-list>
      <span class="title">中间业务派生</span>
      <mu-flat-button label="添加" icon="control_point" @click="toggle('ib')" primary/>
      <div>
  
        <div v-if="sceneIbs">
          <mu-list-item v-for="sceneIb in sceneIbs">
            <mu-sub-header>
              <span>{{sceneIb.Product.ProductName}}</span>
              <span>{{sceneIb.Value / 10000 }} 万</span>
            </mu-sub-header>
  
            <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
              <mu-menu-item title="编辑" @click="editSceneIb(sceneIb)" />
              <mu-menu-item title="删除" @click="delSceneIb(sceneIb)" />
            </mu-icon-menu>
          </mu-list-item>
          <mu-divider />
        </div>
      </div>
      </mu-list-item>
  
    </mu-list>
  
    <mu-divider />
  
    <mu-list>
      <span class="title">存量优惠(可用{{lnCust.StockFreeze}}元)</span>
  
      <mu-list-item>
        <div>
          <mu-row gutter>
            <mu-col width="100" tablet="100" desktop="100">
              <mu-slider v-model="stockUsage" :disabled="lnCust.StockFreeze == 0 " :min="0" :step="1" :max="lnCust.StockFreeze" class="demo-slider" />
            </mu-col>
            <mu-col width="30" tablet="20" desktop="20" />
            <mu-col width="25" tablet="20" desktop="20">
              <mu-text-field hintText="使用优惠" type="number" v-model="stockUsage" fullWidth />
            </mu-col>
            <mu-col width="20" tablet="20" desktop="20">元
            </mu-col>
            <mu-col width="30" tablet="20" desktop="20" />
  
          </mu-row>
        </div>
      </mu-list-item>
  
    </mu-list>
    <mu-divider />
    <div class="gutter">
      <mu-raised-button :disabled="clickCalculScene" label="计算优惠" class="demo-raised-button " @click="calculScene" primary fullWidth/>
    </div>
  
    <!--存款出框 -->
    <div>
      <mu-drawer :open="dpOpen" :docked="false" @close="dpToggle('drawerclose')">
        <mu-appbar title="存款" />
        <mu-row class="context">
          <mu-col width="30" tablet="30" desktop="30">
            <mu-sub-header>
              <strong>存款</strong>
            </mu-sub-header>
          </mu-col>
          <mu-col width="60" tablet="65" desktop="65">
            <mu-text-field hintText="选择存款产品" fullWidth disabled :value="sceneDp.Product.ProductName" /></mu-col>
          <mu-col width="10" tablet="5" desktop="5">
            <mu-icon-button icon="add_box" @click="openPop('dp')" iconClass="form-icon-color" />
          </mu-col>
        </mu-row>
  
        <mu-row class="context">
          <mu-col width="30" tablet="30" desktop="30">
            <mu-sub-header>
              <strong>金额</strong>
            </mu-sub-header>
          </mu-col>
          <mu-col width="55" tablet="60" desktop="65">
  
            <mu-text-field hintText="年日均金额" type="number" v-model="sceneDp.Value" fullWidth />
          </mu-col>
          <mu-col width="15" tablet="10" desktop="5">
            <mu-sub-header>元</mu-sub-header>
          </mu-col>
        </mu-row>
  
        <mu-row class="context">
          <mu-col width="30" tablet="30" desktop="30">
            <mu-sub-header>
              <strong>期限</strong>
            </mu-sub-header>
          </mu-col>
          <mu-col width="70" tablet="70" desktop="70">
            <mu-select-field v-model="sceneDp.Term" hintText="下拉选择期限" fullWidth>
              <mu-menu-item value="0" title="活期" />
              <mu-menu-item value="1" title="一天" />
              <mu-menu-item value="7" title="七天" />
              <mu-menu-item value="30" title="一个月" />
              <mu-menu-item value="90" title="三个月" />
              <mu-menu-item value="180" title="半年" />
              <mu-menu-item value="360" title="一年" />
              <mu-menu-item value="1080" title="三年" />
              <mu-menu-item value="1800" title="五年" />
            </mu-select-field>
          </mu-col>
        </mu-row>
  
        <mu-row class="context">
          <mu-col width="30" tablet="30" desktop="30">
            <mu-sub-header>
              <strong>利率</strong>
            </mu-sub-header>
          </mu-col>
          <mu-col width="55" tablet="60" desktop="65">
  
            <mu-text-field hintText="派生存款利率" type="number" v-model="sceneDp.Rate" fullWidth />
          </mu-col>
          <mu-col width="15" tablet="10" desktop="5">
            <mu-sub-header>%</mu-sub-header>
          </mu-col>
        </mu-row>
        <mu-row class="context">
          <mu-col width="30" tablet="30" desktop="30">
            <mu-sub-header>
              <strong>币种</strong>
            </mu-sub-header>
          </mu-col>
          <mu-col width="70" tablet="70" desktop="70">
            <mu-select-field v-model="sceneDp.Currency" hintText="下拉选择币种" fullWidth>
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
        <mu-raised-button label="保存" @click="dpToggle('close')" backgroundColor="#009688" fullWidth/>
  
      </mu-drawer>
    </div>
  
    <!--中间业务弹出框 -->
    <div>
      <mu-drawer right :open="sceneIbOpen" :docked="false" @close="sceneIbToggle('drawerclose')">
        <mu-appbar title="抵押品" />
        <mu-row class="context">
          <mu-col width="30" tablet="30" desktop="30">
            <mu-sub-header>
              <strong>抵押品</strong>
            </mu-sub-header>
          </mu-col>
          <input type="hidden" v-model="sceneIb.UUID" />
          <mu-col width="60" tablet="65" desktop="65">
            <mu-text-field hintText="选择中间业务产品" fullWidth disabled :value="sceneIb.Product.ProductName" /></mu-col>
          <mu-col width="10" tablet="5" desktop="5">
            <mu-icon-button icon="add_box" @click="openPop('ib')" iconClass="form-icon-color" />
          </mu-col>
        </mu-row>
  
        <mu-row class="context">
          <mu-col width="30" tablet="30" desktop="30">
            <mu-sub-header>
              <strong>金额</strong>
            </mu-sub-header>
          </mu-col>
          <mu-col width="60" tablet="60" desktop="65">
  
            <mu-text-field hintText="金额" type="number" v-model="sceneIb.Value" fullWidth />
          </mu-col>
          <mu-col width="10" tablet="10" desktop="5">
            <mu-sub-header>元</mu-sub-header>
          </mu-col>
        </mu-row>
  
        <!--<mu-list-item @click="mortToggle('close')" title="保存" />-->
        <mu-raised-button label="保存" @click="sceneIbToggle('close')" backgroundColor="#009688" fullWidth/>
  
      </mu-drawer>
    </div>
  
    <!--产品弹出框-->
    <div>
      <mu-popup scrollable position="bottom" popupClass="scene-popup-bottom" :open="bottomPopup">
        <mu-appbar title="产品">
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
      productType: "",
      //stockUsage:0,
      clickCalculScene: false,
      action: "add",
      dpOpen: false,
      sceneIbOpen: false,
      bottomPopup: false,
      sceneDp: {
        Product: {
          ProductName: "",
          ProductCode: ""
        },
        Currency: "CNY"
      },
      sceneIb: {
        Product: {
          ProductName: "",
          ProductCode: ""
        }
      }

    }
  },

  computed: {
    ...mapGetters({
      trees: 'checkOutTree',
      sceneDps: 'checkOutLnSceneDPs',
      sceneIbs: 'checkOutLnSceneIBs',
      lnPric: 'checkOutLnPric',
      lnCust: 'checkOutLnCust'
    }), stockUsage: {
      // getter
      get: function () {
        return this.lnPric.StockUsage
      },
      // setter
      set: function (newValue) {
        this.$store.state.lnpricingModule.lnPric.StockUsage = newValue
      }
    }
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
          this.sceneIbToggle("open")
          break
      }
    },
    dpToggle(type) {
      this.dpOpen = !this.dpOpen
      switch (type) {
        case 'open':
          this.action = "add"
          this.sceneDp = {
            Product: {
              ProductName: "",
              ProductCode: ""
            },
            Currency: "CNY"
          }
          break
        case 'close':
          console.log("this.sceneDp", this.sceneDp)
          if (this.sceneDp) {

            var saveSceneDp = this.sceneDp
            saveSceneDp.BusinessCode = this.$route.params.businessCode
            saveSceneDp.Value = parseFloat(this.sceneDp.Value)
            saveSceneDp.Term = parseInt(this.sceneDp.Term)

            saveSceneDp.Rate = parseFloat(this.sceneDp.Rate / 100)
            console.log("this.saveSceneDp", saveSceneDp)
            // saveMort.MortgageCode = this.Mort.MortgageCode
            // saveMort.MortgageName = this.Mort.MortgageName
            // saveMort.MortgageValue = parseInt(this.Mort.MortgageValue)
            // saveMort.Currency = this.Mort.Currency
            if ("edit" == this.action) {
              saveSceneDp.UUID = this.sceneDp.UUID
              this.$store.dispatch('updateLnSceneDP', saveSceneDp)
            } else {
              this.$store.dispatch('addLnSceneDP', saveSceneDp)
            }


          }
          break
      }
    },
    editSceneDp(lnSceneDp) {
      this.dpOpen = !this.dpOpen
      this.action = "edit"
      console.log("editSceneDp----", lnSceneDp)

      this.sceneDp = lnSceneDp
      this.sceneDp.Rate = (lnSceneDp.Rate * 100).round(2)
      this.sceneDp.Term = String(lnSceneDp.Term)
    }, editSceneIb(lnSceneIb) {
      this.sceneIbOpen = !this.sceneIbOpen
      this.action = "edit"
      console.log("editSceneIb----", lnSceneIb)

      this.sceneIb = lnSceneIb

    },
    sceneIbToggle(type) {
      this.sceneIbOpen = !this.sceneIbOpen
      switch (type) {
        case 'open':
          this.action = "add"
          this.sceneIb = {
            Product: {
              ProductName: "",
              ProductCode: ""
            }
          }
          break
        case 'close':
          console.log("this.sceneIb", this.sceneIb)
          if (this.sceneIb) {

            var saveSceneIb = this.sceneIb
            saveSceneIb.BusinessCode = this.$route.params.businessCode
            saveSceneIb.Value = parseFloat(this.sceneIb.Value)

            console.log("this.saveSceneIb", saveSceneIb)
            if ("edit" == this.action) {
              saveSceneIb.UUID = this.sceneIb.UUID
              this.$store.dispatch('updateLnSceneIB', saveSceneIb)
            } else {
              this.$store.dispatch('addLnSceneIB', saveSceneIb)
            }


          }
          break
      }
    },
    openPop(type) {
      var productCode = ""
      switch (type) {
        case 'dp':
          productCode = "2001"
          this.productType = "dp"
          break
        case 'ib':
          productCode = "3"
          this.productType = "ib"
          break
      }
      this.$store.dispatch('getTree', {
        QueryType: "Product",
        ProductCode: productCode
      })
      this['bottomPopup'] = true

    },
    closePop() {
      this['bottomPopup'] = false
    },
    choiseTree(tree) {
      if (tree.isParent == 1) { //父节点
        this.$store.dispatch('getTree', {
          QueryType: "Product",
          ProductCode: tree.id
        })
      } else {
        if ("dp" == this.productType) {
          this.sceneDp.Product.ProductName = tree.name
          this.sceneDp.Product.ProductCode = tree.id
        } else {
          this.sceneIb.Product.ProductName = tree.name
          this.sceneIb.Product.ProductCode = tree.id
        }



        this.closePop()
      }
    },
    handlePrev() {

      router.push({
        name: 'lnpricrst',
        params: {
          custCode: this.$route.params.custCode,
          businessCode: this.$route.params.businessCode
        }
      })


    },
    handleNext() {

    },
    calculScene() {

      this.clickCalculScene = true
      var params = {}

      params.BusinessCode = this.$route.params.businessCode
      params.CustCode = this.$route.params.custCode
      params.StockUsage = parseFloat(this.stockUsage)

      this.$store.dispatch('lnBasePricing', params)



    },
    delSceneDp(sceneDp) {
      console.log("delSceneDp", sceneDp)
      this.$store.dispatch('delLnSceneDP', { UUID: sceneDp.UUID, BusinessCode: this.$route.params.businessCode })

    }, delSceneIb(sceneIb) {
      console.log("delSceneDp", sceneIb)
      this.$store.dispatch('delLnSceneIB', { UUID: sceneIb.UUID, BusinessCode: this.$route.params.businessCode })

    }
  }, mounted() {

    this.$store.dispatch('getLnSceneDPs', { BusinessCode: this.$route.params.businessCode })
    this.$store.dispatch('getLnSceneIBs', { BusinessCode: this.$route.params.businessCode })


  },
  created() {
    this.$store.dispatch('getLnCust', { CustCode: this.$route.params.custCode })

  }
}
</script>

<style>
.gutter {
  padding-left: 16px;
  padding-right: 16px;
}

.title {
  padding-left: 16px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  /*display: block;*/
  font-size: 16px;
  /*max-width: 100%;*/
}

.track {
  position: absolute;
  height: 15px;
  left: 0;
  top: 50%;
  margin-top: -1px;
}
.scene-popup-bottom{
  width:100%
}
.echarts {
  height: 50vh;
  margin-left: -16px;
}
</style>