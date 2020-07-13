const fs = require('fs')
const { setupConfigFile } = require('./constants')
const { isValidProfile } = require('./utils')

const validateConfigurationFile = (callback) => {
  if (!fs.existsSync(setupConfigFile)) {
    throw new Error('Could not find the setup.config.json file. Check it exists before continue')
  }

  const file = JSON.parse(fs.readFileSync(setupConfigFile))

  if (!file.applicationName || file.applicationName === '') {
    throw new Error('Application name is a required parameter, please provide it')
  }

  if (Object.keys(file.awsProfiles).length === 0 || !isValidProfile(file.awsProfiles.dev)) {
    throw new Error('AWS Dev profile is required, please provide it')
  }

  callback()
}

const getConfiguration = () => {
  const file = fs.readFileSync(setupConfigFile)
  return JSON.parse(file)
}

module.exports = getConfiguration()
module.exports.validateConfigurationFile = validateConfigurationFile
