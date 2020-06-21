const replaceFlags = require('./replaceFlags')
const configureAWS = require('./configureAWS')
const installDependencies = require('./installDependencies')

const main = () => {
  try {
    replaceFlags()
    configureAWS()
    installDependencies()
  } catch (error) {
    console.error(error)
  }
}

main()
