"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForCapacitorProject = exports.CAPACITOR_CONFIG_JSON_FILE = exports.CAPACITOR_CONFIG_JS_FILE = exports.CAPACITOR_CONFIG_TS_FILE = void 0;
const fs = require("fs");
const path = require("path");
const custom_error_1 = require("./custom-error");
exports.CAPACITOR_CONFIG_TS_FILE = 'capacitor.config.ts';
exports.CAPACITOR_CONFIG_JS_FILE = 'capacitor.config.js';
exports.CAPACITOR_CONFIG_JSON_FILE = 'capacitor.config.json';
function checkForCapacitorProject(dir) {
    checkDirectoryExist(dir);
    checkCapacitorConfigExist(dir);
}
exports.checkForCapacitorProject = checkForCapacitorProject;
function checkDirectoryExist(dir) {
    if (!fs.existsSync(dir)) {
        throw new custom_error_1.default(`Invalid project path: directory ${dir} does not exist`, {
            code: 'ERR_PROJECT',
            suggestions: ["Make sure you've passed the right path to your project"],
        });
    }
}
function checkCapacitorConfigExist(dir) {
    const configTsExist = fs.existsSync(path.join(dir, exports.CAPACITOR_CONFIG_TS_FILE));
    const configJsExist = fs.existsSync(path.join(dir, exports.CAPACITOR_CONFIG_JS_FILE));
    const configJsonExist = fs.existsSync(path.join(dir, exports.CAPACITOR_CONFIG_JSON_FILE));
    if (!configJsonExist && !configTsExist && !configJsExist) {
        throw new custom_error_1.default(`Invalid CapacitorJS project: neither ${exports.CAPACITOR_CONFIG_TS_FILE}, nor ${exports.CAPACITOR_CONFIG_JS_FILE} or ${exports.CAPACITOR_CONFIG_JSON_FILE} exist in folder ${dir}`, { code: 'ERR_PROJECT', suggestions: ['Make sure you are passing the right project path'] });
    }
}
