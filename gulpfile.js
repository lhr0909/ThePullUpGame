var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var connect = require('gulp-connect');

var isDebug = false;

/**
 * this task turns on/off debug (ghetto version lol)
 */
gulp.task('turn-on-debug', function() {
    isDebug = true;
});

/**
 * Copy tasks, copies sources into build/dist folder
 */
gulp.task('copy-js-src', function() {
    return gulp.src('./src/js/**/*.js')
            .pipe(gulp.dest('./build'));
});

gulp.task('copy-html-src', function() {
    return gulp.src('./src/**/*.html')
            .pipe(gulp.dest('./dist'));
});

gulp.task('build-sass', function() {
    var build = gulp.src('./src/css/*.scss')
            .pipe(sass());
    if (!isDebug) {
        build = build.pipe(minifyCSS());
    }
    return build.pipe(gulp.dest('./dist/css/'));
});

/**
 * js build task, jshints + browserifies + uglifies it and stuff
 */
gulp.task('build-js', ['copy-js-src'], function() {
    var build = gulp.src('./build/app.js')
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(browserify({
                insertGlobals : true,
                debug : isDebug
            }));
    if (!isDebug) {
        build = build.pipe(uglify());
    }
    return build.pipe(gulp.dest('./dist/js'));
});

/**
 * serve task, uses gulp-connect to serve the dist folder
 */
gulp.task('serve', ['debug'], function() {
    connect.server({
        root: 'dist',
        livereload: false,
        port: 5000
    });
});

/**
 * final build tasks (call these for doing work)
 */
gulp.task('default', ['copy-html-src', 'build-js', 'build-sass'], function() {});

gulp.task('debug', ['turn-on-debug', 'default'], function() {});

gulp.task('watch', function() {
    var watcher = gulp.watch('./src/js/*.js', ['debug']);
    watcher.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
