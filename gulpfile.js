const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

const scssPath = "assets/scss/**/*.scss";
const entryFile = "assets/scss/codeconfig-style.scss";
const outputPath = "assets/css/";

function compileGlobalCSS() {
  return gulp
    .src(entryFile)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(rename({ basename: "codeconfig-style", extname: ".css" }))
    .pipe(gulp.dest(outputPath));
}

function watchSCSS() {
  gulp.watch(scssPath, compileGlobalCSS);
}

exports.default = gulp.series(compileGlobalCSS, watchSCSS);
