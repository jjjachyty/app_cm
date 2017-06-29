<template>
    <div>
        <!--导航头-->
        <div>
            <mu-appbar title="新增客户">
                <mu-icon-button icon='keyboard_backspace' slot="left" touch @click="back()" />
            </mu-appbar>
        </div>
    
        <mu-row class="context">
            <mu-col width="40" tablet="30" desktop="30">
                <mu-sub-header>
                    <strong>客户号</strong>
                </mu-sub-header>
            </mu-col>
            <mu-col width="60" tablet="60" desktop="60">
                <mu-sub-header>{{cust.CustCode}}</mu-sub-header>
            </mu-col>
        </mu-row>
    
        <mu-row class="context">
            <mu-col width="40" tablet="30" desktop="30">
                <mu-sub-header>
                    <strong>客户名称</strong>
                </mu-sub-header>
            </mu-col>
            <mu-col width="60" tablet="60" desktop="60">
                <mu-text-field hintText="客户名称" type="text" v-model="cust.CustName" fullWidth />
            </mu-col>
        </mu-row>
    
        <mu-row class="context">
            <mu-col width="40" tablet="30" desktop="30">
                <mu-sub-header>
                    <strong>客户级别</strong>
                </mu-sub-header>
            </mu-col>
            <mu-col width="60" tablet="60" desktop="60">
                <mu-select-field v-model="cust.CustImplvl" fullWidth>
                    <mu-menu-item value="1" title="核心客户" />
                    <mu-menu-item value="2" title="潜力客户" />
                    <mu-menu-item value="3" title="非目标客户" />
                </mu-select-field>
            </mu-col>
        </mu-row>
    
        <mu-row class="context">
            <mu-col width="40" tablet="30" desktop="30">
                <mu-sub-header>
                    <strong>信用评级</strong>
                </mu-sub-header>
            </mu-col>
            <mu-col width="60" tablet="60" desktop="60">
                <mu-select-field v-model="cust.CustCredit" fullWidth :maxHeight="300">
                    <mu-menu-item value="AAA+" title="AAA+" />
                    <mu-menu-item value="AAA" title="AAA" />
                    <mu-menu-item value="AAA-" title="AAA-" />
                    <mu-menu-item value="AA+" title="AA+" />
                    <mu-menu-item value="AA" title="AA" />
                    <mu-menu-item value="AA-" title="AA-" />
                    <mu-menu-item value="A+" title="A+" />
                    <mu-menu-item value="A" title="A" />
                    <mu-menu-item value="A-" title="A-" />
                    <mu-menu-item value="BBB" title="BBB" />
                    <mu-menu-item value="BB" title="BB" />
                    <mu-menu-item value="B" title="B" />
                    <mu-menu-item value="CCC" title="CCC" />
                    <mu-menu-item value="CC" title="CC" />
                    <mu-menu-item value="C" title="C" />
                    <mu-menu-item value="D" title="D" />
                    <mu-menu-item value="Not" title="无评级" />
                </mu-select-field>
            </mu-col>
        </mu-row>
    
        <mu-row class="context">
            <mu-col width="40" tablet="30" desktop="30">
                <mu-sub-header>
                    <strong>行业</strong>
                </mu-sub-header>
            </mu-col>
            <mu-col width="50" tablet="40" desktop="40">
                <mu-text-field hintText="选择行业" fullWidth disabled :value="cust.Industry.IndustryName" /></mu-col>
            <mu-col width="10" tablet="10" desktop="10">
                <mu-icon-button icon="add_box" @click="openPop" iconClass="form-icon-color" />
            </mu-col>
        </mu-row>
    
        <mu-row class="context">
            <mu-col width="40" tablet="30" desktop="30">
                <mu-sub-header>
                    <strong>规模</strong>
                </mu-sub-header>
            </mu-col>
            <mu-col width="60" tablet="60" desktop="60">
                <mu-select-field v-model="cust.CustSize" fullWidth>
                    <mu-menu-item value="1" title="大型" />
                    <mu-menu-item value="2" title="中型" />
                    <mu-menu-item value="3" title="小型" />
                    <mu-menu-item value="4" title="微型" />
                    <mu-menu-item value="5" title="事业" />
                    <mu-menu-item value="6" title="零售" />
                    <mu-menu-item value="7" title="未知" />
                </mu-select-field>
            </mu-col>
        </mu-row>
    
        <mu-row class="context">
            <mu-col width="40" tablet="30" desktop="30">
                <mu-sub-header>
                    <strong>机构</strong>
                </mu-sub-header>
            </mu-col>
            <mu-col width="60" tablet="60" desktop="60">
                <span>{{cust.Branch.OrganName}}</span>
            </mu-col>
        </mu-row>
        <mu-row class="context">
            <mu-col width="20" tablet="30" desktop="30">
            </mu-col>
            <mu-col width="20" tablet="30" desktop="30">
                <mu-raised-button label="保存" @click="addCust" backgroundColor="#009688" fullWidth/>
            </mu-col>
            <mu-col width="20" tablet="30" desktop="30">
            </mu-col>
        </mu-row>
    
<!--<mu-popup  position="bottom" popupClass="industry-popup-bottom" :open="bottomPopup">
    
    <mu-appbar title="行业">
      <mu-flat-button slot="right" label="关闭" color="white" @click="closePop"/>
    </mu-appbar>
    <div class="scor-h">
    <!<mu-content-block>
    <mu-menu>-->
    <!--<div v-for="industry in industrys">-->
    <!--1111-->
      <!--<mu-menu-item :title="industry.name" v-if="industry.isParent == 1"  @click="choiseProduct(lnProduct)" rightIcon="keyboard_arrow_right"/>
      <mu-menu-item :title="industry.name" v-else  @click="choiseIndustry(industry)"/>
       -->
    <!--</div>-->
    <!--</mu-menu>
    </mu-content-block>-->
    <!--</div>
  </mu-popup>-->


    <mu-popup position="bottom" popupClass="industry-popup-bottom" :open="bottomPopup" @close="closePop()">
      <mu-appbar title="详情">
        <mu-flat-button slot="right" label="关闭" color="white" @click="closePop()" />
      </mu-appbar>

    <mu-content-block>
    <mu-menu :maxHeight="500">
    <div v-for="industry in industrys">

      <mu-menu-item :title="industry.name" v-if="industry.isParent == 1"  @click="choiseProduct(lnProduct)" rightIcon="keyboard_arrow_right"/>
      <mu-menu-item :title="industry.name" v-else  @click="choiseIndustry(industry)"/>
       
    </div>
    </mu-menu>
    </mu-content-block>


  
    </mu-popup>


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
            bottomPopup:false,
            cust: { CustImplvl: '2', Industry: { IndustryName: '' },Branch:{OrganName:''} },
            custCode: ""
        }
    },
    computed:{...mapGetters({
        industrys:'checkOutTree'
    })
    },
    methods: {
        back() {
            router.push({ name: 'custs' })
        }, openPop() {
                  this.$store.dispatch('getTree',{QueryType:"Industry"})
            this.bottomPopup = true
        },choiseIndustry(industry){
 this.bottomPopup = false
        this.cust.Industry.IndustryName=industry.name
        this.cust.Industry.IndustryCode=industry.id
      
      
    },closePop(){
            this.bottomPopup = false
        },addCust() {

            // post {"GapProportion":1,"CustCode":"CUST20170628192639002","CustName":"1",
            //"CustType":"1","CustImplvl":"1","CustCredit":"Not",
            //"Industry":{"IndustryCode":"T","IndustryName":"国际组织"},"CustSize":"1",
            //"Branch":{"OrganCode":"panchina001","OrganName":""}}:
            // var params = {
            //     GapProportion: 1,
            //     CustCode: this.Cust.CustCode,
            //     CustName: this.Cust.CustName,
            //     CustType: '1',
            //     CustImplvl: this.cust.CustImplvl,
            //     CustCredit: this.cust.CustCredit,
            //     Industry: this.cust.Industry,
            //     CustSize: this.CustSize,
            //     Branch: { OrganCode: this.$store.state.auth.org_unit_id }
            // }
            if (this.$store.state.editOrAdd == "edit") {
                this.$store.dispatch('updateLnCust', this.cust)
                
            }else{
                 this.$store.dispatch('saveLnCust', this.cust)
            }
            
           

            

        }
    }, created() {
        if (this.$store.state.editOrAdd == "edit") {
            this.cust = this.$store.state.editCust
        } else {
            this.cust.CustCode = 'CUSTAPP' + (new Date().getTime().toString())
            this.cust.Branch.OrganName=this.$store.state.auth.org_unit_desc
            this.cust.Branch.OrganCode=this.$store.state.auth.org_unit_id

        }

    }
}
</script>
<style>
.industry-popup-bottom{
    height:calc(100% - 200px);
    width:100%
}
.scor-h{
-webkit-overflow-scrolling: touch;
    overflow-y:auto;
}
</style>
