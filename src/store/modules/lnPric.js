import * as types from '../mutation-types'
import api from '../../api/index'
import { pageSize } from '../../config'


const state = {
    lnPrics: [],
    lnPric: {},
    lnBusinessCode: "",
    activeSteps: 0,
    params: {
        StartRowNumber: 0,
        CurrentPage: 0,
        CustCode: 0,
        NextPage: 0,
        OrderAttr: 'UPDATE_TIME'
    }
}

// getters
const getters = {
    checkOutLnPrics: state => state.lnPrics,
    checkOutLnPric: state => state.lnPric,
    checkOutActiveSteps: state => state.activeSteps,
}

// actions
const actions = {
    getLnBusiness({ commit }, params) {
        var url = '/lnbusiness'
        var headers = {}
        if (params != undefined) {

            if (params.BusinessCode) {
                url = url + '/BusinessCode/' + params.BusinessCode
            }
            if (params.StartRowNumber || params.StartRowNumber > 0) {
                headers['Start-Row-Number'] = params.StartRowNumber
            }

        }
        api.getPage(url, params, (lnPrics, params) => {
            console.log("getLnBusiness---state.lnPrics--", state.lnPrics, "lnPrics", lnPrics)
            commit(types.GET_LN_BUSINESS_SUCCESS, { lnPrics, params })
        }, (data) => {
            commit(types.GET_LN_BUSINESS_FAILED, { data })
        })
    },
    getLnPrics({ commit }, params) {
        var url = '/pricelist'
        var headers = {}
        if (params != undefined) {

            if (params.CustCode) {
                url = url + '/CustCode/' + params.CustCode
            } else if (params.BusinessCode) {
                url = '/pricelist/businesscode/' + params.BusinessCode
            }
            if (params.StartRowNumber || params.StartRowNumber > 0) {
                headers['Start-Row-Number'] = params.StartRowNumber
            }

        }
        api.getPage(url, params, (lnPrics, params) => {
            console.log("types.GET_LN_PRICS_SUCCESS---getLnPrics--", lnPrics)
            commit(types.GET_LN_PRICS_SUCCESS, { lnPrics, params })
        }, (data) => {
            commit(types.GET_LN_PRICS_FAILED, { data })
        })
    },
    deleteLnPric({ commit }, params) {
        var url = "/pricelists"
        api.delete(url, { params }, (data) => {
            commit(types.DELETE_LN_PRIC_SUCCESS, { data })

        }, (data) => {
            commit(types.DELETE_LN_PRIC_FAILED, { data })
        })
    },
    saveLnBusinessInfo({ commit }, params) {
        var url = "/lnbusiness"
            //params.Principal = params.Principal * 10000
        console.log("saveLnBusinessInfo", params)

        api.save(url, { params }, (data) => {
            commit(types.SAVE_LN_PRICING_INFO_SUCCESS, { data })
            console.log("SAVE_LN_PRICING_INFO_SUCCESS", data)

            //router.push({ name: 'lnpricmort', params: { custCode: params.Cust.CustCode, businessCode: params.BusinessCode } })

        }, (data) => {
            console.log("SAVE_LN_PRICING_INFO_FAILED", data)
            commit(types.SAVE_LN_PRICING_INFO_FAILED, { data })
        })

    },
    lnBasePricing({ rootState, commit }, params) {
        var url = "/pricing/lnbase"
            //params.Principal = params.Principal * 10000
        console.log("开始基准定价", params)
        api.post(url, { params }, (data) => {
            commit(types.LN_BASE_PRICING_SUCCESS, { rootState, data })

            router.push({
                name: 'lnpricrst',
                params: {
                    custCode: params.CustCode,
                    businessCode: params.BusinessCode
                }
            })

            console.log("LN_BASE_PRICING_SUCCESS", data)
        }, (data) => {
            console.log("LN_BASE_PRICING_FAILED", data)
            commit(types.LN_BASE_PRICING_FAILED, { rootState, data })
        })
    },
    lnInversePricing({ rootState, commit }, params) {
        var url = "/pricing/lninverse"
            //params.Principal = params.Principal * 10000
        console.log("开始反算定价", params)
        api.post(url, { params }, (data) => {
            commit(types.LN_INVERSE_PRICING_SUCCESS, { rootState, data })
            console.log("LN_INVERSE_PRICING_SUCCESS", data)
        }, (data) => {
            console.log("LN_INVERSE_PRICING_FAILED", data)
            commit(types.LN_INVERSE_PRICING_FAILED, { rootState, data })
        })
    },
    saveLnPric({ commit }, params) {
        var url = "/pricelist/businesscode/" + params.BusinessCode
            //params.Principal = params.Principal * 10000
        console.log("开始保存定价单", params)
        api.update(url, { params }, (data) => {
            commit(types.SAVE_LN_PRICING_SUCCESS, { data })
            router.push({
                name: 'list'
            })
            console.log("SAVE_LN_PRICING_SUCCESS", data)
        }, (data) => {
            console.log("SAVE_LN_PRICING_FAILED", data)
            commit(types.SAVE_LN_PRICING_FAILED, { data })
        })
    }

}

// mutations
const mutations = {
    [types.GET_LN_BUSINESS_SUCCESS](state, { lnPrics, params }) {
        console.log("state.lnPrics--before--", state.lnPrics, "params", params)
        var lnPricVar = state.lnPrics //.length > 0 ? state.lnPrics : new Array()
        if (null != lnPrics && lnPrics.length > 0) {
            if (params.StartRowNumber > 0) {
                lnPricVar.push.apply(lnPricVar, lnPrics)
                state.lnPrics = lnPricVar
            } else {
                state.lnPrics = lnPrics
            }
            params.CurrentPage++
                params.NextPage++
                params.StartRowNumber = (params.NextPage - 1) * pageSize

            state.params = params
        } else {
            state.lnPrics = lnPrics
            state.params = params
        }
        console.log("state.lnPrics---after--", state.lnPrics, "params", params)

    },
    [types.GET_LN_PRICS_SUCCESS](state, { lnPrics, params }) {

        state.lnPric = lnPrics
        console.log("types.GET_LN_PRICS_SUCCESS", state.lnPric, lnPrics)


    },
    [types.GET_LN_BUSINESS_FAILED](state, data) {
        state.lnPrics = ""
    },
    [types.DELETE_LN_PRIC_SUCCESS](state, data) {
        // state.message.code = 200
        // state.message.msg = "删除定价单成功"
    },
    [types.DELETE_LN_PRIC_FAILED](state, data) {
        // state.message.code = 400
        // state.message.msg = "删除定价单失败"
    },
    [types.SAVE_LN_PRICING_INFO_SUCCESS](state, data) {
        //state.message.code = 200
        state.activeSteps++
            //state.message.msg = "保存定价单基本信息成功"
            console.log("types.SAVE_LN_PRICING_INFO_SUCCESS", state)
    },
    [types.SAVE_LN_PRICING_INFO_FAILED](state, data) {
        //state.message.code = 400
        //state.message.msg = "保存定价单基本信息失败"
    },
    [types.LN_BASE_PRICING_SUCCESS](state, { rootState, data }) {
        console.log("定价成功返回定价结果---", data)
        state.lnPrics = data

    },
    [types.LN_BASE_PRICING_FAILED](state, { rootState, data }) {
        rootState.message.code = "400"
        rootState.message.msg = data.ErrMsg
            // state.message.code = 400
            // state.message.msg = "贷款基础定价失败"
    },
    [types.LN_INVERSE_PRICING_SUCCESS](state, { rootState, data }) {
        console.log("反算成功返回定价结果---", data, "rootState", rootState)
        rootState.message.code = "LN_INVERSE_PRICING_SUCCESS"
        rootState.message.msg = "贷款反算成功"
        state.lnPric = data
            // state.message.code = 200
            // state.message.msg = "贷款反算成功"
    },
    [types.LN_INVERSE_PRICING_FAILED](state, { rootState, data }) {
        // state.message.code = 400
        // state.message.msg = "贷款反算失败"
    },
    [types.SAVE_LN_PRICING_SUCCESS](state, data) {
        // state.message.code = 200
        // state.message.msg = "贷款定价单保存成功"
    },
    [types.SAVE_LN_PRICING_FAILED](state, data) {
        // state.message.code = 400
        // state.message.msg = "贷款定价单保存失败"
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}