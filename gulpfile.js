const gulp = require('gulp');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');
const jasmine = require('gulp-jasmine');

//Scripts task
gulp.task('scripts', function() {
    gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('src'))
        .pipe(gulp.dest('build/js'))
        .pipe(livereload());
});

//Tests task
gulp.task('test', () => {
    gulp.src('jasmine/spec/*.js')
        .pipe(jasmine());
});


//Watch task
//Watches js
gulp.task('watch', function() {

    var server = livereload();
    livereload.listen();
    gulp.watch('src/**/*.js', ['scripts'])
});

//Default task that runs all the scripts at the same time
gulp.task('default', ['scripts', 'watch']);