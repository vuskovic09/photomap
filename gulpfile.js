// dependencies
var gulp = require('gulp');
var merge = require('merge-stream');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var gcmq = require('gulp-group-css-media-queries');

// config
config = {
    resources: './resources/',
    destination: './assets/'
}

// sass
gulp.task('scss', gulp.series(function () {
    return gulp.src(config.resources + 'sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gcmq())
        .pipe(cssnano())
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.destination + 'css'))
}));

// js
gulp.task('js', gulp.series(function () {
    return gulp.src([config.resources + 'js/vendor/*.js', config.resources + 'js/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.destination + 'js'));
}));

// images
gulp.task('images', gulp.series(function () {
    return gulp.src(config.resources + 'images/**/*')
        .pipe(gulp.dest(config.destination + 'images'))
}));

// fonts
gulp.task('fonts', gulp.series(function () {
    return gulp.src(config.resources + 'fonts/**/*')
        .pipe(gulp.dest(config.destination + 'fonts'))
}));

// default
gulp.task('default', gulp.series(['js', 'scss', 'images', 'fonts']));

// watch
gulp.task('watch', gulp.series(function () {
    gulp.watch('resources/sass/**/*.scss',  gulp.series(['scss'])),
    gulp.watch('resources/js/**/*.js',  gulp.series(['js'])),
    gulp.watch('resources/images/**/*',  gulp.series(['images'])),
    gulp.watch('resources/fonts/**/*',  gulp.series(['fonts']));
    return;
}));
