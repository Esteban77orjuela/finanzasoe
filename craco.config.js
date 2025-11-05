module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      console.log('Webpack configure called');
      console.log('Env:', env);
      
      // Log more detailed structure of webpackConfig
      console.log('Webpack config keys:', Object.keys(webpackConfig));
      
      // Check if there's a devServer property anywhere in the config
      const checkForDevServer = (obj, path = '') => {
        if (obj && typeof obj === 'object') {
          if (obj.devServer) {
            console.log(`Found devServer at path: ${path}.devServer`);
            console.log('DevServer keys:', Object.keys(obj.devServer));
            return true;
          }
          for (const key in obj) {
            if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
              if (checkForDevServer(obj[key], `${path}.${key}`)) {
                return true;
              }
            }
          }
        }
        return false;
      };
      
      checkForDevServer(webpackConfig, 'webpackConfig');
      
      return webpackConfig;
    }
  }
};