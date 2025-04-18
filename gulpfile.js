const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

// Paths
const globalPath = "assets/scss/codeconfig-style.scss"; // Path to global SCSS file
const outputPath = "assets/css/"; // Output folder for CSS files

// Compile global styles into global.css
function compileGlobalCSS() {
  return gulp
    .src(globalPath)
    .pipe(sass().on("error", sass.logError)) // Compile SCSS to CSS
    .pipe(postcss([autoprefixer()])) // Add vendor prefixes
    .pipe(cleanCSS()) // Minify the CSS
    .pipe(rename({ basename: "codeconfig-style", extname: ".css" })) // Output as global.css
    .pipe(gulp.dest(outputPath)); // Save to assets folder
}

// Watch for changes and recompile
function watchSCSS() {
  gulp.watch(globalPath, compileGlobalCSS);
}

// Default task to run
exports.default = gulp.series(compileGlobalCSS, watchSCSS);
