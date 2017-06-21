import * as types from '../mutation-types'
import api from '../../api/index'
import { pageSize } from '../../config'


const state = {
    lnSceneIBs: [],
    lnSceneIB: {}
}

// getters
const getters = {
    checkOutLnSceneIBs: state => state.lnSceneIBs
}

// actions
const actions = {
    getLnSceneIBs({ commit }, params) {
        var url = "/sceneitd/BusinessCode/" + params.BusinessCode
        api.getPage(url, { params }, (lnSceneIBs, params) => {
            commit(types.GET_LN_PRIC_SCENE_IB_SUCCESS, { lnSceneIBs })

        }, (data) => {
            commit(types.GET_LN_PRIC_SCENE_IB_FAILED, { data })
        })
    },
    addLnSceneIB({ dispatch, commit }, params) {
        var url = "/sceneitd"
        api.save(url, { params }, (lnSceneDP) => {
            commit(types.ADD_LN_PRIC_SCENE_IB_SUCCESS, { lnSceneDP })
            dispatch('getLnSceneIBs', { BusinessCode: params.BusinessCode })

        }, (data) => {
            commit(types.ADD_LN_PRIC_SCENE_IB_FAILED, { data })
        })
    },
    updateLnSceneIB({ dispatch, commit }, params) {
        var url = "/sceneitd"
        api.update(url, { params }, (lnSceneDP) => {
            commit(types.ADD_LN_PRIC_SCENE_IB_SUCCESS, { lnSceneDP })
            dispatch('getLnSceneIBs', { BusinessCode: params.BusinessCode })
        }, (data) => {
            commit(types.ADD_LN_PRIC_SCENE_IB_FAILED, { data })
        })
    },

    delLnSceneIB({ dispatch, commit }, params) {
        var url = "/sceneitd"
        api.delete(url, { params }, (lnSceneDP, params) => {
            commit(types.DEL_LN_PRIC_SCENE_IB_SUCCESS, { lnSceneDP })
            dispatch('getLnSceneIBs', { BusinessCode: params.BusinessCode })

        }, (data) => {
            commit(types.DEL_LN_PRIC_SCENE_IB_FAILED, { data })
        })
    }

}

// mutations
const mutations = {
    [types.GET_LN_PRIC_SCENE_IB_SUCCESS](state, { lnSceneIBs }) {
        state.lnSceneIBs = lnSceneIBs
    },
    [types.GET_LN_PRIC_SCENE_IB_FAILED](state, data) {
        state.lnSceneIBs = ""
    },
    [types.ADD_LN_PRIC_SCENE_IB_SUCCESS](state, { lnSceneIB }) {
        state.lnSceneIB = lnSceneIB
    },
    [types.ADD_LN_PRIC_SCENE_IB_FAILED](state, data) {
        state.lnSceneIB = ""
    },
    [types.DEL_LN_PRIC_SCENE_IB_SUCCESS](state, data) {

    }
}


export default {
    state,
    getters,
    actions,
    mutations
}