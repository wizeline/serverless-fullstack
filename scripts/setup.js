const replace = require('replace-in-file')

const flags = ['myapp', 'MyApp']
const longNameFlags = ['My App']

/* DIR PATHS */
const UIPath = 'packages/ui/'
const APIPath = 'packages/api/'

const packageJson = 'package.json'
const yamlFile = 'serverless.yaml'
const manifest = 'public/manifest.json'
const index = 'public/index.html'

let appName
let shortName

const getUndescoredString = (string) => string.split(' ').join('_')
const getLowerCaseString = (string) => string.toLowerCase()
const getApplicationName = (string) => getUndescoredString(getLowerCaseString(string))

const replaceShortFlags = () => {
  return replace.sync({
    files: [
      packageJson,
      `${UIPath}${packageJson}`,
      `${APIPath}${packageJson}`,
      `${UIPath}${manifest}`,
      yamlFile,
    ],
    from: flags,
    to: getApplicationName(shortName),
  })
}

const replaceLongFlags = () => {
  return replace.sync({
    files: [
      `${UIPath}${manifest}`,
      `${UIPath}${index}`,
    ],
    from: longNameFlags,
    to: appName,
  })
}

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

  return filesChanged.filter((r) => r.hasChanged).length
}

const main = () => {
  appName = process.env.npm_config_appName
  shortName = process.env.npm_config_shortName || getUndescoredString(appName)

  const replacedFiles = replaceFlag()
  console.log(`${replacedFiles} files changed!`)
}

main()
