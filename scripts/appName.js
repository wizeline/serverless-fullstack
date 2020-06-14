const { configuration } = require('./configuration')

const getUndescoredString = (string) => string.split(' ').join('_')
const getLowerCaseString = (string) => string.toLowerCase()
const getLowerCasedUnderscoredString = (string) => getUndescoredString(getLowerCaseString(string))

module.exports.appName = configuration.applicationName

module.exports.shortName = configuration.shortName !== null && configuration.shortName !== ''
  ? configuration.shortName
  : getLowerCasedUnderscoredString(configuration.applicationName)
