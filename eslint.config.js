import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  // Priority A (essential) rules only - no formatting/whitespace rules
  ...pluginVue.configs['flat/essential'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'vue/multi-word-component-names': ['error', { ignores: ['App'] }],
      // naming/casing conventions, without touching formatting
      'vue/attribute-hyphenation': 'error',
      'vue/v-on-event-hyphenation': 'error',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/no-required-prop-with-default': 'error',
    },
  },
];
