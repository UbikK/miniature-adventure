const { getMetroTools } = require("react-native-monorepo-tools");

const monorepoMetroTools = getMetroTools(); /**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

console.info(monorepoMetroTools.watchFolders);
module.exports = {
  resetCache: true,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  watchFolders: monorepoMetroTools.watchFolders,
};
