module.exports = {
  'extends': [
    'airbnb',
    'react-native'
  ],
  'parser': 'babel-eslint',
  'plugins': [
    'react',
    'react-hooks',
    'jsx-a11y',
    'import'
  ],
  'rules': {
    'no-use-before-define': 'error',
    'react/jsx-filename-extension': 'error',
    'react/prop-types': 'error',
    'comma-dangle': 'error'
  },
}