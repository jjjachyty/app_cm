import * as types from '../mutation-types'
import api from '../../api/index'
import { pageSize } from '../../config'


const state = {
    lnSceneDPs: [],
    lnSceneDP: {}
}

// getters
const getters = {
    checkOutLnSceneDPs: state => state.lnSceneDPs,
    checkOutLnSceneDP: state => state.lnSceneDP

}

// actions
const actions = {
    getLnSceneDPs({ commit }, params) {
        var url = "/scenedp/BusinessCode/" + params.BusinessCode
        api.getPage(url, { params }, (lnSceneDPs, params) => {
            commit(types.GET_LN_PRIC_SCENE_DP_SUCCESS, { lnSceneDPs })

        }, (data) => {
            commit(types.GET_LN_PRIC_SCENE_DP_FAILED, { data })
        })
    },
    addLnSceneDP({ dispatch, commit }, params) {
        var url = "/scenedp"
        api.save(url, { params }, (lnSceneDP) => {
            commit(types.ADD_LN_PRIC_SCENE_DP_SUCCESS, { lnSceneDP })
            dispatch('getLnSceneDPs', { BusinessCode: params.BusinessCode })

        }, (data) => {
            commit(types.ADD_LN_PRIC_SCENE_DP_FAILED, { data })
        })
    },
    updateLnSceneDP({ dispatch, commit }, params) {
        var url = "/scenedp"
        api.update(url, { params }, (lnSceneDP) => {
            commit(types.ADD_LN_PRIC_SCENE_DP_SUCCESS, { lnSceneDP })
            dispatch('getLnSceneDPs', { BusinessCode: params.BusinessCode })
        }, (data) => {
            commit(types.ADD_LN_PRIC_SCENE_DP_FAILED, { data })
        })
    },

    delLnSceneDP({ dispatch, commit }, params) {
        var url = "/scenedp"
        api.delete(url, { params }, (lnSceneDP, params) => {
            commit(types.DEL_LN_PRIC_SCENE_DP_SUCCESS, { lnSceneDP })
            dispatch('getLnSceneDPs', { BusinessCode: params.BusinessCode })

        }, (data) => {
            commit(types.DEL_LN_PRIC_SCENE_DP_FAILED, { data })
        })
    }

}

// mutations
const mutations = {
    [types.GET_LN_PRIC_SCENE_DP_SUCCESS](state, { lnSceneDPs }) {
        state.lnSceneDPs = lnSceneDPs
    },
    [types.GET_LN_PRIC_SCENE_DP_FAILED](state, data) {
        state.lnSceneDPs = ""
    },
    [types.ADD_LN_PRIC_SCENE_DP_SUCCESS](state, { lnSceneDP }) {
        state.lnSceneDP = lnSceneDP
    },
    [types.ADD_LN_PRIC_SCENE_DP_FAILED](state, data) {
        state.lnSceneDP = ""
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