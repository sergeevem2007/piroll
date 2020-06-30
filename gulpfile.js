const {src, dest, watch, series} = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const tinypng = require('gulp-tinypng-compress');

function bs() {
  serveSass();
  mincss();
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  watch("./*.html").on('change', browserSync.reload);
  watch("./sass/**/*.sass", serveSass);
  watch("./sass/**/*.scss", serveSass);
  watch("./css/style.css", mincss).on('change', browserSync.reload);
  watch("./js/*.js").on('change', browserSync.reload);
};
  
  function mincss() {
    return src(["./css/**.css", "!./css/**.min.css"])  
      .pipe(rename({suffix: ".min", extname: ".css"}))
      .pipe(cleanCSS())  
      .pipe(dest("./css"))
      .pipe(dest("dist/css/"))
      .pipe(browserSync.stream());  
  };

  function minjs(done) {
    src(['js/**.js' , '!js/**.min.js'])
      .pipe(minify({
        ext:{
          min: '.min.js'
        },
        ignoreFiles: ['-min.js']
    }))
      .pipe(dest('js/'));
    src('js/**.min.js').pipe(dest('dist/js/'));
    done();
  };

  function minhtml(done) {
    src('./**.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'));
    done();
  };
  
  function php(done) {
    src('./**.php')
    .pipe(dest('dist'));
    src('phpmailer/**/**')
    .pipe(dest('dist/phpmailer'));
    done();
  };

  function fonts(done) {
    src('fonts/**/**')
    .pipe(dest('dist/fonts'));
    done();
  };

  function minimg(done) {
    src('img/**/*.{png,jpg,jpeg}')
    .pipe(tinypng({ key: 'RbnMBHmGnpxWMF36fCJ3Db2j6Q68KS0V'}))
    .pipe(dest('dist/img/'));
    src('img/**/*.svg')
    .pipe(dest('dist/img/'));
    done();
  };

  function serveSass() {
    return src("./sass/**/*.sass","./sass/**/*.scss")
      .pipe(sass())
      .pipe(autoprefixer({
        cascade: true
      }))
      .pipe(dest("./css"))
      .pipe(browserSync.stream());  
  };

exports.serve = bs;
exports.build = series(minjs, mincss, minhtml, php, fonts, minimg);