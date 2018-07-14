'use strict';

module.exports = appInfo => {
  const devport = 9001;
  let config = {
    keys: appInfo.name + '_123912030128384',
    middleware: [],
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.html': 'nunjucks',
      },
    },
    proxy: "",//中间层前缀
    security: {
      csrf: {
        enable: false,
      },
    },
    timestamp: new Date().getTime(),
    maxAge: 1000 * 60 * 30,    
    session: {
      renew: true,
    },
    listen: {

    },
    //webpack配置
    webpack: {
      port: devport,  
      proxy: true,
      browser: false,
      webpackConfigList: require('../assets/webpack.config.js')
    }

  };
  return config;
};


