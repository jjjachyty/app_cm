import * as types from '../mutation-types'

import api from '../../api/index'


import {
    pageSize,
    rpmApiRoot,
    approveApiRoot,
    rpmWebRoot
} from '../../config'
const state = {
    approves: [],
    approvesCount: "",
    snapShot: ""
}

// getters
const getters = {
    checkOutApproves: state => state.approves,
    checkOutApprovesCount: state => state.approvesCount,
    checkOutSnapShot: state => state.snapShot
}

// actions
const actions = {
    getMyApproves({ commit }, params) {
        var url = "/api/list?userId=" + params.userId
        api.getJsonp(url, null, (approves) => {
            commit(types.GET_APPROVE_LIST_SUCCESS, { approves })
        }, () => {
            commit(types.GET_APPROVE_LIST_FAILED)
        })
    },
    getApprovesSanpShot({ commit }, params) {
        var url = "/api/info?userId=" + params.userId + "&taskId=" + params.taskId
        api.getJsonp(url, null, (url) => {
            commit(types.GET_APPROVE_SNAPSHOT_SUCCESS, { url })
        }, () => {
            commit(types.GET_APPROVE_SNAPSHOT_FAILED)
        })
    },
    submitApprove({ dispatch, commit }, params) {
        var noticeUrl = "noticeUrl=" + rpmApiRoot + "/work/flow/ln/pricing"
        var snapshotUrl = "snapshotUrl=" + rpmWebRoot + "/lnload/view.html?businessCode=" + params.businessCode + "%26sid=" + sessionStorage.getItem("sid")
        var processDefinitionKey = "processDefinitionKey=rpm_ln"
        var pricJson = "json=" + params.json
        var url = "/create?businessKey=" + params.businessKey + "&userId=" + params.userId + "&" + noticeUrl + "&" + processDefinitionKey + "&" + snapshotUrl + "&" + pricJson
        console.log("submitApprove--url--", url)
        api.getJsonp(url, null, (url) => {
            commit(types.SUBMIT_APPROVE_SUCCESS, { url })



            dispatch('getLnBusiness', {
                'StartRowNumber': 0,
                'CurrentPage': 0,
                'NextPage': 1,
                'OrderAttr': 'CREATE_TIME'
            })

        }, () => {
            commit(types.SUBMIT_APPROVE_FAILED)
        })
    },
    allowApprove({ dispatch, commit }, params) {
        var url = "/api/handle?userId=" + params.userId + "&taskId=" + params.taskId + "&comment=" + params.comment
        api.getJsonp(url, null, (url) => {
            commit(types.ALLOW_APPROVE_SUCCESS, { url })
            dispatch('getMyApproves', { userId: params.userId })
        }, () => {
            commit(types.ALLOW_APPROVE_FAILED)
        })
    },
    rejectApprove({ dispatch, commit }, params) {
        var url = "/api/reject?userId=" + params.userId + "&taskId=" + params.taskId + "&comment=" + params.comment
        api.getJsonp(url, null, (url) => {
            commit(types.REJECT_APPROVE_SUCCESS, { url })
            dispatch('getMyApproves', { userId: params.userId })
        }, () => {
            commit(types.REJECT_APPROVE_FAILED)
        })
    }
}

// mutations
const mutations = {
    //登录成功
    [types.GET_APPROVE_LIST_SUCCESS](state, { approves }) {
        state.approvesCount = String(approves.length)
        state.approves = approves
    },
    [types.GET_APPROVE_LIST_FAILED](state, data) {

    },
    [types.GET_APPROVE_SNAPSHOT_SUCCESS](state, { url }) {
        state.snapShot = approveApiRoot + "/" + url
    },
    [types.GET_APPROVE_SNAPSHOT_FAILED](state, data) {

    },
    [types.ALLOW_APPROVE_SUCCESS](state, data) {

    },
    [types.ALLOW_APPROVE_FAILED](state, data) {

    },
    [types.SUBMIT_APPROVE_SUCCESS](state, data) {

    },
    [types.SUBMIT_APPROVE_FAILED](state, data) {

    },
    [types.REJECT_APPROVE_SUCCESS](state, data) {

    },
    [types.REJECT_APPROVE_FAILED](state, data) {

    }
}


export default {
    state,
    getters,
    actions,
    mutations
}