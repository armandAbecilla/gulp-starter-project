var gulp = require("gulp"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  cleanCSS = require("gulp-clean-css"),
  autoprefixer = require("gulp-autoprefixer"),
  plumber = require("gulp-plumber"),
  sourcemaps = require("gulp-sourcemaps"),
  sass = require("gulp-sass"),
  babel = require("gulp-babel"),
  del = require("del"),
  zip = require("gulp-zip"),
  browserSync = require("browser-sync").create();

// File Paths
var SCRIPTS_PATH = "public/scripts/**/*.js",
  CSS_PATH = "public/css/**/*.css",
  DIST_PATH = "public/dist";

// Styles task -- for normal css -- UNCOMMENT IF YOU WANT TO USE PLAIN CSS
// gulp.task('styles', function() {
//   console.log('starting styles task');
//   return gulp.src(['public/css/reset.css',CSS_PATH])
//     .pipe(plumber(function(err){
//       console.log('Styles Task Error');
//       console.log(err);
//       this.emit('end');
//     }))
//     .pipe(sourcemaps.init())
//     .pipe(autoprefixer({
//       browsers: ['last 2 versions', 'ie 8'],
//       cascade: false
//     }))
//     .pipe(concat('styles.css'))
//     .pipe(cleanCSS())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest(DIST_PATH))
//     .pipe(browserSync.stream());
// });

// Styles for SCSS -- COMMENT IF YOU WANT TO USE PLAIN CSS
gulp.task("styles", function() {
  console.log("starting styles task");
  return gulp
    .src("public/scss/styles.scss")
    .pipe(
      plumber(function(err) {
        console.log("Styles Task Error");
        console.log(err);
        this.emit("end");
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions", "ie 8"],
        cascade: false
      })
    )
    .pipe(
      sass({
        // outputStyle: 'compressed' UNCOMMENT IF YOU NEED TO MINIFY CSS
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(browserSync.stream());
});

// Scripts task
gulp.task("scripts", function() {
  console.log("starting scripts task");
  return gulp
    .src(SCRIPTS_PATH)
    .pipe(
      plumber(function(err) {
        console.log("Scripts Task Error");
        console.log(err);
        this.emit("end");
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(concat("bundle.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(browserSync.stream());
});

// Delete dist folder
gulp.task("clean", function() {
  return del.sync(DIST_PATH);
});

gulp.task("export", function() {
  return gulp
    .src("public/**/*")
    .pipe(zip("project.zip"))
    .pipe(gulp.dest("./"));
});

// Default task
gulp.task("default", ["styles", "scripts"], function() {
  console.log("Starting default task");
});

// Watch for file changes
// gulp.watch accepts arguments
// first is the Path / directory
// second is the task you want to run whenever a file changes

gulp.task("watch", ["default"], function() {
  console.log("Starting watch task");
  // Initialize browsersync
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });
  // gulp.watch(CSS_PATH, ['styles']); // UNCOMMENT IF YOU WANT TO USE PLAIN CSS
  gulp.watch("public/scss/**/*.scss", ["styles"]); // COMMENT IF YOU WANT TO USE PLAIN CSS
  gulp.watch(SCRIPTS_PATH, ["scripts"]);
});
