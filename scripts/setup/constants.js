const flags = [/myapp/g, /MyApp/g]
const longNameFlags = [/My App/g]

/* DIR PATHS */
const UIPath = 'packages/ui/'
const APIPath = 'packages/api/'

const setupConfigFile = './setup.config.json'
// TODO: add support for Windows
const AWSCredentials = (username) => `/Users/${username}/.aws/credentials`
const packageJson = 'package.json'
const servelessStack = 'serverless.yaml'
const manifest = 'public/manifest.json'
const index = 'public/index.html'

const MAX_LENGTH_ALLOWED = 44

module.exports = {
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
  MAX_LENGTH_ALLOWED,
}
