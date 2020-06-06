const npm = require('npm')
const constants = require('./constants')

const installUIDependencies = () => {
  npm.load(() => npm.commands.install(constants.UIPath, [], (err, data) => {
    if (err) {
      console.error('An error has ocurred while trying to install npm dependencies in UI Package', err)
    } else {
      console.info('NPM Dependencies installed in UI Package', data)
    }
  }))
}

const installAPIDependencies = () => {
  npm.load(() => npm.commands.install(constants.APIPath, [], (err, data) => {
    if (err) {
      console.error('An error has ocurred while trying to install npm dependencies in API Package', err)
    } else {
      console.info('NPM Dependencies installed in API Package', data)
    }
  }))
}

const installDependencies = async () => {
  await installUIDependencies()
  await installAPIDependencies()
}

module.exports = installDependencies
