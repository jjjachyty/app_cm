/**
 * Created by Janly on 2017/2/8.
 */
import Vue from 'vue';
import Vuex from 'vuex';
/**cust modules */
import loginModule from './modules/login';
import lncustModule from './modules/lnCust';
import lnpricingModule from './modules/lnPric';
import lnPricMortModule from './modules/lnPricMort';
import lnPricGuaranteModule from './modules/lnPricGua';
import lnPricSceneDPModule from './modules/lnPricSceDP';
import lnPricSceneIBModule from './modules/lnPricSceIB';
import approveModule from './modules/approve';
import dpPricModule from './modules/dpPric';



import * as actions from './actions'
import * as getters from './getters'
import { state, mutations } from './mutations'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,

    modules: {
        /**cust modules */
        loginModule,
        lncustModule,
        lnpricingModule,
        lnPricMortModule,
        lnPricGuaranteModule,
        lnPricSceneDPModule,
        lnPricSceneIBModule,
        approveModule,
        dpPricModule

    } //,
    // strict: debug,
    // plugins: debug ? [createLogger()] : []
})