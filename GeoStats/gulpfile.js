var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
  gulp.src('view/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('minjs'));
});
