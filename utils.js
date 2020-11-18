const path = require('path')
const fs = require('fs')
const package = require('./package.json')
const package2 = require(path.resolve('./package.json'))
for (const key in package.devDependencies) {
  package2.devDependencies[key] = package.devDependencies[key]
}
fs.writeFile(path.resolve('./package.json'), JSON.stringify(package2), () => { })
