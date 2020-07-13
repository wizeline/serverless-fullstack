const configuration = require('./configuration')
const { getLowerCasedTrimmedString } = require('./utils.js')

const getApplicationName = configuration.applicationName

const getShortApplicationName = configuration.shortApplicationName
  ? getLowerCasedTrimmedString(configuration.shortApplicationName)
  : getLowerCasedTrimmedString(configuration.applicationName)

module.exports.appName = getApplicationName

module.exports.shortName = getShortApplicationName
