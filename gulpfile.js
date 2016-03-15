var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");


var CONTENT_SCRIPTS = [
  'src/content/Storage.js',
  'src/content/Parser.js',
  'src/content/Constants.js',
  'src/content/Async.js',
  'src/content/Views.js',
  'src/content/Octoreactions.js',
  'src/content/index.js'
]
var BACKGROUND_SCRIPTS = ['src/background/background.js'];
var OPTIONS_SCRIPTS = ['src/options/options.js'];

var TEMPLATES = ['src/options/options.html'];
var CSS = ['src/content/octoreactions.css'];


gulp.task('js:content', function () {
  return gulp.src(CONTENT_SCRIPTS)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("octoreactions.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
})

gulp.task('js:background', function () {
  return gulp.src(BACKGROUND_SCRIPTS)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("background.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
})

gulp.task('js:options', function () {
  return gulp.src(OPTIONS_SCRIPTS)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("options.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
})

gulp.task('html:options', function () {
  return gulp.src(TEMPLATES)
    .pipe(gulp.dest('dist'))
})

gulp.task('css', function () {
  return gulp.src(CSS)
    .pipe(gulp.dest('dist'));
  })

gulp.task('js', ['js:content', 'js:background', 'js:options']);
gulp.task('html', ['html:options'])

gulp.task('watch', ['js', 'html', 'css'], function () {
  gulp.watch(CONTENT_SCRIPTS, ['js:contentscripts']);
  gulp.watch(BACKGROUND_SCRIPTS, ['js:background']);
  gulp.watch(OPTIONS_SCRIPTS, ['js:options']);
  gulp.watch(CSS, ['css']);
  gulp.watch(TEMPLATES, ['html']);
})

gulp.task('default', ['js', 'html', 'css'])