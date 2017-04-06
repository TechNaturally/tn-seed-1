const gulp = require('gulp');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const gutil = require('gulp-util');

gulp.task('default', function() {
  gulp.watch(['lib/**', 'test/**'], ['mocha']);
});

gulp.task('babel', function() {
  return gulp.src(['lib/*.js'])
                  .pipe(babel({
                    presets: ['env']
                  }))
                  .pipe(gulp.dest('dist'))
                  .on('error', gutil.log);
});

gulp.task('mocha', ['babel'], function() {
  return gulp.src(['test/*.js'], { read: false })
                  .pipe(mocha({
                    reporter: 'list' 
                  }))
                  .on('error', gutil.log);
});