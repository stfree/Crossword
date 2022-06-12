/**
babel.config.js with useful plugins.
*/
/* eslint-disable func-names */
module.exports = function (api) {
  api.cache(true);
  const presets = ["@babel/preset-env", "@babel/preset-react"];
  const env = {
    test: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
    },
  };

  const plugins = ["@babel/plugin-syntax-jsx"];

  return {
    presets,
    plugins,
    env,
  };
};
