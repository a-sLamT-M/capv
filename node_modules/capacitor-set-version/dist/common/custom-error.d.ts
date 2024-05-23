import { CustomErrorOptions } from './custom-error-options';
export default class CustomError extends Error {
    code?: string;
    suggestions?: string[];
    constructor(message: string, options?: CustomErrorOptions);
}
