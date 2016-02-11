var concat, config, gulp, plumber, sass, autoprefixer, sourcemaps;

gulp = require('gulp');
plumber = require('gulp-plumber');
sourcemaps = require('gulp-sourcemaps');
sass = require('gulp-sass');
autoprefixer = require('gulp-autoprefixer');
concat = require('gulp-concat');
config = require('./config.gulp.js');

gulp.task('build:style', function() {
  return gulp.src(config.style.src)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({browsers: ['Android 4.1','iOS 7','last 2 Chrome versions']}))

  .pipe(sourcemaps.write())
  .pipe(concat(config.style.concatFile))
  .pipe(gulp.dest(config.style.dest));
});
