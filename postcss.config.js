const { join } = require("path");

module.exports = {
  plugins: {
    "tailwindcss/nesting": {},
    ...(process.env.NODE_ENV === "production" ? { "postcss-minify": {} } : {}),
    tailwindcss: {
      config: join(__dirname, "tailwind.config.js"),
    },
    autoprefixer: {},
  },
};
