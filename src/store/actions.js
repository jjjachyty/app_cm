import api from '../api/index'
import * as types from './mutation-types'
// actions
export const getTree = ({ commit }, params) => {
    var url = ""
    console.log("获取机构数", params)
    switch (params.QueryType) {
        case 'Product':
            console.log("Product", "Product")
            url = "/tree/product?code=" + params.ProductCode
            break
        case 'Mort':
            console.log("Mort", "Mort")
            url = "/tree/mortgage?topCode=" + params.MortCode
            break
        case 'Industry':
            console.log("tree", "industry")
            url = "/tree/industry"
            break
    }
    api.get(url, {}, (tree) => {
        console.log("tree", tree)
        commit(types.GET_TREE_SUCCESS, { tree })

    }, (data) => {
        commit(types.GET_TREE_FAILED, { data })
    })
}
export const getLnBusinessCode = ({ commit }) => {
    var url = "/code/lnbusiness"
    api.get(url, {}, (data) => {
        commit(types.GET_LN_BUSINESS_CODE_SUCCESS, { data })
    }, (data) => {
        commit(types.GET_LN_BUSINESS_CODE_FAILED, { data })
    })
}

export const getMortTree = ({ commit }) => {
    var url = "/code/lnbusiness"
    api.get(url, {}, (data) => {
        commit(types.GET_LN_BUSINESS_CODE_SUCCESS, { data })
    }, (data) => {
        commit(types.GET_LN_BUSINESS_CODE_FAILED, { data })
    })
}

export const setLnBusiness = ({ commit }, lnbusiness) => {
    commit(types.SET_LN_BASE_FORM_SUCCESS, { lnbusiness })
}
export const setMessage = ({ commit }, message) => {
    commit(types.SET_MESSAGE_SUCCESS, { message })
}