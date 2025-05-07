/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  return {
    postcssPlugin: "postcss-dir-tailwind-fix",
    Once(root) {
      root.walkRules((rule) => {
        if (
          rule.selector &&
          rule.selector.includes(":where(") &&
          (rule.selector.includes("rtl\\:") || rule.selector.includes("ltr\\:"))
        ) {
          rule.selector = rule.selector.replace(
            /:where\((?:[^()]*|\([^()]*\))*\)/g,
            ""
          );
          rule.selector = `[dir=${
            rule.selector.includes("rtl\\:") ? "rtl" : "ltr"
          }] ${rule.selector}`;
        }
      });
    },
  };
};

module.exports.postcss = true;