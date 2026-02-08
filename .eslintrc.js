module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'array-callback-return': 'warn',
    'no-unused-vars': ['warn', { 
      'varsIgnorePattern': '^(stripePromise|setEmailDatas)$',
      'argsIgnorePattern': '^_'
    }],
    'no-useless-escape': 'warn',
    'jsx-a11y/alt-text': 'warn'
  }
};

