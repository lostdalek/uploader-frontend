'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var webpack = require("webpack");
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var tsProject = $.typescript.createProject({
    target: 'ES3',
    sortOutput: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    module: 'commonjs',
    typescript: require('typescript') // require('../../TypeScript/built/local/typescript')
});
gulp.task('hbs-tpl', function () {
    return gulp.src([path.join(conf.paths.src, '/app/**/*.hbs')])
        .pipe(gulp.dest(path.join(conf.paths.tmpts, '/serve/app')))
});
gulp.task('tsd-scripts', ['tsd:install'], function () {



  return gulp.src([path.join(conf.paths.src, '/app/**/*.ts'), path.join(conf.paths.useClientConfig, '/**/*.ts')])
    //.pipe($.sourcemaps.init())
    .pipe($.tslint())
    .pipe($.tslint.report('prose', { emitError: false }))
    .pipe($.typescript(tsProject)).on('error', conf.errorHandler('TypeScript'))

    //.pipe($.concat('app.module.js'))
    //.pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmpts, '/serve/app')))
    //.pipe(browserSync.reload({ stream: true }))
    //.pipe($.size())
});

gulp.task('scripts', ['hbs-tpl','tsd-scripts'], function () {
    var watch = false;
    var webpackOptions = {
        watch: watch,
        plugins: [
            /*new webpack.optimize.UglifyJsPlugin({
                mangle: false,
                compress: {
                    // unused: false, dead_code: false, warnings: true
                }
            })*/
        ],
        module: {
            loaders: [
                { test: /\.hbs/, loader: "handlebars-loader" },
                { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}]
        },
        output: { filename: 'index.module.js' }
    };

        webpackOptions.devtool = 'inline-source-map';
    if(watch) {
    }

    var webpackChangeHandler = function(err, stats) {
        if(err) {
            conf.errorHandler('Webpack')(err);
        }
        $.util.log(stats.toString({
            colors: $.util.colors.supportsColor,
            chunks: false,
            hash: false,
            version: false
        }));
        browserSync.reload();
        if(watch) {
            watch = false;
            callback();
        }
    };
    return gulp.src([path.join(conf.paths.tmpts, '/serve/app/app.js')])
        .pipe($.webpack(webpackOptions, null, webpackChangeHandler))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')))
});