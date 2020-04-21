const packageJson = require('./package.json')

module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    ['@semantic-release/github', {
      assets: [
        'CHANGELOG.md',
        `release/${packageJson}-db.zip`,
        `release/${packageJson}-api.zip`,
        `release/${packageJson}-ui.zip`,
      ],
    }],
    '@semantic-release/git',
  ],
  preset: 'angular',
}
