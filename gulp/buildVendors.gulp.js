var concat, config, filter, gulp, mainBowerFiles, plumber;

gulp = require('gulp');
mainBowerFiles = require('main-bower-files');
plumber = require('gulp-plumber');
filter = require('gulp-filter');
concat = require('gulp-concat');
config = require('./config.gulp.js');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var using = require('gulp-using')


gulp.task('build:vendors', function() {
  var mainFiles;
  mainFiles = mainBowerFiles({
    debugging: false
  });
  mainFiles.push("bower_components/moment/locale/fr.js");


  gulp.src(mainFiles)
  .pipe(plumber())
  .pipe(filter('**/*.js'))
  .pipe(concat(config.vendors.concatFileJs))
  .pipe(gulp.dest(config.vendors.dest));

  gulp.src(mainFiles)
  .pipe(plumber())
  .pipe(filter(['**/*.scss','**/*.css']))
  .pipe(using())
  .pipe(sourcemaps.init())
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(concat(config.vendors.concatFileCss))
  .pipe(gulp.dest(config.vendors.dest));

  return gulp.src(mainFiles)
  .pipe(filter(['**/*.woff', '**/*.woff2', '**/*.svg', '**/*.eot', '**/*.ttf', '**/*.otf']))
  .pipe(gulp.dest(config.vendors.destFonts));
});
