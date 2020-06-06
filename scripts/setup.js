const replaceFlags = require('./replaceFlags')
const installDependencies = require('./installDependencies')

const main = () => {
  const appName = process.env.npm_config_appName
  const shortName = process.env.npm_config_shortName || appName

  replaceFlags(appName, shortName)
  installDependencies()
}

main()
