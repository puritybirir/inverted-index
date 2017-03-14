const gulp = require('gulp');
const livereload = require('gulp-livereload');
const jasmine = require('gulp-jasmine');
const browsersync = require('browser-sync').create();

gulp.task('scripts', () => {
  gulp.src('src/js/**/*.js')
    .pipe(livereload());
});

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

gulp.task('test', () => {
  gulp.src('jasmine/spec/*.js')
    .pipe(jasmine());
});

gulp.task('watch', () => {
  livereload();
  livereload.listen();
  gulp.watch('src/**/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'watch', 'Front']);
