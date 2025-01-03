/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier/skip-formatting"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-unused-vars": "error",
    "vue/require-default-prop": "error",
    "vue/require-prop-types": "error",
    "vue/order-in-components": "error",
    "vue/html-indent": ["error", 2],
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "always"
    }],
    "vue/max-attributes-per-line": ["error", {
      "singleline": 3,
      "multiline": 1
    }],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn"
  }
}
