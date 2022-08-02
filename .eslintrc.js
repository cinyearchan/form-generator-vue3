module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-unused-components": 0,
    "no-unused-vars": 0,
    "import/order": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "no-param-reassign": 0,
    "no-unused-expressions": 0,
    "no-underscore-dangle": 0,
    "no-use-before-define": 0,
    "no-plusplus": 0,
    "vue/max-attributes-per-line": 0,
    "max-len": [1, { code: 120 }],
    "no-eval": 0,
    "no-multi-assign": 0,
    "prefer-rest-params": 0,
    "vue/require-prop-types": 0,
    "no-restricted-globals": 0,
    "prettier/prettier": "error"
  },
  globals: {
    location: false
  }
}
