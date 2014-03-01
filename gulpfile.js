'use strict';

// Generated on 2014-02-08 using generator-gulp-webapp 0.0.1

// Load plugins
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-ruby-sass');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var cache = require('gulp-cache');
var size = require('gulp-size');
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var jade = require('gulp-jade');
var usemin = require('gulp-usemin');


// Jade
// gulp.task('jade', function() {
//   var YOUR_LOCALS = {};

//   gulp.src('./app/views/*.jade')
//     .pipe(jade({
//       locals: YOUR_LOCALS
//     }))
//     .pipe(gulp.dest('./dist/'))
// });

// HTML
gulp.task('html', function () {
     return gulp.src('app/*.html')
        .pipe(livereload(server))
        .pipe(size())
        .pipe(gulp.dest('dist'));
});

// Styles
gulp.task('styles', function () {
    return gulp.src('app/styles/app.scss')
        .pipe(sass({
          style: 'expanded',
          loadPath: ['app/bower_components']
        }))
        .pipe(autoprefixer('last 1 version'))
        .pipe(csso())
        .pipe(livereload(server))
        .pipe(size())
        .pipe(gulp.dest('dist/styles'));
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        // .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/scripts'))
        //.pipe(uglify())
        .pipe(livereload(server))
        .pipe(gulp.dest('dist/scripts'));
});

// Templates
gulp.task('templates', function () {
    return gulp.src('app/scripts/views/**/*.html')
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        // .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/scripts/views'))
        .pipe(livereload(server))
        .pipe(gulp.dest('dist/scripts/views'));
});

// Images
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(livereload(server))
        .pipe(size())
        .pipe(gulp.dest('dist/images'));
});

// Copy
gulp.task('copy', function () {
    return gulp.src('app/bower_components/font-awesome/fonts/*')
        .pipe(gulp.dest('dist/fonts/'));
});
// Clean
gulp.task('clean', function () {
    return gulp.src(['dist/index.html', 'dist/styles', 'dist/scripts', 'dist/images'], {read: false}).pipe(clean());
});

// Build
gulp.task('build', ['html', 'styles', 'scripts', 'templates', 'images', 'copy']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Watch
gulp.task('watch', function () {
    // Listen on port 35729
    server.listen(35729, function (err) {
        if (err) {
            return console.error(err);
        };

        // Watch .jade files
        // gulp.watch('app/views/*.jade', ['jade']);

        // Watch .html files
        gulp.watch('app/*.html', ['html']);

        // Watch .scss files
        gulp.watch('app/styles/**/*.scss', ['styles']);

        // Watch .js files
        gulp.watch('app/scripts/**/*.js', ['scripts']);

        // Watch html template files
        gulp.watch('app/scripts/views/**/*.html', ['templates']);

        // Watch image files
        gulp.watch('app/images/**/*', ['images']);
    });
});
