export const actions = {
  async nuxtServerInit({ dispatch, commit }, { res, app, $fire }) {
    if (this.$fire.auth === null) {
      throw new Error(
        'nuxtServerInit Example not working - this.$fire.auth cannot be accessed.'
      )
    }

    if ($fire.auth === null) {
      throw new Error(
        'nuxtServerInit Example not working - $fire.auth cannot be accessed.'
      )
    }

    if (app.$fire.auth === null) {
      throw new Error(
        'nuxtServerInit Example not working - $fire.auth cannot be accessed.'
      )
    }
    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, $fire___ and app.$fire___'
    /** Get the VERIFIED authUser from the server */
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, ...authUser } = res.locals.user

      console.info(
        'Auth User verified on server-side. User: ',
        authUser,
        'Claims:',
        claims
      )

      await dispatch('auth/onAuthStateChanged', {
        authUser,
        claims,
      })
    }
  },
}
