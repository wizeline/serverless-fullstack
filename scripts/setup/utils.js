const getTrimmedString = (string) => string.split(' ').join('')
const getLowerCaseString = (string) => string.toLowerCase()
const getLowerCasedTrimmedString = (string) => getTrimmedString(getLowerCaseString(string))

const isValidProfile = (profile) => profile?.accessKey && profile?.secretAccessKey

module.exports = {
  getTrimmedString,
  getLowerCaseString,
  getLowerCasedTrimmedString,
  isValidProfile,
}
