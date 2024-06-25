/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */

const fs = require('fs');

const pkgPath = './package.json';
const pkgContents = fs.readFileSync(pkgPath, 'utf8');
const pkg = JSON.parse(pkgContents);


if (!pkg.config.browsersync.proxyUrl) {

  module.exports = {
    "ui": {
      "port": 3001
    },
    "files": {
      "watch": ["./dist/**/*.*"]
    },
    "watch": true,
    "proxy": false,
    "watchOptions": {
      "usePolling": true,
      "interval": 500,
    },
    // Specify the base directory for the server
    "server": {
      "baseDir": "./dist"
    },
    "port": pkg.config.browsersync.port,
    "open": true
  };

} else {

  module.exports = {
    "ui": {
        "port": pkg.config.browsersync.uiPort
    },
    "files": pkg.config.browsersync.files.watch,
    "watch": true,
    "watchOptions": {
      "usePolling": true,
      "interval": 500,
    },
    "server": false,
    "proxy": pkg.config.browsersync.proxyUrl,
    "port": pkg.config.browsersync.port,
    "open": true,
    "https": {
        key: pkg.config.browsersync.sslKey,
        cert: pkg.config.browsersync.sslCert,
  },
};

}





