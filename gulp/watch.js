'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}




gulp.task('watch', ['inject'], function () {

  gulp.watch([path.join(conf.paths.src, '/*.hbs'), path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject']);

  gulp.watch([
    path.join(conf.paths.src, '/app/**/*.css'),
    path.join(conf.paths.src, '/app/**/*.less'),
    path.join(conf.paths.baseClientConfig,'/**/*.less'),
    path.join(conf.paths.useClientConfig,'/**/*.less')
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch([
      path.join(conf.paths.src, '/app/**/*.hbs'),
      path.join(conf.paths.src, '/app/**/*.js'),
    path.join(conf.paths.src, '/app/**/*.ts'),
      path.join(conf.paths.useClientConfig, '/**/*.ts')
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('scripts');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/app/**/*.html'), function(event) {
    browserSync.reload(event.path);
  });
});

gulp.task('watch:deploy', ['inject'], function () {
    // gulp.watch([path.join(conf.paths.src, '/*.hbs')], ['partials']);
    gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject']);

    gulp.watch([
        path.join(conf.paths.src, '/app/**/*.css'),
        path.join(conf.paths.src, '/app/**/*.less')
    ], function(event) {
        gulp.start('deploy:dev');
        /*if(isOnlyChange(event)) {
            gulp.start('styles');
        } else {
            gulp.start('inject');
        }*/
    });

    gulp.watch([
        path.join(conf.paths.src, '/app/**/*.js'),
        path.join(conf.paths.src, '/app/**/*.ts'),
        path.join(conf.paths.useClientConfig, '/**/*.ts')
    ], function(event) {
        gulp.start('deploy:dev');
        /*if(isOnlyChange(event)) {
            gulp.start('scripts');
        } else {
            gulp.start('inject');
        }*/
    });

    gulp.watch([path.join(conf.paths.src, '/app/**/*.html')], function(event) {
        browserSync.reload(event.path);
    });
});

