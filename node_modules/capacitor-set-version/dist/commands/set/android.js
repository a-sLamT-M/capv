"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_command_1 = require("../../common/custom-command");
const utils_android_1 = require("../../common/utils-android");
const utils_capacitor_1 = require("../../common/utils-capacitor");
class SetAndroid extends custom_command_1.default {
    async run() {
        const { args, flags } = await this.parse(SetAndroid);
        const dir = args['dir'];
        const version = flags.version;
        const build = flags.build;
        (0, utils_capacitor_1.checkForCapacitorProject)(dir);
        (0, utils_android_1.checkForAndroidPlatform)(dir);
        (0, utils_android_1.setAndroidVersionAndBuild)(dir, version, build);
        return { version, build };
    }
}
exports.default = SetAndroid;
SetAndroid.description = 'Set android version and build number';
SetAndroid.examples = ['<%= config.bin %> <%= command.id %> /project/path -v 1.0.0-rc1 -b 10'];
SetAndroid.args = [...custom_command_1.default.args];
SetAndroid.flags = { ...custom_command_1.default.flags };
