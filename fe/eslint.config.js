const nextPlugin = require('eslint-config-next');

module.exports = [
  {
    ...nextPlugin,
    rules: {
      ...nextPlugin.rules,
      'no-unused-vars': ['warn', { 
        varsIgnorePattern: '^[A-Z_]',
        argsIgnorePattern: '^_',
      }],
    },
  }
];