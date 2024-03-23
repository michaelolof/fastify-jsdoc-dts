import path from "path";
import { fileURLToPath } from "url";

/**
 * Get the name of a file
 */
export const __filename__ = () => fileURLToPath(import.meta.url);

/**
 * Get the name of the directory
 */
export const __dirname__ = () => path.dirname(__filename__()); // get the name of the directory