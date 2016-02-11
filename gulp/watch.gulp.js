var config, gulp;

gulp = require('gulp');
config = require('./config.gulp.js');

// gulp.task('watch', ['build'], function() {
//   return gulp.watch(config.srcPath + "/**", ['build']);
// });
gulp.task('watch', function() {
  gulp.watch(config.index.src, ['build:index']);
  gulp.watch(config.style.src, ['build:style']);
  gulp.watch(config.app.src, ['build:app']);
  gulp.watch(config.templates.src, ['build:templates']);
  gulp.watch(config.assets.src, ['build:assets']);
  gulp.watch(config.vendors.src, ['build:vendors']);
});
