
var gulp = require('gulp');


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
        .pipe(gulp.dest("../public/css"))
});

gulp.task('combineMq', ['stylus'], function () {
    return gulp.src('../public/css/main.css')
    .pipe(combineMq({
        beautify: true
    }))
    .pipe(gulp.dest('../public/css/'));
});


//
// Pug
//

var pug = require('gulp-pug');

gulp.task('pug', function() {
    return gulp.src('../src/pug/pages/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('../public/'));
});



//
// Task Default

gulp.task('default', function() {
    gulp.watch('../src/stylus/**/*.styl', ['combineMq']);
    gulp.watch('../src/pug/**/*.pug', ['pug']);
});


