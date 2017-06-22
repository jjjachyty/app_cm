import * as types from './mutation-types'


export const state = {
    tree: [],
    editOrAdd: "add",
    lnBusiness: {
        BusinessCode: "",
        Product: {
            ProductName: "",
            ProductCode: ""
        },
        Cust: {
            CustCode: "",
            CustName: ""
        },
        // Organ: {
        //     OrganCode: "",
        //     OrganName: ""
        // },
        Term: null,
        TermMult: "M",
        Currency: "CNY",
        RateType: "",
        RepriceFreq: "",
        RpymType: "",
        RpymCapitalFreq: "",
        Principal: "",
        BaseRateType: "1",
        MainMortgageType: "4",
        //Morts: [],
        //Guarantes: []
    },
    lnPricingSetp: 0,
    auth: null,
    message: { code: "", msg: "" }

}

export const mutations = {
    [types.GET_TREE_SUCCESS](state, { tree }) {
        state.tree = tree
    },
    [types.GET_TREE_FAILED](state, { data }) {

        state.tree = ""
    },
    [types.GET_LN_BUSINESS_CODE_SUCCESS](state, data) {
        state.lnBusiness.BusinessCode = data.data
    },
    [types.GET_LN_BUSINESS_CODE_FAILED](state, data) {
        state.lnBusiness.BusinessCode = ""
    },
    [types.SET_LN_BASE_FORM_SUCCESS](state, data) {
        console.log("修改定价单", data)
        state.lnBusiness = data.lnbusiness
    },
    [types.SET_LN_BASE_MORTS_SUCCESS](state, data) {
        console.log("Morts ------ 设置")
        console.log("查询抵押品并设置值", data.lnmorts)

        state.message.code = "200"
        state.message.msg = "设置抵押品信息成功"
        state.lnBusiness.Morts = data.lnmorts
    },
    [types.SET_LN_BASE_GUARANTES_SUCCESS](state, data) {
        console.log("Morts ------ 设置")
        console.log("查询担保人并设置值", data.lnGuarantes)
        state.message.msg = "设置担保人信息成功"
        state.message.code = "200"
        state.lnBusiness.Guarantes = data.lnGuarantes
    },
    [types.SET_MESSAGE_SUCCESS](state, message) {
        console.log("设置消息", message)
        state.message = message

    }

}