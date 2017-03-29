/* eslint-disable import/no-extraneous-dependencies */

const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const env = require('../helpers/env.js');
const es = require('event-stream');
const glob = require('glob');
const path = require('../helpers/path.js');
const source = require('vinyl-source-stream');

module.exports = (gulp, plugin) => {
  return (done) => {
    glob(path.js.src, (err, files) => {
      if (err) done(err);
      const tasks = files.map((entry) => {
        return browserify({ entries: [entry] })
          .transform('babelify', { presets: ['es2015'] })
          .bundle()
          .pipe(plugin.plumber({
            errorHandler(error) {
              plugin.notify.onError({
                title: 'Gulp Error',
                message: 'Error: <%= error.message %>',
                sound: false,
              })(error);
              this.emit('end');
            },
          }))
          .pipe(source(entry))
          .pipe(buffer())
          .pipe(env.production(plugin.uglify()))
          .pipe(plugin.rename({
            dirname: '',
            extname: '.bundle.js',
          }))
          .pipe(plugin.rev())
          .pipe(gulp.dest(path.js.dest));
      });
      es.merge(tasks)
        .pipe(plugin.rev.manifest('scripts.json'))
        .pipe(gulp.dest('./src/data/'))
        .on('end', done);
    });
  };
};
