var gulp = require("gulp");
var postCSS                = require("gulp-postcss");
var importPostCSS          = require("postcss-import");
var mixinsPostCSS     = require("postcss-mixins");
var nestedPostCSS     = require("postcss-nested");
var simpleVarsPostCSS = require("postcss-simple-vars");
var autoprefixer      = require("autoprefixer");
var babel             = require("gulp-babel");
var concat            = require("gulp-concat");
var uglify            = require("uglify-js");
var composer          = require("gulp-uglify/composer");
var minify            = composer(uglify, console);
var pump              = require("pump");
var del               = require("del");
var runSequence       = require("run-sequence");
var browserSync       = require("browser-sync").create();

gulp.task('clean', function(){
    return del([ 
        './build/*.*' 
    ]);
});

gulp.task('css', function(){
    return gulp.src('./src/styles/main.css')
        .pipe(postCSS([
            importPostCSS(),
            simpleVarsPostCSS(),
            nestedPostCSS(),
            mixinsPostCSS(),
            autoprefixer()
        ]))
        .pipe(gulp.dest('./build'));
});

gulp.task('html', function(){
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('js', function(){
    return gulp.src([ 
            './src/scripts/**/*.js', 
            './src/scripts/*.js' 
        ]).pipe(babel({
            presets: ["env"],
            plugins: ["transform-remove-strict-mode"]
        }))
        .pipe(concat('min.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('js-min', function(cb){
    var options = {
        mangle: {
            toplevel: true
        },
        ie8: true
    };
    return pump([
        gulp.src("./build/min.js"),
        minify(options),
        gulp.dest("./build")
    ]);
});

//development
gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: "./",
            directory: true
        }
    });

    gulp.watch([ "./src/styles/*.*", "./src/styles/**/*.*"], ['css']);
    gulp.watch([ "./src/scripts/*.*", './src/scripts/**/*.js'], ['js']);
    gulp.watch("./src/index.html", ['html']);

    gulp.watch("./build/*.css").on("change", browserSync.reload);
    gulp.watch("./build/*.html").on("change", browserSync.reload);
    gulp.watch("./build/*.js").on("change", browserSync.reload);
});

gulp.task("default", function(cb){
    return runSequence("clean", 
                       ["html","css", "js"], 
                       "js-min", cb);
});