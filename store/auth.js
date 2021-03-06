export const state = () => ({
  authUser: null,
})
// mutations
export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser, claims }) {
    if (!authUser) {
      state.authUser = null
    } else {
      const { uid, email, emailVerified, displayName, photoURL } = authUser
      state.authUser = {
        uid,
        displayName,
        email,
        emailVerified,
        photoURL: photoURL || null, // results in photoURL being null for server auth
        // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
        isAdmin: claims.custom_claim,
      }
    }
  },
  SET_USER(state, authUser) {
    state.authUser = authUser
  },
}
// actions
export const actions = {
  async onAuthStateChangedAction({ commit, dispatch }, { authUser, claims }) {
    if (!authUser) {
      await dispatch('cleanupAction')
      return
    }

    // you can request additional fields if they are optional (e.g. photoURL)
    const { uid, email, emailVerified, displayName, photoURL } = authUser

    commit('SET_USER', {
      uid,
      email,
      emailVerified,
      displayName,
      photoURL, // results in photoURL being undefined for server auth
      // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
      isAdmin: claims.custom_claim,
    })
  },
  cleanupAction({ commit }) {
    commit('SET_USER', null)
  },
}
// getters
export const getters = {
  getUser: (state) => {
    return state.authUser
  },
}
