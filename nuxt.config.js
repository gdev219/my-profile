export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'my-profile',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/scss/app.scss', '@fortawesome/fontawesome-free/css/all.css'],

  styleResources: {
    less: '~/assets/scss/*.scss',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-carousel.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/chakra
    '@chakra-ui/nuxt',
    // https://go.nuxtjs.dev/emotion
    '@nuxtjs/emotion',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://firebase.nuxtjs.org/guide/getting-started
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyBZ2MAT8yum7Dwhxh2UAR0lQzmlyheWrH0',
          authDomain: 'gdev219-profile-fcb9b.firebaseapp.com',
          databaseURL: 'https://gdev219-profile-fcb9b.firebaseio.com',
          projectId: 'gdev219-profile-fcb9b',
          storageBucket: 'gdev219-profile-fcb9b.appspot.com',
          messagingSenderId: '14701232827',
          appId: '1:14701232827:web:f1096e6fd3b56147b09f9e',
        },
        services: {
          auth: {
            persistence: 'local', // default
            initialize: {
              onAuthStateChangedMutation: 'auth/ON_AUTH_STATE_CHANGED_MUTATION',
              onAuthStateChangedAction: 'auth/onAuthStateChangedAction',
              subscribeManually: false,
            },
            ssr: false, // default
          },
          firestore: true,
          storage: true,
        },
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    middleware: 'auth',
  },
}
