module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    mocha: true,
  },
  rules: {
    'max-len': [1, 120, 2, { ignoreComments: true }],
    'react/prop-types': 0,
    'react/no-unused-state': 0,
    'object-curly-newline': 0,
    'no-console': 0,
    'arrow-parens': 0,
  },
};
