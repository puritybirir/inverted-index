const gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  jasmine = require('gulp-jasmine');
const browsersync = require('browser-sync').create();

// Scripts task
gulp.task('scripts', () => {
  gulp.src('src/js/**/*.js')
    .pipe(livereload());
});

// Front task
gulp.task('Front', () => {
  browsersync.init({
    server: {
      baseDir: ['./', './src']
    },
    port: 2700,
    ui: {
      port: 2700,
    },
  });
  gulp.watch('./index.html').on('change', browsersync.reload);
  gulp.watch('./src/**/*.{css,js}').on('change', browsersync.reload);
});




//Tests task
gulp.task('test', () => {
  gulp.src('jasmine/spec/*.js')
    .pipe(jasmine());
});


// Watch task
// Watches js
gulp.task('watch', () => {
  const server = livereload();
  livereload.listen();
  gulp.watch('src/**/*.js', ['scripts']);
});

// Default task that runs all the scripts at the same time
gulp.task('default', ['scripts', 'watch', 'Front']);