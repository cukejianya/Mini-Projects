var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var bufferV = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');


gulp.task('default', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './view/js/main.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('./index.js'))
    .pipe(bufferV())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./view/js/'));
});
