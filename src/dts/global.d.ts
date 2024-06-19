import type { EnvVars as ProcessEnvironemts } from "#dts/utils";

declare global {

    namespace NodeJS {

        interface ProcessEnv extends ProcessEnvironemts {}

    }
}