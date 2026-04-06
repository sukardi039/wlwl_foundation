module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'cn',
      fallbackLocale: 'cn',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/' },
      },
      '^/backend': {
        target: process.env.VUE_APP_BACKEND_URL || 'http://127.0.0.1/wlwl',
        changeOrigin: true,
        logLevel: 'debug',
        //        pathRewrite : { '^/backend/signin/' : '/backend/signin/index.php'}
      },
      '^/images': {
        target: process.env.VUE_APP_IMAGE_UPLOAD_URL || 'http://127.0.0.1/wlwl',
        changeOrigin: true,
        logLevel: 'debug',
        //        pathRewrite : { '^/backend/signin/' : '/backend/signin/index.php'}
      },
    },
  },

  transpileDependencies: [
    'vuetify',
    'fast-png',
    'iobuffer'
  ]
}
