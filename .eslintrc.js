// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "expo",
    "prettier",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier/@typescript-eslint",
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "import/no-unresolved": "off",
  },
  settings: {
    "import/resolver": {
      alias: {
        extensions: [".js", ".jsx"],
        map: [["@", "./"]],
      },
    },
  },
};
