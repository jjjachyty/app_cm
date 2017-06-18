import * as types from '../mutation-types'
import api from '../../api/index'
import { pageSize } from '../../config'


const state = {
    lnMorts: [],
}

// getters
const getters = {
    checkOutLnMorts: state => state.lnMorts
}

// actions
const actions = {
    getLnMorts({ rootState, commit }, params) {
        var url = "/lnmort/BusinessCode/" + params.BusinessCode
        api.getPage(url, { params }, (lnmorts, params) => {
            //commit(types.GET_LN_PRIC_MORTS_SUCCESS, { rootState, lnmorts })
            commit(types.SET_LN_BASE_MORTS_SUCCESS, { lnmorts })

        }, (data) => {
            commit(types.GET_LN_PRIC_MORTS_FAILED, { data })
        })
    },
    saveLnMorts({ commit }, params) {
        var url = "/lnmort"
        api.save(url, { params }, (data) => {
            commit(types.SAVE_LN_PRIC_MORTS_SUCCESS, { data })

        }, (data) => {
            commit(types.SAVE_LN_PRIC_MORTS_FAILED, { data })
        })
    }

}

// mutations
const mutations = {
    [types.GET_LN_PRIC_MORTS_SUCCESS](state, { rootState, lnmorts }) {
        rootState.lnBusiness.Morts = lnmorts
        console.log("设置抵押品", rootState.lnBusiness)
        state.lnMorts = lnmorts
    },
    [types.GET_LN_PRIC_MORTS_FAILED](state, data) {
        state.lnMorts = ""
    },
    [types.SAVE_LN_PRIC_MORTS_SUCCESS](state, { lnmort }) {

        console.log("保存押品成功")
    },
    [types.SAVE_LN_PRIC_MORTS_FAILED](state, data) {
        console.log("保存押品失败")

    },
}


export default {
    state,
    getters,
    actions,
    mutations
}