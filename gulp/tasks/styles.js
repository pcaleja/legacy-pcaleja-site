/* eslint-disable import/no-extraneous-dependencies */

const env = require('../helpers/env.js');
const path = require('../helpers/path.js');
// const fs = require('fs');

module.exports = (gulp, plugin) => {
  return () => {
    const stream = gulp.src(path.css.src)
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
      .pipe(env.development(plugin.sourcemaps.init()))
      .pipe(plugin.sass())
      .pipe(plugin.autoprefixer())
      .pipe(env.production(plugin.cssnano({
        autoprefixer: false,
        zindex: false,
      })))
      .pipe(plugin.rename({
        extname: '.min.css',
      }))
      .pipe(env.development(plugin.sourcemaps.write()))
      // .pipe(plugin.fingerprint(JSON.parse(fs.readFileSync('./src/data/images.json', 'utf8')), {
      //   prefix: '../images/',
      // }))
      .pipe(plugin.rev())
      .pipe(gulp.dest(path.css.dest))
      .pipe(plugin.rev.manifest('styles.json'))
      .pipe(gulp.dest('./src/data/'));
    return stream;
  };
};
