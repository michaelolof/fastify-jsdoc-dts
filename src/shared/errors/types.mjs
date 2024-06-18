import { errs } from "./keys.mjs";

export class AppError extends Error {
    detailedMessage = "";
    data = /** @type {any}*/ (undefined);
    ts = Date.now();
    statusCode = 500;
    key = "";

    /**
     * @param {import("#dts/errors.js").ErrorKind} kind
     * @param {string} [message]
     * @param {number} [code]
     */
    constructor(kind, message, code) {
        super(message || kind.friendly);
        this.name = "AppError";
        this.statusCode = code || kind.code;
        this.key = kind.key;
    }

    /**
     * @param {Error} err 
     * @param {string} [msg] 
     * @returns {AppError}
     */
    static parseError(err, msg) {
        if (isStatusError(err)) {
            const e = new AppError(errs.DefaultErr, msg, err.statusCode);
            e.detailedMessage = err.message;
            return e;
        } else {
            const e = new AppError(errs.DefaultErr, msg);
            e.detailedMessage = err.message;
            return e;
        }
    }

    /**
     * @param {string} key 
     * @returns {AppError}
     */
    withKey(key) {
        this.key = key;
        return this;
    }

    /**
     * @param {any} data
     * @returns {AppError}
     */
    withData(data) {
        this.data = data;
        return this;
    }

    /**
     * @param {string} actualMessage
     * @returns {AppError}
     */
    withDetail(actualMessage) {
        this.detailedMessage = actualMessage;
        return this;
    }

    /**
     * Returns a serializable representation of the AppError
     * @returns {import("#dts/errors.js").ErrorExport}
     */
    toJSON() {
        return {
            name: this.name,
            key: this.key,
            ts: this.ts,
            status_code: this.statusCode,
            message: this.message,
            detailed_message: this.detailedMessage,
            data: this.data,
            stack: this.stack,
        };
    }
}

/**
 * @param {any} err
 * @returns {err is { statusCode: number }} 
 */
export function isStatusError(err) {
    return typeof err == "object" && err.statusCode && typeof err.statusCode === "number";
}