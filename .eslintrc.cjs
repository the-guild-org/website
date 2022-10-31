module.exports = {
  extends: ['@theguild', '@theguild/eslint-config/react'],
  rules: {
    'unicorn/filename-case': 0,
    'prefer-const': ['error', { destructuring: 'all' }],
  },
};
