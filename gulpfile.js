'use strict';

// gulp core
var gulp = require('gulp');
var gutil = require('gulp-util');
var webserver = require('gulp-webserver');
var sourcemaps = require('gulp-sourcemaps');

// browserify/watchify/babelify stack
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

// sass compiler
var sass = require('gulp-sass');

// Package Definition
const PKG = {
  name: 'FooBar',
  main: 'foobar.js',
  path: {
    src: {
      main: './lib/foobar.js',
      sass: './lib/*.scss'
    },
    dest: {
      build: './build'
    },
    test: '/test'
  }
};

/** Browserify setup **/
// generate a browserify bundler
var bify = function() {
  return browserify(PKG.path.src.main, { debug: true, standalone: PKG.name })
          .transform(babelify, {presets: ["es2015"], plugins: ['add-module-exports']});
};

// runs a browserify/watchify bundler
var bundle = function(pkg){
  return pkg.bundle()
          .on('error', function(err) { console.error(err); this.emit('end'); })
          .pipe(source(PKG.main))
          .pipe(buffer())
          .pipe(sourcemaps.init({ loadMaps: true }))
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest(PKG.path.dest.build));

};


/** MAIN TASKS **/
// default is to start up the development environment
gulp.task('default', ['dev']);

// dev environment watches with a livereload on localhost:8000
gulp.task('dev', ['watch'], function() {
  gulp.src('.')
      .pipe(webserver({
        open: PKG.path.test,
        livereload: true
      }));
});


/** BUILD TASKS **/
gulp.task('build', ['build:js', 'build:sass']);

// builds javascript using browserify
gulp.task('build:js', function() {
  //watchifyBuild();
  bundle.bind(null, bify());
});

// builds sass
gulp.task('build:sass', function() {
  return gulp.src(PKG.path.src.sass)
          .pipe(sourcemaps.init({ loadMaps: true }))
          .pipe(sass().on('error', sass.logError))
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest(PKG.path.dest.build));
});


/** WATCH TASKS **/
gulp.task('watch', ['watch:js', 'watch:sass']);

// watches the browserify bundle (using watchify)
gulp.task('watch:js', function(){
  // generate a watchify bundler
  var wify = watchify(bify());
  wify.on('log', gutil.log);
  wify.on('update', bundle.bind(null, wify));
  bundle(wify);
});

// watches the sass
gulp.task('watch:sass', function(){
  // watch scss files
  gulp.watch(PKG.path.src.sass, ['build:sass']);
});
