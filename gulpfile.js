// const gulp = require('gulp');
const { task, src, dest, series, parallel, watch } = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');

// /*
// gulp.series()
// gulp.src()
// gulp.dest()
// gulp.pipe()
// */

// gulp.task('default', function a(done) {
//   done();
//   return console.log('this is a gulp message');
// });

function a(done) {
  done();
  return console.log('this is a gulp message A');
}
function b(done) {
  done();
  return console.log('this is a gulp message B');
}

task('series', series(a, b));

// function copyHtml(done) {
//   done();
//   gulp.src('./src/*.html').pipe(gulp.dest('./dist/'));
// }

copyHtml = done => {
  done();
  src('./src/*.html').pipe(dest('./dist/'));
};

function minifyImage(done) {
  done();
  src('src/images/*')
    .pipe(imagemin())
    .pipe(dest('./dist/images'));
}

function optimizeJS(done) {
  done();
  src('src/js/*.js')
    .pipe(uglify())
    .pipe(dest('dist/js'));
}

function optimizeSass(done) {
  done();
  src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function combineJS(done) {
  src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(dest('dist/js'));
  done();
}

function combineCss(done) {
  src('dist/css/*.css')
    .pipe(concat('all.css'))
    .pipe(dest('dist/css'));
  done();
}

function watch_files(done) {
  // browserSync.init({
  //   server: {
  //     baseDir: './'
  //   }
  // });
  watch('./src/*.html', copyHtml);
  watch('./dist/index.html');
  // .on('change', browserSync.reload);
  // watch(minifyImage);
  watch('./src/js/*.js', optimizeJS);
  watch('./src/sass/*.scss', optimizeSass);
  watch('./src/js/*.js', combineJS);
  // watch(combineCss);
  done();
}

task('copyHtml', series(copyHtml));

task('minify', series(minifyImage));

task('uglify', series(optimizeJS));

task('sass', series(optimizeSass));

task('concat', series(combineJS));

task('concatCss', series(combineCss));

task('watch', series(watch_files));

task(
  'default',
  parallel(
    copyHtml,
    minifyImage,
    optimizeJS,
    optimizeSass,
    combineJS,
    combineCss
  )
);
