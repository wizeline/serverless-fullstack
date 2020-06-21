const { configuration } = require('./configuration')

const getTrimString = (string) => string.split(' ').join('')
const getLowerCaseString = (string) => string.toLowerCase()
const getLowerCasedUnderscoredString = (string) => getTrimString(getLowerCaseString(string))

const getApplicationName = () => {
  try {
    if (!configuration || configuration === undefined) {
      throw new Error('Not configuration provided')
    }

    if (!configuration.applicationName || configuration.applicationName === '') {
      throw new Error('Application name is a required parameter, please provide it')
    }

    return configuration.applicationName
  } catch (error) {
    throw new Error(error)
  }
}

const getShortApplicationName = () => {
  try {
    if (!configuration || configuration === undefined) {
      throw new Error('Not configuration provided')
    }

    if (!configuration.applicationName || configuration.applicationName === '') {
      throw new Error('Application name is a required parameter, please provide it')
    }

    return configuration.shortApplicationName
      ? configuration.shortApplicationName
      : getLowerCasedUnderscoredString(configuration.applicationName)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports.appName = getApplicationName()

module.exports.shortName = getShortApplicationName()
