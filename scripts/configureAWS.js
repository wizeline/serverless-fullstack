const fs = require('fs')
const { username } = require('os').userInfo()
const { constants, configuration } = require('./configuration')
const { shortName } = require('./appName')

const stages = ['dev', 'staging', 'prod']
const defaultStage = 'dev'

const isValidProfile = (profile) => !!profile
  && !!profile.accessKey
  && profile.accessKey !== ''
  && !!profile.secretAccessKey
  && profile.secretAccessKey !== ''

const writeInFile = (content) => {
  fs.appendFileSync(constants.AWSCredentials(username), content, (err) => {
    if (err) throw err
  })
}

const getStageContent = (stage, credentials) => `
[${shortName}_${stage}]
aws_access_key_id=${credentials.accessKey}
aws_secret_access_key=${credentials.secretAccessKey}
`

const configureAWS = () => {
  try {
    if (Object.keys(configuration.awsProfiles).length === 0 || !isValidProfile(configuration.awsProfiles.dev)) {
      throw new Error('AWS Dev profile is required, please provide it')
    }

    const { awsProfiles } = configuration

    stages.forEach((stage) => {
      if (isValidProfile(awsProfiles[stage])) {
        const content = getStageContent(stage, awsProfiles[stage])
        writeInFile(content)
      } else {
        const content = getStageContent(stage, awsProfiles[defaultStage])
        writeInFile(content)
      }
    })

    fs.unlinkSync(constants.setupConfigFile)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = configureAWS
module.exports.isValidProfile = isValidProfile
