import * as types from '../mutation-types'
import api from '../../api/index'
import { pageSize } from '../../config'


const state = {
    dps: [],
    businessCode: "",
    dp: {},
    dpPric: {}
}

// getters
const getters = {
    checkOutDPs: state => state.dps,
    checkOutDP: state => state.dp,
    checkOutDPPric: state => state.dpPric
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
        }, (data) => {
            commit(types.ADD_LN_PRIC_SCENE_DP_FAILED, { data })
        })
    },
    updateDP({ dispatch, commit }, params) {
        var url = "/dp/one/business"
        api.update(url, { params }, (lnSceneDP) => {
            commit(types.ADD_LN_PRIC_SCENE_DP_SUCCESS, { lnSceneDP })
            dispatch('getLnSceneDPs', { BusinessCode: params.BusinessCode })
        }, (data) => {
            commit(types.ADD_LN_PRIC_SCENE_DP_FAILED, { data })
        })
    },

    delDP({ dispatch, commit }, params) {
        var url = "/dp/one/business"
        api.delete(url, { params }, (dp, params) => {
            dispatch('getDPs', { BusinessCode: params.BusinessCode })
        }, (data) => {
            commit(types.DEL_DP_DPS_FAILED, { data })
        })
    }

}

// mutations
const mutations = {
    [types.START_DP_PRIC_SUCCESS](state, { dp }) {
        state.dpPric = dp
    },
    [types.GET_DP_DPS_SUCCESS](state, { dps }) {
        state.dps = dps
    },
    [types.GET_LN_PRIC_SCENE_DP_FAILED](state, data) {
        state.dps = ""
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