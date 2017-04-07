var gulp = require('gulp');
var webserver = require('gulp-webserver');

var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

function build(watch){
  var bundler = watchify(browserify('./lib/foobar.js', { debug: true, standalone: 'FooBar' }).transform(babelify, {presets: ["es2015"], plugins: ['add-module-exports']}));

  function doBuild(){
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('foobar.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
  }

  if (watch) {
    bundler.on('update', function() {
      doBuild();
    });
  }
  doBuild();
}

gulp.task('build', function() {
  build();
});

gulp.task('dev', function() {
  build(true);
  gulp.src('.')
      .pipe(webserver({
        open: '/test',
        livereload: true
      }));
});

gulp.task('default', ['dev']);
