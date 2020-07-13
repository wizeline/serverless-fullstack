const fs = require('fs')
const { username } = require('os').userInfo()
const { AWSCredentials, setupConfigFile } = require('./constants')
const configuration = require('./configuration')
const { shortName } = require('./appName')
const { isValidProfile } = require('./utils')

const stages = ['dev', 'staging', 'prod']
const defaultStage = 'dev'

const writeInFile = (content) => {
  fs.appendFileSync(AWSCredentials(username), content, (err) => {
    if (err) throw err
  })
}

const getStageContent = (stage, credentials) => `
[${shortName}_${stage}]
aws_access_key_id=${credentials.accessKey}
aws_secret_access_key=${credentials.secretAccessKey}
`

const configureAWS = () => {
  const { awsProfiles } = configuration

  stages.forEach((stage) => {
    const content = isValidProfile(awsProfiles[stage])
      ? getStageContent(stage, awsProfiles[stage])
      : getStageContent(stage, awsProfiles[defaultStage])
    writeInFile(content)
  })

  fs.unlinkSync(setupConfigFile)
}

module.exports = configureAWS
module.exports.isValidProfile = isValidProfile
