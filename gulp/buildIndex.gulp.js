var config, gulp;

gulp = require('gulp');
config = require('./config.gulp.js');

gulp.task('build:index', function() {
  return gulp.src(config.index.src)
  .pipe(gulp.dest(config.index.dest));
});
