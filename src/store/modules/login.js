import * as types from '../mutation-types'
import loginApi from '../../api/login'
const state = {
    currentUser: null,
    sid: null
}

// getters
const getters = {
    getCurrentUser: state => state.currentUser
}

// actions
const actions = {
    userLogin({ dispatch, rootState, commit }, loginUser) {

        loginApi.userLogin(loginUser, (auth) => {
            console.log("auth----", auth, rootState)
            commit(types.LOGIN_SUCCESS, { rootState, auth })
                //commit(types.LOGIN_SUCCESS, { sid })
            router.push({ path: "/" })
        }, (data) => {
            dispatch('setMessage', { data })
            commit(types.LOGIN_FAILED, { rootState, data })
        })
    },
    loginOut({ rootState, commit }, loginUser) {

        loginApi.loginOut(loginUser, (auth) => {

            console.log("退出登录----", auth, rootState)
            commit(types.LOGOUT_SUCCESS, { rootState, auth })
                //commit(types.LOGIN_SUCCESS, { sid })
            router.push({ path: "/" })
        }, () => {

            commit(types.LOGOUT_FAILED)
        })
    }
}

// mutations
const mutations = {
    //登录成功
    [types.LOGIN_SUCCESS](state, { rootState, auth }) {
        sessionStorage.setItem('sid', auth.sid)
        sessionStorage.setItem('user_id', auth.data[0].user_id)
        sessionStorage.setItem('user_name', auth.data[0].user_name)

        rootState.auth = auth.data[0]
    },
    //登录失败
    [types.LOGIN_FAILED](state, { rootState, data }) {
        state.currentUser = ""
        rootState.message.code = data.code
        rootState.message.msg = data.msg
    },
    [types.LOGOUT_SUCCESS](state, { rootState, auth }) {
        sessionStorage.setItem('sid', "")
        sessionStorage.setItem('user_id', "")
        sessionStorage.setItem('user_name', "")
        rootState.auth = ""
    },
    //登录失败
    [types.LOGOUT_FAILED](state) {
        //state.currentUser = ""
        console.log("登出失败")
    }

}


export default {
    state,
    getters,
    actions,
    mutations
}