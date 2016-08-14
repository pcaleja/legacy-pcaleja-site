/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const plugin = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();
const modRewrite = require('connect-modrewrite');
const runSequence = require('run-sequence');
const del = require('del');
const path = require('./gulp/helpers/path.js');
const views = require('./gulp/tasks/views')(gulp, plugin);
const styles = require('./gulp/tasks/styles')(gulp, plugin);
const scripts = require('./gulp/tasks/scripts')(gulp, plugin);
const images = require('./gulp/tasks/images')(gulp, plugin);

gulp.task('views', views);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('images', images);

gulp.task('clean', () => {
  return del('./public/*');
});

gulp.task('build', (callback) => {
  runSequence('clean', 'images', ['scripts', 'styles'], 'views', callback);
});

gulp.task('views-watch', ['views'], () => {
  browserSync.reload();
});

gulp.task('styles-watch', ['styles'], () => {
  browserSync.stream();
});

gulp.task('scripts-watch', ['scripts'], () => {
  browserSync.stream();
});

gulp.task('images-watch', () => {
  runSequence('images', 'styles');
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
  gulp.watch([path.pug.glob], ['views-watch']);
  gulp.watch([path.js.glob], ['scripts-watch']);
  gulp.watch([path.css.glob], ['styles-watch']);
  gulp.watch([path.images.glob], ['images-watch']);
});
