const sdkPackageJson = require("@yii-dev-panel/sdk/package.json");

module.exports = {
  name: "remote",
  exposes: {
    "./LogPanel": "./src/LogPanel",
    "./CachePanel": "./src/CachePanel"
  },
  filename: "external.js",
  shared: Object.entries(sdkPackageJson.dependencies).map(([name, version]) => ({
    [name]: {
      singleton: true,
      requiredVersion: version
    }
  }))
};
