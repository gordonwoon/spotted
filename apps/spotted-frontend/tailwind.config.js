const { join } = require('path');

module.exports = {
  content: [join(__dirname, 'src/**/*.{js,ts,jsx,tsx}')],
  media: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
