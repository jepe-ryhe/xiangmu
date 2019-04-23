import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    name: '',
    token: '',
    currentMedicationID: '',
    medCurrentPage: 'list'
  },
  mutations: {
    set_token (state, token) {
      state.token = token
      console.log('state.token:' + state.token)
    },
    del_token (state) {
      state.token = ''
      console.log('state.token:' + state.token)
    },
    set_name (state, name) {
      state.name = name
      console.log('state.name:' + state.name)
    },
    del_name (state) {
      state.name = ''
      console.log('state.name:' + state.name)
    },
    set_userDept (state, name) {
      state.userDept = name
      console.log('state.userDept:' + state.userDept)
    },
    set_userDeptID (state, name) {
      state.userDeptID = name
      console.log('state.userDept:' + state.userDeptID)
    },
    set_currentMedicationID (state, ID) {
      state.currentMedicationID = ID
      console.log('state.token:' + state.currentMedicationID)
    },
    del_currentMedicationID (state) {
      state.currentMedicationID = ''
      console.log('state.token:' + state.currentMedicationID)
    },
    set_medCurrentPage (state, page) {
      state.medCurrentPage = page
      console.log('state.medCurrentPage:' + state.medCurrentPage)
    }
  }
})
