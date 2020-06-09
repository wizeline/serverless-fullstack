const replace = require('replace-in-file')
const constants = require('./constants')

const getUndescoredString = (string) => string.split(' ').join('_')
const getLowerCaseString = (string) => string.toLowerCase()
const getLowerCasedUnderscoredString = (string) => getUndescoredString(getLowerCaseString(string))

const replaceShortFlags = (shortName) => replace.sync({
  files: [
    constants.packageJson,
    `${constants.UIPath}${constants.packageJson}`,
    `${constants.APIPath}${constants.packageJson}`,
    `${constants.UIPath}${constants.manifest}`,
    constants.yamlFile,
  ],
  from: constants.flags,
  to: getLowerCasedUnderscoredString(shortName),
})

const replaceLongFlags = (appName) => replace.sync({
  files: [
    `${constants.UIPath}${constants.manifest}`,
    `${constants.UIPath}${constants.index}`,
  ],
  from: constants.longNameFlags,
  to: appName,
})

const replaceFlag = (appName, shortName) => {
  const changeShortName = replaceShortFlags(shortName)
  const changeAppName = replaceLongFlags(appName)

  const filesChanged = [...changeShortName, ...changeAppName.filter((change) => {
    const shortNameFile = changeShortName.find((ch) => ch.file === change.file)
    /* conditional to get unique files */
    if (shortNameFile) {
      return change.hasChanged !== shortNameFile.hasChanged && change.hasChanged
    }

    return change
  })]

  const filesCount = filesChanged.filter((r) => r.hasChanged).length
  console.info(`${filesCount} files changed!`)
}

module.exports = replaceFlag
