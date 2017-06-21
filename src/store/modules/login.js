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
    userLogin({ rootState, commit }, loginUser) {

        loginApi.userLogin(loginUser, (auth) => {
            console.log("auth----", auth, rootState)
            commit(types.LOGIN_SUCCESS, { rootState, auth })
                //commit(types.LOGIN_SUCCESS, { sid })
            router.push({ path: "/" })
        }, () => {

            commit(types.LOGIN_FAILED)
        })
    },
    loginOut({ rootState, commit }, loginUser) {

        loginApi.loginOut(loginUser, (auth) => {

            console.log("退出登录----", auth, rootState)
            commit(types.LOGOUT_SUCCESS, { rootState, auth })
                //commit(types.LOGIN_SUCCESS, { sid })

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
        rootState.auth = auth.data[0]
    },
    //登录失败
    [types.LOGIN_FAILED](state) {
        state.currentUser = ""
    },
    [types.LOGOUT_SUCCESS](state, { rootState, auth }) {
        //sessionStorage.setItem('sid', "")
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