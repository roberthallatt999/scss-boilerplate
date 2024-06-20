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

 import pkg from './package.json';

 module.exports = {
    "ui": {
        "port": pkg.browsersync.uiPort
    },
    "files": pkg.browsersync.files,
    "watch": true,
    "watchOptions": {
      "usePolling": true,
      "interval": 500,
    },
    "server": false,
    "proxy": pkg.browsersync.proxyUrl,
    "port": pkg.browsersync.port,
    "open": "false",
    "https": {
        //
        // 1. create local certs directory in shared folder
        // 2. allow Browsersync to access key: sudo chmod o+x /etc/ssl/private
        // 3. run -> docker cp ddev-router:/etc/nginx/certs /Users/robert/data/digital-designs/leonescreamery/.cert
        //
        key: pkg.browsersync.sslKey,
        cert: pkg.browsersync.sslCert,
      },
};