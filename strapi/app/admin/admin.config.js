module.exports = {
    webpack: (config, webpack) => {
      // Add your variable using the DefinePlugin
      config.plugins.push(
        new webpack.DefinePlugin({
          PREVIEW_SITE: JSON.stringify(process.env.PREVIEW_SITE),
          PRODUCTION_SITE: JSON.stringify(process.env.PRODUCTION_SITE),
        })
      );
  
      return config;
    },
  };