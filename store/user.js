const SET_USER = 'SET_USER'
const LOGOUT = 'LOGOUT'
const actions = {
  async onAuthStateChangedAction(state, { authUser, claims }) {
    if (!authUser) {
      // remove state
      state.commit('SET_USER', null)

      //redirect from here
      this.$router.push({
        path: '/login',
      })
    } else {
      const { uid, email } = authUser
      state.commit('SET_USER', {
        uid,
        email,
      })
    }
  },
  setUser ({ commit }, { user }) {
    commit(SET_USER, { user })
  },
  logout ({commit}) {
    commit(LOGOUT)
  }

}

const mutations = {
  [SET_USER](state, user) {
    state.user = user
  },
  [LOGOUT] (state) {
    state.user = null
  }
}

const state = () => ({
  user: null,
})

const getters = {
  getUser(state) {
    return state.user
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}
