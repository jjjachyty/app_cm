import * as types from '../mutation-types'
import lnCustAPI from '../../api/lncust'
import api from '../../api/index'
import {
    pageSize
} from '../../config'
const state = {
    lnCusts: [],
    lnCust: null,
    sid: null,
    params: {
        CustCode: '',
        CustName: '',
        CurrentPage: 0,
        NextPage: 0,
        StartRowNumber: 0,
        OrderAttr: ''

    }
}

// getters
const getters = {
    checkOutLnCusts: state => state.lnCusts,
    checkOutLnCust: state => state.lnCust,
}

// actions
const actions = {
    getMyLnCusts({ commit }, params) {
        lnCustAPI.getLnCust(params, (custs, params) => {
            commit(types.GET_LN_CUSTS_SUCCESS, { custs, params })
        }, () => {
            commit(types.GET_LN_CUSTS_FAILED)
        })
    },
    getLnCust({ commit }, params) {
        var url = "/cust/CustCode/" + params.CustCode
        console.log("getLnCust", url)
        api.get(url, {}, (cust) => {
            console.log("cust", cust)
            commit(types.GET_LN_CUST_SUCCESS, { cust })
        }, () => {
            commit(types.GET_LN_CUST_FAILED)
        })
    },
    saveLnCust({ commit }, params) {
        var url = "/cust"
        console.log("saveLnCust", url)
        api.save(url, { params }, (cust) => {
            console.log("cust", cust)
            commit(types.SAVE_LN_CUST_SUCCESS, { cust })
            router.push({ name: 'custs' })
        }, (data) => {
            commit(types.SAVE_LN_CUST_FAILED, { data })
        })
    },
    updateLnCust({ commit }, params) {
        var url = "/cust"
        console.log("saveLnCust", url)
        api.update(url, { params }, (cust) => {
            console.log("cust", cust)
            commit(types.SAVE_LN_CUST_SUCCESS, { cust })
            router.push({ name: 'custs' })
        }, (data) => {
            commit(types.SAVE_LN_CUST_FAILED, { data })
        })
    },
    delLnCust({ dispatch, commit }, params) {
        var url = "/cust"
        console.log("saveLnCust", url)
        api.delete(url, { params }, (cust) => {
            console.log("cust", cust)
            var params = {
                'StartRowNumber': 0,
                'CurrentPage': 0,
                'NextPage': 1,
                'OrderAttr': 'CREATE_TIME'
            }
            dispatch('getMyLnCusts', params)
            commit(types.SAVE_LN_CUST_SUCCESS, { cust })
        }, (data) => {
            dispatch('setMessage', { code: '300', msg: data.RstMsg })
            commit(types.SAVE_LN_CUST_FAILED, { data })
        })
    }
}

// mutations
const mutations = {
    //登录成功
    [types.GET_LN_CUSTS_SUCCESS](state, { custs, params }) {
        var lnCusts = state.lnCusts
        if (null != lnCusts && lnCusts.length > 0 && params.StartRowNumber > 0) {
            lnCusts.push.apply(lnCusts, custs)
        } else {
            lnCusts = custs
        }
        state.lnCusts = lnCusts
        params.CurrentPage++
            params.NextPage++
            params.StartRowNumber = (params.NextPage - 1) * pageSize
        state.params = params
    },
    [types.GET_LN_CUSTS_FAILED](state) {
        state.lnCusts = ""
    },
    [types.GET_LN_CUST_SUCCESS](state, { cust }) {
        state.lnCust = cust
    },
    [types.SAVE_LN_CUST_SUCCESS](state, { data }) {

    },
    [types.SAVE_LN_CUST_FAILED](state, { data }) {

    },
    [types.GET_LN_CUST_FAILED](cust) {
        state.lnCust = ""
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}