/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    
    plugins: [
        "@typescript-eslint"
    ],

    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
    ],

    overrides: [
    ],

    rules: {
        "@typescript-eslint/no-var-requires": "off",
        "vue/html-indent": ["error", 4, { "baseIndent": 1 }],
        "vue/multi-word-component-names": "off",
        "vue/one-component-per-file": "off",
        "indent": ["error", 4],
        "eol-last": ["error", "never"],
        "comma-dangle": ["error", "always-multiline"], // Require trailing comma only when using multiline objects, arrays etc. See https://eslint.org/docs/2.0.0/rules/brace-style#stroustrup
        "semi": ["error", "always"],
        "quotes": [2, "double"], // Strings should be double quotes per guidelines.
        "brace-style": ["error", "1tbs"], // if else conditions will begin in a new line after curly braces. See https://eslint.org/docs/2.0.0/rules/brace-style#stroustrup
        "space-before-function-paren": ["error", "never"], // Disallow space before function. See https://eslint.org/docs/rules/space-before-function-paren#never
    },
    
    ignorePatterns:[
        "node_modules/**/*", "gen/**/*",
    ],

    parserOptions: {
        ecmaVersion: "latest",
    },
};