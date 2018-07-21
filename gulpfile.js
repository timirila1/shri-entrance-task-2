const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

const postcssPlugins = [
    autoprefixer({browsers: ['last 1 version']})
];

gulp.task('html', () => {
    return gulp.src('./src/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./build'))
});

gulp.task('sass', () => {
    return gulp.src('./src/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(postcssPlugins))
        .pipe(gulp.dest('./build'))
        .pipe(reload({ stream: true }));
});

gulp.task('pug-watch', ['html'], () => {
    return reload();
});

gulp.task('default', ['sass', 'html'], () => {
    browserSync({ server: './build' });

    gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.pug', ['pug-watch']);
});