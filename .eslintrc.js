module.exports = {
  extends: ['react-app', 'react-app/jest'],
  rules: {
    'no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'no-debugger': process.env.CI ? 'error' : 'warn'
  },
  overrides: [
    {
      files: ['**/*.js?(x)'],
      rules: {
        'react/jsx-filename-extension': ['warn', { 'extensions': ['.js', '.jsx'] }]
      }
    }
  ]
};
