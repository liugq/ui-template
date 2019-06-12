module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  //plugins:['vue','html'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "vue/no-parsing-error": [2, {
      "invalid-first-character-of-tag-name": false,
      "x-invalid-end-tag": false
    }],
    "vue/no-use-v-if-with-v-for": [2, {
      "allowUsingIterationVar": true
    }],
    'vue/no-unused-vars':[2]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
