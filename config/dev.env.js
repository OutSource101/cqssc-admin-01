var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '"http://localhost:8888/api"',
  // BASE_API: '"http://103.59.166.29:7777/api"',
   BASE_API: '"http://120.76.53.139:7777/api"'
})
