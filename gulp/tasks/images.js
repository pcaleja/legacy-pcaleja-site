const path = require('../helpers/path.js');

module.exports = (gulp, plugin) => {
  return () => {
    const stream = gulp.src(path.images.src)
      .pipe(plugin.rev())
      .pipe(gulp.dest(path.images.dest))
      .pipe(plugin.rev.manifest('images.json'))
      .pipe(gulp.dest('./src/data/'));
    return stream;
  };
};
