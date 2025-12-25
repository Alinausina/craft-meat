const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const fileInclude = require('gulp-file-include');
const del = require('del');

// Очистка папки dist
function clean() {
    return del(['dist/**', '!dist']);
}

// Компиляция SCSS в CSS
function styles() {
    return gulp.src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
}

// Обработка HTML
function html() {
    return gulp.src('src/*.html')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'));
}

// Копирование изображений
function images() {
    return gulp.src('src/assets/images/**/*')
        .pipe(gulp.dest('dist/assets/images'));
}

// Отслеживание изменений
function watch() {
    gulp.watch('src/scss/**/*.scss', styles);
    gulp.watch(['src/*.html', 'src/components/*.html'], html);
    gulp.watch('src/assets/images/**/*', images);
}

// Сборка
const build = gulp.series(clean, gulp.parallel(styles, html, images));

exports.clean = clean;
exports.styles = styles;
exports.html = html;
exports.images = images;
exports.watch = watch;
exports.build = build;
exports.default = build;