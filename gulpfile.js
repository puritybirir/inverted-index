var gulp = require('gulp');
    uglify=require('gulp-uglify')
    ;

//Scripts task
gulp.task('scripts', function(){
    gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('src/js'));
});

//Watch task
//Watches js
gulp.task('watch', function(){
    gulp.watch('src/js/**/*.js',['scripts'])
});

//Default task that runs all the scripts at the same time
gulp.task('default', ['scripts','watch']);
   