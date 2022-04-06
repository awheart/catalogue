export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'catalogue',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  ssr: true,
  target: 'server',

  

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/src/assets/css/global.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/toast',
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    '@nuxtjs/eslint-module',
    '@nuxtjs/toast',
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  toast: {
    position: 'top-center',
    register: [
      {
        name: 'error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      },
      {
        name: 'success',
        message: 'Successfully registered !'
      }
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || "http://localhost:3000/",
  },

  server: {
    port: process.env.PORT || 3000
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/users/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: false,
          user: {
            url: '/api/users/user',
            method: 'get',
            propertyName: 'user'
          }
        },
        tokenRequired: true,
        tokenType: "Bearer"
      }
    },
    redirect: {
      login: '/users/login', // User will be redirected to this path if login is required
      logout: '/', // User will be redirected to this path if after logout, current route is protected
      home: '/users/loginIn' // User will be redirect to this path after login if accessed login page directly
    },
    rewriteRedirects: true,
  },

  serverMiddleware: [
    '~/src/api/server.js'
  ]
}
