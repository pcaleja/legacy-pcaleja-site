/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
const plugin = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();
const modRewrite = require('connect-modrewrite');
const runSequence = require('run-sequence');
const fs = require('fs');
const del = require('del');
const path = require('./gulp/helpers/path.js');
const views = require('./gulp/tasks/views')(gulp, plugin);
const styles = require('./gulp/tasks/styles')(gulp, plugin);
const scripts = require('./gulp/tasks/scripts')(gulp, plugin);
const images = require('./gulp/tasks/images')(gulp, plugin);

gulp.task('views', ['scripts', 'styles'], views);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('images', images);

gulp.task('clean', () => {
  return del('./public/*');
});

gulp.task('redirects', () => {
  return fs.createReadStream('./_redirects')
    .pipe(fs.createWriteStream('./public/_redirects'));
});

gulp.task('build', (callback) => {
  runSequence('clean', 'views', 'redirects', callback);
});

gulp.task('files-watch', ['views'], () => {
  browserSync.reload();
});

gulp.task('watch', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: './public/',
      middleware: [
        modRewrite([
          '^.([^\\.]+)$ /$1.html [L]',
          //path.html points to path except for the previously listed paths
        ]),
      ],
    },
  });
  gulp.watch([path.pug.glob], ['files-watch']);
  gulp.watch([path.js.glob], ['files-watch']);
  gulp.watch([path.css.glob], ['files-watch']);
});
