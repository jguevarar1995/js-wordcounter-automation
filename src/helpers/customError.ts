import { RuntimeError } from '@serenity-js/core'

export class CustomError extends RuntimeError {
    constructor(message: string, cause?: Error) {
        super(CustomError, message, cause);
    }
}