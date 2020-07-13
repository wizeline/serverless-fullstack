const replaceFlags = require('./replaceFlags')
const configureAWS = require('./configureAWS')
const installDependencies = require('./installDependencies')

const { validateConfigurationFile } = require('./configuration')

const setup = () => {
  replaceFlags()
  configureAWS()
  installDependencies()
}

const main = () => {
  try {
    validateConfigurationFile(setup)
  } catch (error) {
    console.error(error)
  }
}

main()
