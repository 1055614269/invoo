'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_HOST: '"http://192.168.1.20/api/"'
  // API_HOST: '"http://10.126.32.134/api/"'
  // API_HOST: '"http://47.111.152.237:8087/api/"'
  API_HOST: '"/api"'
})

