module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
      "indent": ["error", 4],
  },
  "settings": {
    "react": {
      "version": "detect"
    },
  },
  "ignorePatterns": ["old/"],
};
