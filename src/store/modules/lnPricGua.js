import * as types from '../mutation-types'
import api from '../../api/index'
import { pageSize } from '../../config'


const state = {
    lnGuarantes: [],
    guaranteCusts: [],
    message: { code: 200, msg: "" }
}

// getters
const getters = {
    checkOutLnGuarantes: state => state.lnGuarantes,
    checkOutGuaranteCusts: state => state.guaranteCusts
}

// actions
const actions = {
    getLnGuarantes({ rootState, commit }, params) {
        var url = "/lnguarante/BusinessCode/" + params.BusinessCode
        api.getPage(url, { params }, (lnGuarantes, params) => {
            commit(types.GET_LN_PRIC_GUARANTE_SUCCESS, { lnGuarantes })
            commit(types.SET_LN_BASE_GUARANTES_SUCCESS, { lnGuarantes })

        }, (data) => {
            commit(types.GET_LN_PRIC_GUARANTE_FAILED, { data })
        })
    },
    getGuaranteCusts({ commit }, params) {
        var custurl = '/cust/guarante/Status/02'
        if (params != undefined) {

            if (params.CustCode) {
                custurl = custurl + '/CustCode/' + params.CustCode
            } else if (params.CustName) {
                custurl = custurl + '/CustName/' + params.CustName
            }
        }
        api.getPage(custurl, params, (custs, params) => {
            console.log("api lnGuarantes", custs)
            commit(types.GET_LN_GUARANTES_SUCCESS, custs)
        }, () => {
            commit(types.GET_LN_GUARANTES_FAILED)
        })
    },
    saveLnGuarante({ dispatch, commit }, params) {
        var url = "/lnguarante"
            //params.Principal = params.Principal * 10000

        api.save(url, { params }, (data) => {
            commit(types.SAVE_LN_GUARANTE_SUCCESS, { data })
            var getParams = {
                'StartRowNumber': 0,
                'CurrentPage': 0,
                'NextPage': 1,
                'OrderAttr': 'CUST_NAME',
                'BusinessCode': data.BusinessCode
            }

            dispatch("getLnGuarantes", getParams)
        }, (data) => {
            commit(types.SAVE_LN_GUARANTE_FAILED, { data })
        })
    },
    deleteLnGuarante({ commit }, params) {
        var url = "/lnguarante"
        api.delete(url, { params }, (data, params) => {
            console.log("DELETE_LN_GUARANTE_SUCCESS----params", params)
            commit(types.DELETE_LN_GUARANTE_SUCCESS, { data, params })
        }, (data) => {
            console.log("DELETE_LN_GUARANTE_FAILED", data)
            commit(types.DELETE_LN_GUARANTE_FAILED, { data })
        })
    }

}

// mutations
const mutations = {
    [types.GET_LN_PRIC_GUARANTE_SUCCESS](state, { lnGuarantes }) {
        console.log("GET_LN_PRIC_GUARANTE_SUCCESS", lnGuarantes)
        state.lnGuarantes = lnGuarantes
            //rootState.lnBusiness.Guarantes = lnGuarantes
    },
    [types.GET_LN_PRIC_GUARANTE_FAILED](state, data) {
        state.lnGuarantes = ""
    },
    [types.GET_LN_GUARANTES_SUCCESS](state, lnGuarantes) {
        console.log("GET_LN_GUARANTES_SUCCESS", lnGuarantes)
        if (null == lnGuarantes) {
            state.guaranteCusts = []
        } else {
            state.guaranteCusts = lnGuarantes
        }
    },
    [types.GET_LN_PRIC_GUARANTE_FAILED](state, data) {
        state.guaranteCusts = ""
    },
    [types.SAVE_LN_GUARANTE_SUCCESS](state, data) {
        state.message.code = 200
        state.message.msg = "保存担保人成功"
        console.log("SAVE_LN_GUARANTE_SUCCESS", state.message)
    },
    [types.SAVE_LN_GUARANTE_FAILED](state, data) {
        state.message.code = 400
        console.log("SAVE_LN_GUARANTE_FAILED", data)
        state.message.msg = data.data.ErrMsg
    },
    [types.DELETE_LN_GUARANTE_SUCCESS](state, data, params) {
        state.message.code = 200
        state.message.msg = "删除保人成功"
        console.log("删除保人成功", data, params)
    },
    [types.DELETE_LN_GUARANTE_FAILED](state, data) {
        state.message.code = 400
        state.message.msg = data.data.ErrMsg
    },
    [types.DELETE_LN_GUARANTE_STATE](state, rootstate, data) {
        console.log("DELETE_LN_GUARANTE_STATE", rootstate, data)
    },

}


export default {
    state,
    getters,
    actions,
    mutations
}