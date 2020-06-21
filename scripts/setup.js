const configuration = require('./configuration')
const replaceFlags = require('./replaceFlags')
const configureAWS = require('./configureAWS')
const installDependencies = require('./installDependencies')

const main = () => {
  try {
    configuration.init()
    replaceFlags()
    configureAWS()
    installDependencies()
  } catch (error) {
    console.error(error)
  }
}

main()
