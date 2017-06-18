<template>
  <div>

      <mu-list>
        <mu-list-item title="基本信息" toggleNested :open=false>
          <mu-list-item slot="nested" disabled>
            <mu-flexbox>
              <mu-flexbox-item>
                编号
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.BusinessCode}}
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                日期
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{ lnPric.CreateTime | moment('YYYY-MM-DD')}}
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                状态
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.Status | dict('pricingStatus')}}
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                机构
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{organ.OrganName}}
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                操作员
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.CreateUser}}
              </mu-flexbox-item>
            </mu-flexbox>
         
        <!--</mu-list-item>-->
      <!--</mu-list>
      <mu-divider />
      <mu-list>-->
<!--
        <mu-list-item slot="nested" title="客户信息" toggleNested :open=false>
          <mu-list-item slot="nested" disabled>-->
             <mu-divider />
             <br>
              <mu-divider />

            <mu-flexbox>
              <mu-flexbox-item>
                客户编号
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{cust.CustCode}}
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                客户名称
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{ cust.CustName}}
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                客户规模
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{cust.CustType | dict('custSize')}}
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                客户行业
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{industry.IndustryName}}
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                信用等级
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{ cust.CustCredit=='Not'?'无评级': cust.CustCredit}}
              </mu-flexbox-item>
            </mu-flexbox>
          </mu-list-item>
           </mu-list-item>
        <!--</mu-list-item>
        </mu-list-item>-->
      </mu-list>
      <mu-divider />
    

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
        lnBusiness: {},
        organ: {},
        product: {},
        cust: {},
        industry: {}
      }
    },
    computed: mapGetters({
      lnPric: 'checkOutLnPrics'
    }),
    watch: {
      'lnPric': function (val) {
        this.lnBusiness = val.LnBusiness
        this.organ = this.lnBusiness.Organ
        this.cust = this.lnBusiness.Cust
        this.industry = this.cust.Industry
        this.product = this.lnBusiness.Product
      }
    }
  }
</script>
<style lang="css">
 
</style>