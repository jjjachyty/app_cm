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
                  <span>{{sceneDp.Term}}</span>
                   <span>{{sceneDp.Rate}}</span>
                  <span>{{sceneDp.Value / 10000 }} 万</span>
                  <span>{{sceneDp.Currency | dict('currency') }}</span>
                  </mu-sub-header>
        
        
                <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
                  <mu-menu-item title="编辑" @click="editMort(sceneDp)" />
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
      <mu-flat-button label="添加" icon="control_point" primary/>
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
  
  
    <!--存款出框 -->
    <div>
      <mu-drawer :open="dpOpen" :docked="false" @close="dpToggle('drawerclose')">
        <mu-appbar title="存款" />
        <mu-row class="context">
          <mu-col width="30" tablet="30" desktop="30">
            <mu-sub-header><strong>存款</strong></mu-sub-header>
          </mu-col>
          <mu-col width="60" tablet="65" desktop="65">
            <mu-text-field hintText="选择存款产品" fullWidth disabled :value="sceneDp.Product.ProductName" /></mu-col>
          <mu-col width="10" tablet="5" desktop="5">
            <mu-icon-button icon="add_box" @click="openPop" iconClass="form-icon-color" />
          </mu-col>
        </mu-row>
  
        <mu-row class="context">
          <mu-col width="30" tablet="30" desktop="30">
            <mu-sub-header><strong>金额</strong></mu-sub-header>
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
            <mu-sub-header><strong>期限</strong></mu-sub-header>
          </mu-col>
          <mu-col width="70" tablet="70" desktop="70">
            <mu-select-field v-model="sceneDp.Term" hintText="下拉选择期限" fullWidth>
              <mu-menu-item value="0" title="活期" />
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
            <mu-sub-header><strong>利率</strong></mu-sub-header>
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
            <mu-sub-header><strong>币种</strong></mu-sub-header>
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
  
  
    <div>
      <mu-popup scrollable position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup">
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
        action: "add",
        dpOpen: false,
        bottomPopup: false,
        sceneDp: {
          Product: {
            ProductName: "",
            ProductCode: ""
          },
          Currency: "CNY"
        }
  
      }
    },
  
    computed: { ...mapGetters({
        trees: 'checkOutTree',
        sceneDps:'checkOutLnSceneDPs'
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
              saveSceneDp.Value = parseInt(this.sceneDp.Value)
              saveSceneDp.Term = parseInt(this.sceneDp.Term)
  
              saveSceneDp.Rate = parseInt(this.sceneDp.Rate)
  
              // saveMort.MortgageCode = this.Mort.MortgageCode
              // saveMort.MortgageName = this.Mort.MortgageName
              // saveMort.MortgageValue = parseInt(this.Mort.MortgageValue)
              // saveMort.Currency = this.Mort.Currency
              if ("edit" == this.action) {
                //saveMort.UUID=this.Mort.UUID
                //this.$store.dispatch('updateLnMorts', saveMort)
              } else {
                this.$store.dispatch('addLnSceneDP', saveSceneDp)
              }
  
  
            }
            break
        }
      },
      ibToggle(type) {
  
      },
      sceneDpProduct(type) {
  
      },
      openPop() {
        this.$store.dispatch('getTree', {
          QueryType: "Product",
          ProductCode: "2001"
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
          // this.$store.state.lnBusiness.Product.ProductName=tree.name
          // this.$store.state.lnBusiness.Product.ProductCode=tree.id
          this.sceneDp.Product.ProductName = tree.name
          this.sceneDp.Product.ProductCode = tree.id
  
  
          this.closePop()
        }
      },
      handlePrev() {
        if ('editlnpricingscene' == this.$route.name) {
          router.push({
            name: 'editlnlnpricrst',
            params: {
              custCode: this.$route.params.custCode,
              businessCode: this.$route.params.businessCode
            }
          })
        } else {
          router.push({
            name: 'lnpricrst',
            params: {
              custCode: this.$route.params.custCode,
              businessCode: this.$route.params.businessCode
            }
          })
        }
  
      },
      handleNext() {
  
      },
      calculScene() {
        router.push({
          name: 'lnpricrst',
          params: {
            custCode: this.$route.params.custCode,
            businessCode: this.$route.params.businessCode
          }
        })
      },
      delSceneDp(sceneDp){
        console.log("delSceneDp",sceneDp)
        this.$store.dispatch('delLnSceneDP', {UUID:sceneDp.UUID,BusinessCode:this.$route.params.businessCode})

      }
    },      mounted() {
               
                this.$store.dispatch('getLnSceneDPs', {BusinessCode:this.$route.params.businessCode})

  
      },
      created() {
        console.log("第", this.$store.state.lnPricingSetp, "步")
        this.$store.state.lnPricingSetp = 2
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
    font-size: 18px;
  }
  
  .echarts {
    height: 50vh;
    margin-left: -16px;
  }
</style>