<template>
  <div>
    <div>
      <mu-appbar title="定价单详情">
        <mu-icon-button icon='keyboard_backspace' slot="left" touch @click="goBack" />
      </mu-appbar>
    </div>
    <div>
     
      <basesht></basesht>
      <mu-divider />
      <infosht></infosht>
      <mu-divider />
      <!--<mu-list>
        <mu-list-item title="过程参数" toggleNested :open=false>
          <mu-list-item slot="nested" disabled>
            <mu-flexbox>
              <mu-flexbox-item>
                资金成本率
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.FtpRate * 100 | bankRound}}%
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                运营费用率
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.OcRate * 100 | bankRound}}%
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                违约概率
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.PdRate * 100 | bankRound}}%
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                违约损失率
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.LgdRate * 100 | bankRound}}%
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                预期损失率
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.ElRate * 100 | bankRound}}%
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                资本回报率
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.CapCostRate * lnPric.CapPftRate * 100 | bankRound}}%
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                经济资本占用率
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{lnPric.EcRate * 100 | bankRound}}%
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox>
              <mu-flexbox-item>
                优惠点数
              </mu-flexbox-item>
              <mu-flexbox-item>
                {{(lnPric.StockPoints+lnPric.DerviedDPPoints+lnPric.DerviedIBPOints+lnPric.QualitativeDiscount) * 100 | bankRound}}%
              </mu-flexbox-item>
            </mu-flexbox>
          </mu-list-item>
        </mu-list-item>
      </mu-list>-->
      <mu-divider />
     
      <resultsht></resultsht>
      <mu-list>
        <mu-divider />
        <mu-list>
          <mu-list-item title="备注" toggleNested :open=false>
            <mu-list-item slot="nested" disabled>
              <mu-flexbox>
                <mu-flexbox-item>
                  {{lnPric.Remark}}
                </mu-flexbox-item>
              </mu-flexbox>
            </mu-list-item>
          </mu-list-item>
        </mu-list>
      </mu-list>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import {
    pageSize
  } from '../../config'
   import basesht from 'components/lnpric/LnPricShtBas';
  import infosht from 'components/lnpric/LnPricShtInf';
  import resultsht from 'components/lnpric/LnPricShtRst';

  export default {
    components: {
      basesht,
      infosht,
      resultsht
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
    computed: {...mapGetters({
      lnPric: 'checkOutLnPric'
    })},
    methods: {
      custBrief(custID) {

      },
      goBack() {
     
      router.push({name:'list'})
      }
    },
    created() {
      this.$store.dispatch('getLnPrics', {
        'BusinessCode': this.$route.params.businessCode
      })
      this.$store.dispatch('getLnMorts', {
        'BusinessCode': this.$route.params.businessCode
      })
      this.$store.dispatch('getLnGuarantes', {
        'BusinessCode': this.$route.params.businessCode
      })
      this.$store.dispatch('getLnSceneDPs', {
        'BusinessCode': this.$route.params.businessCode
      })
      this.$store.dispatch('getLnSceneIBs', {
        'BusinessCode': this.$route.params.businessCode
      })
    },
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
  .demo-infinite-container {
    height: calc(100vh - 160px);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid #d9d9d9;
  }
  
  .demo-paper {
    display: inline-block;
    height: 100px;
    width: 100px;
    margin: 20px;
    text-align: center;
  }
</style>