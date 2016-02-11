var config, gulp, changed;

gulp = require('gulp');
changed = require('gulp-changed');
config = require('./config.gulp.js');

gulp.task('build:assets', function() {
  return gulp.src(config.assets.src)
  .pipe(changed(config.assets.dest))
  .pipe(gulp.dest(config.assets.dest));
});
