const replaceFlags = require('./replaceFlags')
const configureAWS = require('./configureAWS')
const installDependencies = require('./installDependencies')

const main = async () => {
  replaceFlags()
  configureAWS()
  installDependencies()
}

main()
