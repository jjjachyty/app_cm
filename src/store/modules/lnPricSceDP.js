import * as types from '../mutation-types'
import api from '../../api/index'
import {pageSize} from '../../config'


const state = {
    lnSceneDPs:[],
}

// getters
const getters = {
  checkOutLnSceneDPs:state => state.lnSceneDPs
}

// actions
const actions = {
    getLnSceneDPs ({ commit },params) {
    var url ="/scenedp/BusinessCode/"+params.BusinessCode
    api.getPage(url,{params},(lnSceneDPs,params)=>{
        commit(types.GET_LN_PRIC_SCENE_DP_SUCCESS, { lnSceneDPs})
        
    },(data)=>{
         commit(types.GET_LN_PRIC_SCENE_DP_FAILED, { data})
    })
  }
  
}

// mutations
const mutations = {
  [types.GET_LN_PRIC_SCENE_DP_SUCCESS] (state, { lnSceneDPs }) {
    state.lnSceneDPs = lnSceneDPs
  },
  [types.GET_LN_PRIC_SCENE_DP_FAILED] (state,data) {
    state.lnSceneDPs = ""
  },
}


export default {
  state,
  getters,
  actions,
  mutations
}