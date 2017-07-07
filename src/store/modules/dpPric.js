import * as types from '../mutation-types'
import api from '../../api/index'
import { pageSize } from '../../config'


const state = {
    dps: [],
    dpibs: [],
    businessCode: "",
    dp: {},
    dpPric: {},
    custStocks: []
}

// getters
const getters = {
    checkOutDPs: state => state.dps,
    checkOutDPIBs: state => state.dpibs,
    checkOutDP: state => state.dp,
    checkOutDPPric: state => state.dpPric,
    checkOutDPCustStocks: state => state.custStocks
}

// actions
const actions = {
    getDPs({ commit }, params) {
        var url = "/dp/one/business/BusinessCode/" + params.BusinessCode
        api.get(url, {}, (dps) => {
            commit(types.GET_DP_DPS_SUCCESS, { dps })

        }, (data) => {
            commit(types.GET_LN_PRIC_SCENE_DP_FAILED, { data })
        })
    },

    addDP({ dispatch, commit }, params) {
        var url = "/dp/one/business"
        api.save(url, { params }, (dp) => {
            commit(types.ADD_LN_PRIC_SCENE_DP_SUCCESS, { dp })
            dispatch('getDPs', { BusinessCode: params.BusinessCode })

        }, (data) => {
            commit(types.ADD_LN_PRIC_SCENE_DP_FAILED, { data })
        })
    },
    startDP({ dispatch, commit }, params) {
        var url = "/dp/one/begainpricing"
        api.save(url, { params }, (dp) => {
            console.log("----startDP-----", dp)
            commit(types.START_DP_PRIC_SUCCESS, { dp })
            router.push({ name: 'dppricinfo', params: { custCode: params.CustCode, businessCode: dp.BusinessCode } })

        }, (data) => {
            commit(types.ADD_LN_PRIC_SCENE_DP_FAILED, { data })
        })
    },
    updateDP({ dispatch, commit }, params) {
        var url = "/dp/one/business"
        api.update(url, { params }, (lnSceneDP) => {
            dispatch('getDPs', { BusinessCode: params.BusinessCode })
        }, (data) => {})
    },

    delDP({ dispatch, commit }, params) {
        var url = "/dp/one/business"
        api.delete(url, { params }, (dp, params) => {
            dispatch('getDPs', { BusinessCode: params.BusinessCode })
        }, (data) => {
            commit(types.DEL_DP_DPS_FAILED, { data })
        })
    },
    getDPIBs({ commit }, params) {
        var url = "/dp/one/ib/BusinessCode/" + params.BusinessCode
        api.get(url, {}, (dpibs) => {
            commit(types.GET_DP_IBS_SUCCESS, { dpibs })

        }, (data) => {
            commit(types.GET_LN_PRIC_SCENE_DP_FAILED, { data })
        })
    },
    addDPIB({ dispatch, commit }, params) {
        var url = "/dp/one/ib"
        api.save(url, { params }, (dp) => {
            commit(types.ADD_LN_PRIC_SCENE_DP_SUCCESS, { dp })
            dispatch('getDPIBs', { BusinessCode: params.BusinessCode })

        }, (data) => {
            commit(types.ADD_LN_PRIC_SCENE_DP_FAILED, { data })
        })
    },
    updateDPIB({ dispatch, commit }, params) {
        var url = "/dp/one/ib"
        api.update(url, { params }, (lnSceneDP) => {
            dispatch('getDPIBs', { BusinessCode: params.BusinessCode })
        }, (data) => {})
    },
    delDPIB({ dispatch, commit }, params) {
        var url = "/dp/one/ib"
        api.delete(url, { params }, (dp, params) => {
            dispatch('getDPIBs', { BusinessCode: params.BusinessCode })
        }, (data) => {
            commit(types.DEL_DP_DPS_FAILED, { data })
        })
    },
    getCustStock({ commit }, params) {
        var url = "/dp/one/stock/business/Cust/" + params.CustCode
        api.get(url, {}, (custstock) => {
            commit(types.GET_DP_CUST_STOCK_SUCCESS, { custstock })
        }, (data) => {

        })
    },

}

// mutations
const mutations = {
    [types.START_DP_PRIC_SUCCESS](state, { dp }) {
        state.dpPric = dp
    },
    [types.GET_DP_DPS_SUCCESS](state, { dps }) {
        state.dps = dps
    },
    [types.GET_DP_IBS_SUCCESS](state, { dpibs }) {
        state.dpibs = dpibs
    },
    [types.GET_DP_CUST_STOCK_SUCCESS](state, { custstock }) {
        state.custStocks = custstock
    },
    [types.ADD_LN_PRIC_SCENE_DP_SUCCESS](state, { dp }) {
        state.dp = dp
    },
    [types.DEL_DP_DPS_FAILED](state, data) {
        state.dp = ""
    },
    [types.DEL_LN_PRIC_SCENE_DP_SUCCESS](state, data) {

    }

}


export default {
    state,
    getters,
    actions,
    mutations
}