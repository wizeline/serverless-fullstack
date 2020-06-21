const fs = require('fs')

const flags = [/myapp/g, /MyApp/g]
const longNameFlags = [/My App/g]

/* DIR PATHS */
const UIPath = 'packages/ui/'
const APIPath = 'packages/api/'

const setupConfigFile = './setup.config.json'
const AWSCredentials = (username) => `/Users/${username}/.aws/credentials`
const packageJson = 'package.json'
const servelessStack = 'serverless.yaml'
const manifest = 'public/manifest.json'
const index = 'public/index.html'
const { isValidProfile } = require('./configureAWS')

let configuration

const getConfiguration = () => {
  if (!fs.existsSync(setupConfigFile)) {
    throw new Error('Could not find the setup.config.json file. Check it exists before continue')
  }

  const file = fs.readFileSync(setupConfigFile)
  const config = JSON.parse(file)

  if (!config || config === undefined) {
    throw new Error('Not configuration provided')
  }

  if (!config.applicationName || config.applicationName === '') {
    throw new Error('Application name is a required parameter, please provide it')
  }

  if (Object.keys(config.awsProfiles).length === 0 || !isValidProfile(config.awsProfiles.dev)) {
    throw new Error('AWS dev profile is required, please provide it')
  }

  configuration = config
}

module.exports.constants = {
  setupConfigFile,
  flags,
  longNameFlags,
  UIPath,
  APIPath,
  packageJson,
  servelessStack,
  manifest,
  index,
  AWSCredentials,
}

module.exports.init = getConfiguration
module.exports.configuration = configuration
