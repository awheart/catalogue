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
      { rel: "stylesheet", href: "https://www.w3schools.com/w3css/4/w3.css" }
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
  ],
  bootstrapVue: {
    icons: true
  },

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
    ],
    logout: [
      {
        name: 'error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      },
      {
        name: 'success',
        message: 'yes'
      }
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  axios: {
    baseURL: "localhost:3000",
    proxy: true
  },

  proxy: {
    // Simple proxy
    "/api/": {
      target: "https://localhost:3000/",
      pathRewrite: { "^/api/": "" }
    }
  },

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
    axios: {
      baseURL: process.env.BASE_URL, // Used as fallback if no runtime config is provided
    },
  },

  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
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
      home: '/' // User will be redirect to this path after login if accessed login page directly
    },
    rewriteRedirects: true,
  },

  serverMiddleware: [
    '~/src/api/server.js'
  ]
}
