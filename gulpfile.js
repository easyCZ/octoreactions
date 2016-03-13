var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");


var CONTENT_SCRIPTS = ['src/**/*.js', '!src/background.js']
var BACKGROUND_SCRIPTS = ['src/background.js'];


gulp.task('js:contentscripts', function () {
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

gulp.task('js', ['js:contentscripts', 'js:background']);


gulp.task('watch', ['js'], function () {
  gulp.watch(CONTENT_SCRIPTS, ['js:contentscripts']);
})

gulp.task('default', ['js'])