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

const getConfiguration = () => {
  const file = fs.readFileSync(setupConfigFile)
  return JSON.parse(file)
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

module.exports.configuration = getConfiguration()
