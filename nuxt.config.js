module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'myvueapp',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    "@nuxtjs/axios"
  ],
  axios: {
  proxy: true, // proxy 사용
     // 모듈 설정
     baseURL: 'http://192.168.1.23:8555/api/cms/v1/form-mails',
  },
  proxy: {
    "/prefix-url": "proxy-url", // proxy url
  },
  

}

