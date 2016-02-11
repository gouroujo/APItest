var gulp = require('gulp');
var gls = require('gulp-live-server');
var config = require('./config.gulp.js');

gulp.task('serve',['build','watch'], function() {
    var server = gls('index.js', {env: {NODE_ENV: 'development'}});
    try {
      server.start().then(function(result) {
          console.log('Server exited with result:', result);
          process.exit(result.code);
      });
    } catch (e) {
      console.log(e);
      console.log("big error");
    }

    // gulp.watch(config.index.src, ['build:index'], server.notify);

    gulp.watch([config.app.dest+"/*.*",config.style.dest+"/*.*",config.templates.dest+"/*.*",config.vendors.dest+"/*.*"], function (file) {
      server.notify.apply(server, [file]);
    });
    gulp.watch('server.js', server.start);
});
