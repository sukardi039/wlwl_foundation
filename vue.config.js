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
        target: 'http://127.0.0.1/wlwl',
        changeOrigin: true,
        logLevel: 'debug',
        //        pathRewrite : { '^/backend/signin/' : '/backend/signin/index.php'}
      },
      '^/images': {
        target: 'http://127.0.0.1/wlwl',
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
