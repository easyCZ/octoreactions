var gulp = require('gulp');
var babel = require('babel');
var babel = require("gulp-babel");
var concat = require("gulp-concat");


gulp.task("js", function () {
  return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});