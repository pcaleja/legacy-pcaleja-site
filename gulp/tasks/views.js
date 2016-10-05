/* eslint-disable import/no-extraneous-dependencies */

const env = require('../helpers/env.js');
const path = require('../helpers/path.js');
const fs = require('fs');

module.exports = (gulp, plugin) => {
  return () => {
    const locals = {
      fs,
      site: JSON.parse(fs.readFileSync('./src/data/constants.json', 'utf8')),
      scripts: JSON.parse(fs.readFileSync('./src/data/scripts.json', 'utf8')),
      styles: JSON.parse(fs.readFileSync('./src/data/styles.json', 'utf8')),
      header: JSON.parse(fs.readFileSync('./src/data/header.json', 'utf8')),
    };

    const stream = gulp.src(path.pug.src)
      .pipe(plugin.plumber({
        errorHandler(err) {
          plugin.notify.onError({
            title: 'Gulp Error',
            message: 'Error: <%= error.message %>',
            sound: 'Bottle',
          })(err);
          this.emit('end');
        },
      }))
      .pipe(env.development(plugin.pug({
        pretty: true,
        locals,
      })))
      .pipe(env.production(plugin.pug({
        locals,
      })))
      .pipe(gulp.dest(path.pug.dest));
    return stream;
  };
};
