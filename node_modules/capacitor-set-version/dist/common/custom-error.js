"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(message, options) {
        var _a, _b;
        super(message);
        this.name = this.constructor.name;
        this.code = (_a = options === null || options === void 0 ? void 0 : options.code) !== null && _a !== void 0 ? _a : '';
        this.suggestions = (_b = options === null || options === void 0 ? void 0 : options.suggestions) !== null && _b !== void 0 ? _b : [];
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = CustomError;
