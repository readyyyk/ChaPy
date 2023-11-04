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
    "max-len": ["error", { "code": 90, 'ignoreStrings': true }],
    "linebreak-style": 0,
  },
  "settings": {
    "react": {
      "version": "detect"
    },
  },
  "ignorePatterns": ["APIs/"],
};
