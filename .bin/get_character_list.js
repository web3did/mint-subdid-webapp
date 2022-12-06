const axios = require('axios')
const fs = require('fs')
const path = require('path')

axios.post('https://register-api.did.id/v1/character/set/list', {})
  .then(res => {
    if (res.status === 200 && res.data && res.data.data) {
      const data = res.data.data
      for (const key in data) {
        try {
          const filePath = path.resolve(__dirname, `../src/modules/char_set/${key}.json`)
          const charList = JSON.stringify(data[key].sort(), null, 4)
          fs.writeFileSync(filePath, charList)
        }
        catch (error) {
          console.error(error)
        }
      }
    }
  })
  .catch(error => {
    console.error(error)
  })
