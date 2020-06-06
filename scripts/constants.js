const flags = [/myapp/g, /MyApp/g]
const longNameFlags = [/My App/g]

/* DIR PATHS */
const UIPath = 'packages/ui/'
const APIPath = 'packages/api/'

const packageJson = 'package.json'
const yamlFile = 'serverless.yaml'
const manifest = 'public/manifest.json'
const index = 'public/index.html'

module.exports = {
  flags,
  longNameFlags,
  UIPath,
  APIPath,
  packageJson,
  yamlFile,
  manifest,
  index,
}
