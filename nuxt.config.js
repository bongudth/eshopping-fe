export default {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'eShopping',
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

  loading: {
    color: '#007bff',
    continuous: true,
    duration: 2000,
    throttle: 0,
  },
  layoutTransition: {
    name: 'layout',
    mode: 'out-in',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/sass/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/api-services' },
    { src: '~/plugins/vee-validate' },
    { src: '~/plugins/vue-select' },
    { src: '~/plugins/vue-slick-carousel' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources',
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/device',
  ],

  // Share variables, mixins, functions across all style files
  // https://github.com/nuxt-community/style-resources-module
  // DO NOT put your CSS file in here, use the css option instead!
  styleResources: {
    scss: [
      '~/assets/sass/abstracts/variables.scss',
      '~/assets/sass/abstracts/mixins.scss',
      '~/node_modules/bootstrap/scss/_functions.scss',
      '~/node_modules/bootstrap/scss/_variables.scss',
      '~/node_modules/bootstrap/scss/_mixins.scss',
    ],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-i18n',
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    // IMPORTANT: Make sure to register axios module after the @nuxtjs/i18n module.
    // https://i18n.nuxtjs.org/lazy-load-translations
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/sentry',
    'cookie-universal-nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: process.env.API_BASE_URL,
    debug: process.env.DEBUG || false,
    proxyHeaders: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
    extend(config, ctx) {
      if (ctx.isDev) {
        // eslint-disable-next-line no-param-reassign
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
      }
    },
    babel: { compact: true },
  },

  // Nuxt-auth module Configuration https://auth.nuxtjs.org/guide/setup
  auth: {
    strategies: {
      local: {
        tokenType: 'Bearer',
        user: {
          property: 'data',
        },
        endpoints: {
          login: { url: '/auth/signin', method: 'post' },
          refresh: { url: '/refresh_tokens', method: 'post' },
          user: { url: '/users/me', method: 'get' },
        },
      },
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        scope: ['openid', 'profile', 'email'],
        responseType: 'token id_token',
        codeChallengeMethod: '',
        endpoints: {
          userInfo: '/me', // the endpoint to get the user info after you recived the token
        },
        user: {
          property: 'data',
        },
      },
    },
    redirect: {
      login: '/signin',
      callback: '/social-signin/google/callback',
      home: false,
    },
  },

  i18n: {
    locales: [
      { code: 'en', file: 'en' },
      { code: 'vi', file: 'vi' },
    ],
    lazy: true,
    langDir: 'i18n/',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true,
      alwaysRedirect: true,
    },
    vueI18n: {
      fallbackLocale: 'en',
    },
  },

  vue: {
    config: {
      productionTip: false,
      devtools: process.env.NODE_ENV === 'development' || process.env.DEBUG,
    },
  },
};
