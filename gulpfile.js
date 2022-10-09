const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    svgSprite = require('gulp-svg-sprite'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify');

// функция обновления страницы при изменениях в файлах билда
function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'build'
        }
    })
}

// функция для html
function html() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'))
        .on('end', browserSync.reload)
}

// функция преобразования scss в css
function css() {
    return gulp.src('src/assets/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            grid: 'autoplace',
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/assets/css'))
        .pipe(browserSync.stream())
}

// функция js
function js() {
    return gulp.src('src/assets/js/app.js')
        .pipe(minify())
        .pipe(gulp.dest('build/assets/js'))
        .pipe(browserSync.stream())
}

// функция js модулей
// function vendorJS() {
//     return gulp.src([
//         'src/assets/js/vendors/nouislider.min.js',
//     ])
//         .pipe(concat('vendors.min.js'))
//         .pipe(gulp.dest('build/assets/js'))
//         .pipe(browserSync.stream())
// }

// функция копирования изображений
function images() {
    return gulp.src('src/assets/imgs/**/*')
        .pipe(gulp.dest('build/assets/imgs'))
        .pipe(browserSync.stream())
}

// функция копирования шрифтов
function fonts() {
    return gulp.src('src/assets/fonts/*')
        .pipe(gulp.dest('build/assets/fonts'))
        .pipe(browserSync.stream())
}

// svg спрайт
function sprite() {
    return gulp.src('src/assets/icons/*.svg')
        .pipe(svgSprite({
                mode: {
                    stack: {
                        sprite: "../sprite.svg"
                    }
                },
            }
        ))
        .pipe(gulp.dest('build/assets/imgs/'));
}

// функция отслеживания изменения в файлах исходников
function watcher() {
    gulp.watch('src/*.html', html)
    gulp.watch('src/assets/scss/**/*.scss', css)
    gulp.watch('src/assets/js/*.js', js)
    gulp.watch('src/assets/imgs/**/*', images)
    gulp.watch('src/assets/icons/*', sprite)
    gulp.watch('src/assets/fonts/*', fonts)
}

//команда запуска по умолчанию (gulp)
gulp.task(
    'default',
    gulp.series(
        gulp.parallel(html, css, js, images, fonts, sprite),
        gulp.parallel(watcher, browsersync)
    )
);