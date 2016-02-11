'use strict';

var gulp = require('gulp');
gulp.task('build', ['build:index', 'build:app', 'build:style', 'build:templates', 'build:assets', 'build:vendors']);
