const { configuration } = require('./configuration')

const getTrimString = (string) => string.split(' ').join('')
const getLowerCaseString = (string) => string.toLowerCase()
const getLowerCasedUnderscoredString = (string) => getTrimString(getLowerCaseString(string))

module.exports.appName = configuration.applicationName

module.exports.shortName = configuration.shortName
  ? configuration.shortName
  : getLowerCasedUnderscoredString(configuration.applicationName)
