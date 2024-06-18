/** @type {import('jest').Config} */
const config = {
    verbose: true,
    modulePaths: ["<rootDir>/src"],
    testMatch: [ "**/__tests__/**/*.?([mc])[jt]s?(x)", "**/?(*.)+(spec|test).?([mc])[jt]s?(x)" ],
};
  
export default config;