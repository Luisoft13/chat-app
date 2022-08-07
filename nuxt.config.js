import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - chat-vue-firebase',
    title: 'chat-vue-firebase',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyDOioATq0CDg5wWBhC_0suEfeh8InqALGs",
          authDomain: "chat-vue-firebase-b93eb.firebaseapp.com",
          projectId: "chat-vue-firebase-b93eb",
          storageBucket: "chat-vue-firebase-b93eb.appspot.com",
          messagingSenderId: "218782022777",
          appId: "1:218782022777:web:6499490e4a9c7c5a8a28a8"
        },
        services: {
          auth: {
            persistence: 'local', // default
            initialize: {
              onAuthStateChangedAction: 'user/onAuthStateChangedAction',
              subscribeManually: false
            },
          },
          database: true,
          realtimeDb: true,
          firestore: true
        }
      }
    ]
  ],

  router: {
    middleware: ['auth']
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#0190E0',
          secondary: colors.grey.lighten4,
          accent: '#FFBD6B',
          error: colors.red,
          info: colors.lightBlue,
          success: colors.green,
          warning: colors.orange
        },
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
