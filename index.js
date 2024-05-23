// updateVersion.js
const fs = require('fs');
const { exec } = require('child_process')
const packageObject = require('./package.json');
const {run} = require("capacitor-set-version");
const version = packageObject.version.split('.').map(num => parseInt(num));

// 简单的版本更新逻辑，例如增加修订号
version[2] += 1;
const newVersion = version.join('.');
const command = `capacitor-set-version -v ${newVersion} -b 1`
exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Unable to exec ${error}`);
        return;
    }
    if (stderr) {
        console.error(`${stderr}`);
        return;
    }
});
packageObject.version = newVersion;
fs.writeFileSync('package.json', JSON.stringify(packageObject, null, 2));
console.log(`Current version: ${newVersion}`);
