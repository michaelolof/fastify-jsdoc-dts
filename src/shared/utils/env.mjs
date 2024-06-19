
/**
 * @template {keyof import("#src/dts/utils.js").EnvVars} K
 * @param {K} key
 * @returns {import("#src/dts/utils.js").EnvVars[K]} 
 */ 
export function getEnv(key) {
    const val = /** @type {string}*/ (process.env[key]);
    switch (key) {
        case "PORT":
        case "POSTGRES_PORT":
            return /** @type {any}*/ (Number(val));
        default:
            return /** @type {any}*/ (val);
    }
}