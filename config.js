const packageJson = require('./package.json')
const isProdData = window.location.host === '127.0.0.1:8080'
const hostname = isProdData ? '127.0.0.1:8080' : '127.0.0.1:8080'

module.exports = {
  isProdData,
  appNmae: packageJson.name,
  hostname,
  domain: `https://${hostname}/`,
  mainAccount: '',
  servicesApi: isProdData ? '' : '',
  identiconServe: 'https://identicons.did.id/identicon/',
  dasBalance: isProdData ? 'https://balance.did.id' : 'https://testbalance.did.id'
}
