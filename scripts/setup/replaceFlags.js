const replace = require('replace-in-file')
const constants = require('./constants')
const { appName, shortName } = require('./appName')

const replaceShortFlags = () => replace.sync({
  files: [
    constants.packageJson,
    `${constants.UIPath}${constants.packageJson}`,
    `${constants.APIPath}${constants.packageJson}`,
    `${constants.UIPath}${constants.manifest}`,
    constants.servelessStack,
  ],
  from: constants.flags,
  to: shortName,
})

const replaceLongFlags = () => replace.sync({
  files: [
    `${constants.UIPath}${constants.manifest}`,
    `${constants.UIPath}${constants.index}`,
  ],
  from: constants.longNameFlags,
  to: appName,
})

const replaceFlag = () => {
  const changeShortName = replaceShortFlags()
  const changeAppName = replaceLongFlags()

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
