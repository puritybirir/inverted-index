var gulp = require('gulp');
    uglify=require('gulp-uglify'),
    sass=require('sass')
    ;

//Scripts task
//Uglifies.
gulp.task('scripts', function(){
    gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
});

//Styles task
//Uglifies
gulp.task('styles', function(){
    gulp.src('src/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css/'))

});

//Watch task
//Watches js
gulp.task('watch', function(){
    gulp.watch('src/*.js',['scripts'])
});


gulp.task('default', ['scripts','styles','watch']);
   