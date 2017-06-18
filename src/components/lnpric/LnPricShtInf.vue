<template>
  <div>

    
      
      <mu-list>
        <mu-list-item title="贷款信息" toggleNested :open=false>
          <mu-list-item slot="nested" disabled>
            <mu-flexbox>
              <mu-flexbox-item>
                产品
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{product.ProductName}}
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                期限
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{ lnBusiness.Term}}{{ lnBusiness.TermMult | dict('termMult')}}
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                金额
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnBusiness.Principal / 10000}} 万
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                币种
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnBusiness.Currency | dict('currency')}}
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                利率类型
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnBusiness.RateType | dict('rateType')}}
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                重定价频率
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnBusiness.RepriceFreq | dict('repriceFreq')}}
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                还款方式
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnBusiness.RpymType | dict('rpymType')}}
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                还本频率
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnBusiness.RpymCapitalFreq | dict('rpymCapitalFreq')}}
              </mu-flexbox-item>
            </mu-flexbox>
          </mu-list-item>
          <mu-list-item slot="nested" title="抵押品信息" toggleNested>
            <mu-list-item disabled slot="nested">
            <mu-flexbox v-for="lnMort in lnMorts">
              <!--<mu-flexbox-item >
                抵押品名称
              </mu-flexbox-item>-->
              <mu-flexbox-item>
                {{lnMort.MortgageName}}
              </mu-flexbox-item>
              <!--<mu-flexbox-item >
                金额
              </mu-flexbox-item>-->
              <mu-flexbox-item>
                {{lnMort.MortgageValue / 10000 }}万
              </mu-flexbox-item>
            </mu-flexbox>
            </mu-list-item>
          </mu-list-item>
          <mu-list-item slot="nested" title="保证人信息" toggleNested >
            <mu-list-item disabled slot="nested">
               <mu-flexbox v-for="lnGuarante in lnGuarantes">
           
              <mu-flexbox-item>
                {{lnGuarante.Guarante.CustName}}
              </mu-flexbox-item>

              <mu-flexbox-item>
                {{lnGuarante.GuaranteType | dict('guaranteType') }}
              </mu-flexbox-item>
            </mu-flexbox>
            </mu-list-item>
          </mu-list-item>
          <mu-list-item slot="nested" title="派生优惠" toggleNested >
            <mu-list-item  disabled slot="nested">
              <strong>存款:</strong>
               <mu-divider />
              <mu-flexbox v-for="lnSceneDP in lnSceneDPs">
                <mu-flexbox-item>
                  {{lnSceneDP.Product.ProductName}}
                </mu-flexbox-item>
                <mu-flexbox-item>
                  {{lnSceneDP.Currency | dict('currency')}}
<br>
                  {{lnSceneDP.Term | dict('sceneDPTerm')}}
<br>
                  {{lnSceneDP.Rate * 100 | bankRound}}%
              <br>
                  {{lnSceneDP.Value / 10000}}万
                </mu-flexbox-item>
              </mu-flexbox>
              
               <strong>中间:</strong>
               <mu-divider />
              <mu-flexbox v-for="lnSceneIB in lnSceneIBs" >
                <mu-flexbox-item>
                  {{lnSceneIB.Product.ProductName}}
                </mu-flexbox-item>
                <mu-flexbox-item>
                  {{lnSceneIB.Value / 10000}}万
                </mu-flexbox-item>
              </mu-flexbox>
            </mu-list-item>
          </mu-list-item>
          <mu-list-item slot="nested" title="存量优惠" toggleNested>
            <mu-list-item disabled slot="nested">
              <mu-flexbox >
                <mu-flexbox-item>
                  存量贡献
                </mu-flexbox-item>
                <mu-flexbox-item>
                  {{lnPric.StockUsage/ 10000}}万
                </mu-flexbox-item>
              </mu-flexbox>
            </mu-list-item>
          </mu-list-item>
        </mu-list-item>
      </mu-list>
     
     
    

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
      lnPric: 'checkOutLnPrics',
      lnMorts:'checkOutLnMorts',
      lnGuarantes:'checkOutLnGuarantes',
      lnSceneDPs:'checkOutLnSceneDPs',
      lnSceneIBs:'checkOutLnSceneIBs'
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
<style>
.mu-item-wrapper{
  margin-left:0px;
}
</style>