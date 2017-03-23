/* eslint-disable import/no-extraneous-dependencies */

const env = require('../helpers/env.js');
const path = require('../helpers/path.js');
const fs = require('fs');

module.exports = (gulp, plugin) => {
  return () => {
    const locals = {
      fs,
      profile: JSON.parse(fs.readFileSync('./src/data/constant-profile.json', 'utf8')),
      skills: JSON.parse(fs.readFileSync('./src/data/constant-skills.json', 'utf8')),
      experiences: JSON.parse(fs.readFileSync('./src/data/constant-experiences.json', 'utf8')),
      styles: JSON.parse(fs.readFileSync('./src/data/styles.json', 'utf8')),
      scripts: JSON.parse(fs.readFileSync('./src/data/scripts.json', 'utf8')),
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
