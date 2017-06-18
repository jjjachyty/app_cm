import * as types from '../mutation-types'
import api from '../../api/index'
import {pageSize} from '../../config'


const state = {
    lnSceneIBs:[],
}

// getters
const getters = {
  checkOutLnSceneIBs:state => state.lnSceneIBs
}

// actions
const actions = {
    getLnSceneIBs ({ commit },params) {
    var url ="/sceneitd/BusinessCode/"+params.BusinessCode
    api.getPage(url,{params},(lnSceneIBs,params)=>{
        commit(types.GET_LN_PRIC_SCENE_IB_SUCCESS, { lnSceneIBs})
        
    },(data)=>{
         commit(types.GET_LN_PRIC_SCENE_IB_FAILED, { data})
    })
  }
  
}

// mutations
const mutations = {
  [types.GET_LN_PRIC_SCENE_IB_SUCCESS] (state, { lnSceneIBs }) {
    state.lnSceneIBs = lnSceneIBs
  },
  [types.GET_LN_PRIC_SCENE_IB_FAILED] (state,data) {
    state.lnSceneDPs = ""
  },
}


export default {
  state,
  getters,
  actions,
  mutations
}