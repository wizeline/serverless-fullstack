const npm = require('npm')
const { UIPath, APIPath } = require('./constants')

const installUIDependencies = () => {
  npm.load(() => npm.commands.install(UIPath, []))
}

const installAPIDependencies = () => {
  npm.load(() => npm.commands.install(APIPath, []))
}

const installDependencies = async () => {
  installUIDependencies()
  installAPIDependencies()
}

module.exports = installDependencies
