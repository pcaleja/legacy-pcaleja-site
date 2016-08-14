/* eslint-disable import/no-extraneous-dependencies */

const environments = require('gulp-environments');

const env = {
  production: environments.production,
  development: environments.development,
};

module.exports = env;
