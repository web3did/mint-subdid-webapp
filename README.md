# Mint SubDID

#### dev
``` bash
# install dependencies
$ yarn install

# generate the i18n file
$ yarn run i18n

# serve with hot reload at localhost:8080
$ yarn run dev
```

### build
```bash
# build for production and launch server
$ yarn run build
$ yarn run start
```

### use pm2 deployment
```bash 
$ yarn run reload_production
```

### abc.config.js
`hostname`: set the domain name, e.g.: subdid.web3did.io.

`googleAnalyticsId`: set the ID of Google Analytics, for example: G-5ZF27RB7VQ.

### config.js
Replace 127.0.0.1:8080 with your domain name, e.g. subdid.web3did.io.

if there is no test network, you can remove the isProdData related and judgment code.

`mainAccount`: to mint the parent account of the child account, for example: sfbw22.bit.

`servicesApi`: is the deployed backend API interface, for example: https://api-subdid.web3did.io.

