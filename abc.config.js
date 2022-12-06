const packageJson = require('./package.json')
const isProd = process.env.NODE_ENV !== 'development'

module.exports = {
  isProd,
  appNmae: packageJson.name,
  hostname: '127.0.0.1:8080',
  host: '0.0.0.0',
  port: process.env.PORT || 8080,
  googleAnalyticsId: ''
}
