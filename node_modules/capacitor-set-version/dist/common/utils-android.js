"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAndroidVersionAndBuild = exports.checkForAndroidPlatform = void 0;
const fs = require("fs");
const path = require("path");
const custom_error_1 = require("./custom-error");
const GROOVY_CONFIG_FILE = 'android/app/build.gradle';
const KOTLIN_CONFIG_FILE = 'android/app/build.gradle.kts';
let isKotlin = false;
function checkForAndroidPlatform(dir) {
    const androidFolderPath = path.join(dir, 'android');
    if (!fs.existsSync(androidFolderPath))
        throw new Error(`Invalid Android platform: folder ${androidFolderPath} does not exist`);
    const groovyGradleBuildFilePath = path.join(dir, 'android/app/build.gradle');
    const kotlinGradleBuildFilePath = path.join(dir, 'android/app/build.gradle.kts');
    if (!fs.existsSync(groovyGradleBuildFilePath) && !fs.existsSync(kotlinGradleBuildFilePath))
        throw new Error(`Invalid Android platform: file ${groovyGradleBuildFilePath}(.kts) does not exist`);
}
exports.checkForAndroidPlatform = checkForAndroidPlatform;
function setAndroidVersionAndBuild(dir, version, build) {
    const groovyGradleBuildFilePath = path.join(dir, GROOVY_CONFIG_FILE);
    const kotlinGradleBuildFilePath = path.join(dir, KOTLIN_CONFIG_FILE);
    let file = null;
    // Try read a groovy config file first
    try {
        file = openGradleBuildFile(groovyGradleBuildFilePath);
    }
    catch (ignored) { }
    // If no groovy config exists, look for a kotlin config file
    if (file === null) {
        try {
            file = openGradleBuildFile(kotlinGradleBuildFilePath);
            // Set locally scoped Kotlin flag
            isKotlin = true;
        }
        catch (ignored) { }
    }
    // If neither type of file exist, throw an error
    if (file === null) {
        throw new custom_error_1.default('Failed to find a build.gradle(.kts) file.', {
            code: 'ERR_ANDROID',
            suggestions: ['Check your module level build.gradle(.kts) file.']
        });
    }
    file = setAndroidVersion(file, version);
    file = setAndroidBuild(file, build);
    saveGradleBuildFile(isKotlin ? kotlinGradleBuildFilePath : groovyGradleBuildFilePath, file);
}
exports.setAndroidVersionAndBuild = setAndroidVersionAndBuild;
function openGradleBuildFile(gradleBuildFilePath) {
    return fs.readFileSync(gradleBuildFilePath, 'utf-8');
}
function saveGradleBuildFile(gradleBuildFilePath, file) {
    fs.writeFileSync(gradleBuildFilePath, file, 'utf-8');
}
function setAndroidVersion(file, version) {
    checkIfVersionNameExist(file);
    const replaceValue = isKotlin ? `versionName = "${version}"` : `versionName "${version}"`;
    return file.replace(/(versionName).*/g, replaceValue);
}
function checkIfVersionNameExist(file) {
    if (!file.match(/(versionName).*/g)) {
        throw new custom_error_1.default(`Could not find "versionName" in android/app/build.grade(.kts) file`, {
            code: 'ERR_ANDROID',
            suggestions: ['Add "versionName" your build.gradle(.kts) file'],
        });
    }
}
function setAndroidBuild(file, build) {
    checkIfVersionCodeExist(file);
    const replaceValue = isKotlin ? `versionCode = ${build}` : `versionCode ${build}`;
    return file.replace(/(versionCode).*/g, replaceValue);
}
function checkIfVersionCodeExist(file) {
    if (!file.match(/(versionCode).*/g)) {
        throw new custom_error_1.default(`Could not find "versionCode" in android/app/build.grade(.kts) file`, {
            code: 'ERR_ANDROID',
            suggestions: ['Add "versionCode" to your build.gradle(.kts) file'],
        });
    }
}
