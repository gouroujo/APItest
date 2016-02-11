var annotate, coffee, concat, config, gulp, plumber, sourcemaps;
gulp = require('gulp');
sourcemaps = require('gulp-sourcemaps');
annotate = require('gulp-ng-annotate');
concat = require('gulp-concat');
plumber = require('gulp-plumber');
config = require('./config.gulp.js');
var eslint = require('gulp-eslint');


gulp.task('build:app', function() {
  return gulp.src(config.app.src)
  // eslint() attaches the lint output to the "eslint" property
  // of the file object so it can be used by other modules.
  .pipe(eslint())
  // eslint.format() outputs the lint results to the console.
  // Alternatively use eslint.formatEach() (see Docs).
  .pipe(eslint.format())
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(concat(config.app.concatFile))
  .pipe(sourcemaps.write())
  .pipe(annotate())
  .pipe(gulp.dest(config.app.dest));
});
