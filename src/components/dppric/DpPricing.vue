<template>
  <div>
  
    <!--导航头-->
    <div>
      <mu-appbar title="存款一对一定价">
        <mu-icon-button icon='keyboard_backspace' slot="left" touch @click="back()" />
      </mu-appbar>
    </div>
    <div>
      <mu-icon-menu icon="playlist_add" iconClass="icon-button" :anchorOrigin="leftTop" :targetOrigin="leftTop" @itemClick="toggle">
        <mu-menu-item title="存款" value="dp" />
        <mu-menu-item title="中间" value="ib" />
      </mu-icon-menu>
      <mu-divider />
      <mu-sub-header>存款业务</mu-sub-header>
            <div v-if="dpDPs">
        <mu-list-item v-for="dpItem in dpDPs">
         
            <span>{{dpItem.Product.ProductName}}</span>
            <span>{{dpItem.Term | dict('sceneDPTerm')}}</span>
            <span>{{dpItem.Rate * 100 |bankRound(2) }}</span>%
            <span>{{dpItem.Amount /10000  |bankRound(4)}}万</span>
            <span>{{dpItem.Ccy |dict('currency')}}</span>
        
  
  
          <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
            <mu-menu-item title="编辑" @click="editDp(dpItem)" />
            <mu-menu-item title="删除" @click="deleteDp(dpItem)" />
          </mu-icon-menu>
        </mu-list-item>
  
      </div>
    
      <mu-sub-header>中间业务</mu-sub-header>
      <mu-sub-header>存量业务</mu-sub-header>
      <mu-sub-header>存量交流</mu-sub-header>
  
    </div>
  
    <!--存款出框 -->
    <div>
      <mu-drawer :open="dpOpen" :docked="false" @close="dpToggle('dpdrawerclose')">
        <mu-appbar title="存款" />
        <mu-row class="context">
          <mu-col width="30" tablet="30" desktop="30">
            <mu-sub-header>
              <strong>存款</strong>
            </mu-sub-header>
          </mu-col>
          <input type="hidden" v-model="dp.UUID"/>
          <mu-col width="60" tablet="65" desktop="65">
            <mu-text-field hintText="选择存款产品" fullWidth disabled :value="dp.Product.ProductName" /></mu-col>
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
  
            <mu-text-field hintText="金额" type="number" v-model="dp.Amount" fullWidth />
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
            <mu-select-field v-model="dp.Term" hintText="下拉选择期限" fullWidth>
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
  
            <mu-text-field hintText="派生存款利率" type="number" v-model="dp.Rate" fullWidth />
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
            <mu-select-field v-model="dp.Ccy" hintText="下拉选择币种" fullWidth>
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
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex'
export default {
  data() {
    return {
      bottomPopup:false,
      businessCode:"",
      actionState:"add",
      leftTop: {
        horizontal: 'right',
        vertical: 'top'
      }, dp: { Product: { ProductCode: '',ProductName:'' } ,Ccy:'CNY'}, dpOpen: false
    }
  },  computed: {
    ...mapGetters({
      trees: 'checkOutTree',
      dpPric:'checkOutDPPric',
      dpDPs:'checkOutDPs'
    })}, 
    methods: {
    toggle(item) {
      switch (item.value) {
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
      console.log("dpToggle",this.dpOpen)
      switch (type) {
        case 'open':
          this.action = "add"
          this.dp = {
            Product: {
              ProductName: "",
              ProductCode: ""
            },
            Currency: "CNY"
          }
          break
        case 'close':
          console.log("this.dp", this.dp)
          if (this.dp) {

            var saveDp = this.dp
            saveDp.BusinessCode = this.dpPric.BusinessCode
            saveDp.Amount = parseFloat(this.dp.Amount)
            saveDp.Term = parseInt(this.dp.Term)

            saveDp.Rate = parseFloat(this.dp.Rate / 100)
            console.log("this.saveDp", saveDp)

            if ("edit" == this.actionState) {
              saveDp.UUID = this.dp.UUID
              this.$store.dispatch('updateDP', saveDp)
            } else {
              this.$store.dispatch('addDP', saveDp)
            }


          }
          break
       case 'dpdrawerclose':
       console.log(this.dp)
          this.dp.Rate = this.dp.Rate / 100
          break
      }
    },    openPop(type) {
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
          this.dp.Product.ProductName = tree.name
          this.dp.Product.ProductCode = tree.id
        } else {
          this.ib.Product.ProductName = tree.name
          this.ib.Product.ProductCode = tree.id
        }



        this.closePop()
      }
    },
      editDp(dpItem) {
      

        this.actionState = "edit"
        this.dpOpen = !this.dpOpen
        console.log("dp--dpItem--", dpItem)
        this.dp.Product = dpItem.Product
         this.dp.Rate = dpItem.Rate*100
        this.dp.Term = String(dpItem.Term)
        this.dp.Ccy = String(dpItem.Ccy)
        this.dp.Amount = String(dpItem.Amount)
      },
      deleteDp(dp) {
        this.$store.dispatch('delDP', dp)
      }
  },created(){
        if (this.$store.state.editOrAdd == "edit") {
            this.cust = this.$store.state.editCust
        } else {
    
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
