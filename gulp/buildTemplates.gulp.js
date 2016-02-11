var angularTemplatecache, config, gulp, plumber, htmlify, htmlhint;

gulp = require('gulp');
plumber = require('gulp-plumber');
htmlify = require('gulp-angular-htmlify');
angularTemplatecache = require('gulp-angular-templatecache');
config = require('./config.gulp.js');
htmlhint = require("gulp-htmlhint");

gulp.task('build:templates', function() {
  return gulp.src(config.templates.src)
  .pipe(plumber())
  .pipe(htmlify({
            customPrefixes: ['ui-','ion']
        }))
  .pipe(htmlhint({'doctype-first': false}))
  .pipe(htmlhint.reporter("htmlhint-stylish"))
  .pipe(angularTemplatecache({
    filename: config.templates.concatFile,
    module: config.templates.moduleName,
    standalone: false
  }))
  .pipe(gulp.dest(config.templates.dest));
});
