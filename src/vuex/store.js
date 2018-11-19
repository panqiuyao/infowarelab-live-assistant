
import mutations from './mutations.js'
import state from './state.js'
import getters from './getters.js'
import actions from './actions.js'


 const store = new Vuex.Store({
    state: state,
    getters:getters,
    mutations:mutations,
    actions:actions

 })

 
  export default store