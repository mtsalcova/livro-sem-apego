
var gulp = require('gulp');


function setError (error) {
  console.log(error.toString())
  this.emit('end')
}


//
// Stylus
//

var stylus = require('gulp-stylus');
var autoprefixerStylus = require('autoprefixer-stylus');
var combineMq = require('gulp-combine-mq');

gulp.task('stylus', function() {
    return gulp.src("../src/stylus/main.styl")
        .pipe(stylus({
            use: [autoprefixerStylus()]
        }))
        .on('error', setError)
        .pipe(gulp.dest("../public/css"))
});

gulp.task('combineMq', ['stylus'], function () {
    return gulp.src('../public/css/main.css')
    .pipe(combineMq({
        beautify: true
    }))
    .on('error', setError)
    .pipe(gulp.dest('../public/css/'));
});


//
// Pug
//

var pug = require('gulp-pug');

gulp.task('pug', function() {
    return gulp.src('../src/pug/pages/*.pug')
        .pipe(pug())
        .on('error', setError)
        .pipe(gulp.dest('../public/'));
});



//
// SVG Sprite

var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');

gulp.task('svgstore', function () {
    return gulp
        .src('../public/img/svg/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('../public/img'));
});




//
// Task Default

gulp.task('default', function() {
    gulp.watch('../src/stylus/**/*.styl', ['combineMq']);
    gulp.watch('../src/pug/**/*.pug', ['pug']);
});


gulp.task('svg', ['svgstore']);




