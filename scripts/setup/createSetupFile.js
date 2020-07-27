const fs = require('fs')
const { setupConfigFile } = require('./constants')

const setupConfigPlaceholder = `{
  "applicationName": "",
  "shortApplicationName": "",
  "awsProfiles": {
    "dev": {
      "accessKey": "",
      "secretAccessKey": ""
    },
    "staging": {
      "accessKey": "",
      "secretAccessKey": ""
    },
    "prod": {
      "accessKey": "",
      "secretAccessKey": ""
    }
  }
}`

function main() {
  fs.writeFileSync(setupConfigFile, Buffer.from(setupConfigPlaceholder), (err) => {
    if (err) {
      console.error('Setup config file could not be created!')
      return
    }

    console.info('Setup config file created!')
  })
}

main()
