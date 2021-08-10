module.exports = {
  mode: 'jit',
  purge: [
    './index.html'
  ],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Noto Sans', 'ui-sans-serif', 'system-ui', 'sans'],
      },
      screens: {
        'print': {'raw': 'print'},
      },
    },
  },
};
