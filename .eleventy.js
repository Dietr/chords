const pluginRss = require('@11ty/eleventy-plugin-rss')
const markdownIt = require('markdown-it')
const filters = require('./utils/filters.js')
const transforms = require('./utils/transforms.js')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Eleventy config
module.exports = function(config) {
  // Plugins
  config.addPlugin(pluginRss)
  config.addPlugin(syntaxHighlight)

  // Filters
  Object.keys(filters).forEach((filterName) => {
    config.addFilter(filterName, filters[filterName])
  })

  // Transforms
  Object.keys(transforms).forEach((transformName) => {
    config.addTransform(transformName, transforms[transformName])
  })

  // Asset Watch Targets
  config.addWatchTarget('./src/assets')

  // Deep-Merge
  config.setDataDeepMerge(true)

  // ---
  // Aliases
  // ---
  config.addLayoutAlias('base', 'layouts/base.liquid');
  config.addLayoutAlias('default', 'layouts/default.liquid');
  config.addLayoutAlias('index', 'layouts/index.liquid');
  config.addLayoutAlias('typography', 'layouts/typography.liquid');


  // ---
  // Copy files to the compiled site folder
  // ---
  config.addPassthroughCopy('src/browserconfig.xml');
  config.addPassthroughCopy('src/site.webmanifest');
  config.addPassthroughCopy('src/assets/img');
  config.addPassthroughCopy('src/robots.txt');
  config.addPassthroughCopy('src/favicon.png');
  config.addPassthroughCopy('src/favicon.ico');
  config.addPassthroughCopy('src/apple-touch-icon-precomposed.png');

  // ---
  // Filters
  // ---
  // {{ variable | jsonify }}
  config.addFilter('jsonify', function (variable) {
    return JSON.stringify(variable);
  });

  // {{ array | where: key,value }}
  config.addFilter('where', function (array, key, value) {
    return array.filter(item => {
      const keys = key.split('.');
      const reducedKey = keys.reduce((object, key) => {
        return object[key];
      }, item);

      return (reducedKey === value ? item : false);
    });
  });

  // ---
  // Liquid config
  // ---
  config.setLiquidOptions({
    dynamicPartials: true,
    strict_filters: true
  });

  // ---
  // Config
  // ---
  return {
    dir: {
      input: "./src",   // Source
      output: "./dist" // Destination
    },
    passthroughFileCopy: true,
    htmlTemplateEngine: "liquid",
    dataTemplateEngine: "liquid"
  };
};
