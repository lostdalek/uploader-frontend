'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('html', ['inject'], function () {

  var htmlFilter = $.filter('*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe(assets = $.useref.assets())
    //.pipe($.rev())
    .pipe(jsFilter)
      .pipe($.uglify({ preserveComments: $.uglifySaveLicense, drop_console: true })).on('error', conf.errorHandler('Uglify'))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.replace('../../bower_components/bootstrap/fonts/', '../fonts/'))
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    //.pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});
gulp.task('html:dev', ['inject'], function () {

    var htmlFilter = $.filter('*.html');
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets;

    return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
        .pipe(assets = $.useref.assets())
        .pipe(jsFilter)
        //.pipe($.ngAnnotate())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.replace('../../bower_components/bootstrap/fonts/', '../fonts/'))
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(htmlFilter)
        .pipe(htmlFilter.restore())
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
        .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('other', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,less,ts}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('copyUploaderRuntimes', function () {
    var copyPaths = [];

    copyPaths.push(path.join('../../bower_components/plupload/', '/js', '/Moxie.swf'));
    copyPaths.push(path.join('../../bower_components/plupload/', '/js', '/Moxie.xap'));

    return gulp.src(copyPaths)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/assets/')));
});


gulp.task('copyTheme', function () {
    var copyPaths = [];

    copyPaths.push(path.join(conf.paths.baseClientConfig, '/assets', '/**/*'));
    if( conf.paths.baseClientConfig !== conf.paths.useClientConfig ) {
        copyPaths.push(path.join(conf.paths.useClientConfig, '/assets', '/**/*'));
    }

    return gulp.src(copyPaths)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/assets/')));
});



gulp.task('clean', ['tsd:purge'], function (done) {
  $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')], done);
});

gulp.task('build', ['html', 'fonts', 'other', 'copyUploaderRuntimes', 'copyTheme']);
gulp.task('build:dev', ['html:dev', 'fonts', 'other', 'copyUploaderRuntimes', 'copyTheme']);
