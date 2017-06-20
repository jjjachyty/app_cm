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
    getLnMorts({ commit }, params) {
        var url = "/lnmort/BusinessCode/" + params.BusinessCode
        api.getPage(url, { params }, (lnmorts, params) => {
            commit(types.GET_LN_PRIC_MORTS_SUCCESS, { lnmorts })
            commit(types.SET_LN_BASE_MORTS_SUCCESS, { lnmorts })

        }, (data) => {
            commit(types.GET_LN_PRIC_MORTS_FAILED, { data })
        })
    },
    saveLnMorts({ dispatch, commit }, params) {
        var url = "/lnmort"
        api.save(url, { params }, (data) => {
            commit(types.SAVE_LN_PRIC_MORTS_SUCCESS, { data })
            var params = {
                'StartRowNumber': 0,
                'CurrentPage': 0,
                'NextPage': 1,
                'OrderAttr': 'CUST_NAME',
                'BusinessCode': data.BusinessCode
            }
            dispatch('getLnMorts', params)
        }, (data) => {
            commit(types.SAVE_LN_PRIC_MORTS_FAILED, { data })
        })
    },
    updateLnMorts({ dispatch, commit }, params) {
        var url = "/lnmort"
        api.update(url, { params }, (data) => {
            commit(types.SAVE_LN_PRIC_MORTS_SUCCESS, { data })
            var params = {
                'StartRowNumber': 0,
                'CurrentPage': 0,
                'NextPage': 1,
                'OrderAttr': 'CUST_NAME',
                'BusinessCode': data.BusinessCode
            }
            dispatch('getLnMorts', params)
        }, (data) => {
            commit(types.SAVE_LN_PRIC_MORTS_FAILED, { data })
        })
    },
    deleteLnMorts({ dispatch, commit }, params) {
        var url = "/lnmort"
        api.delete(url, { params }, (data, params) => {
            commit(types.SAVE_LN_PRIC_MORTS_SUCCESS, { data })
            var params = {
                'StartRowNumber': 0,
                'CurrentPage': 0,
                'NextPage': 1,
                'OrderAttr': 'CUST_NAME',
                'BusinessCode': params.BusinessCode
            }
            dispatch('getLnMorts', params)
        }, (data) => {
            commit(types.SAVE_LN_PRIC_MORTS_FAILED, { data })
        })
    }

}

// mutations
const mutations = {
    [types.GET_LN_PRIC_MORTS_SUCCESS](state, { lnmorts }) {
        console.log("get types.GET_LN_PRIC_MORTS_SUCCESS")
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