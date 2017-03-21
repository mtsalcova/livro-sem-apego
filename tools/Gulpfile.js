
var gulp = require('gulp');


//
// Stylus
//

var stylus = require('gulp-stylus');
var autoprefixerStylus = require('autoprefixer-stylus');
var minify = require('gulp-minify-css');

gulp.task('stylus', function() {
    return gulp.src("../src/stylus/main.styl")
        .pipe(stylus({
            use: [autoprefixerStylus()]
        }))
        .pipe(gulp.dest("../public/css"))
});

gulp.task('minify-css', function () {
    return gulp.src('../public/css/main.css')
        .pipe(minify({keepBreaks: true}))
        .pipe(gulp.dest('../public/css'));
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
// React
//
// var browserify = require('gulp-browserify');
// var react = require('gulp-react');


// gulp.task('jsx', function () {  
//     return gulp.src('../src/coffeescript/react/components/jsx/*.jsx')
//         .pipe(react())
//         .pipe(gulp.dest('../src/coffeescript/react/components/js'));
// });

// gulp.task('concat', function() {
//     return gulp.src('../public/main.js')
//         .pipe(babel({
//             only: [
//                 '../src/coffeescript/react/components/'
//             ],
//             compact: false
//         }))
//         .pipe(concat('main.js'))
//         .pipe(gulp.dest('../public/main.js'));
// });




//
// Task Default

gulp.task('default', function() {
    gulp.watch('../src/stylus/**/*.styl', ['stylus']);
    gulp.watch('../src/pug/**/*.pug', ['pug']);
});


//
// Task Build -> minify files.

gulp.task('build', ['minify-css']);