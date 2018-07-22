const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const concat = require('gulp-concat');

const postcssPlugins = [
    autoprefixer({
        browsers: ['last 1 version']
    })
];

gulp.task('html', () => {
    gulp.src('./src/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./build'))
});

gulp.task('sass', () => {
    gulp.src([
            './src/**/*.scss',
            './src/normalize.css'
        ])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(postcssPlugins))
        .pipe(concat('index.css'))
        .pipe(gulp.dest('./build'))
        .pipe(reload({
            stream: true
        }))
});

gulp.task('pug-watch', ['html'], () => {
    reload()
});

gulp.task("images", () => {
    gulp.src('./src/images/*.png')
        .pipe(gulp.dest('build/images'))
});

gulp.task('default', ['sass', 'html', 'images'], () => {
    browserSync({
        server: './build'
    });

    gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.pug', ['pug-watch']);
});