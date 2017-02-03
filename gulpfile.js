const fs = require('fs');
const gulp = require('gulp');

const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');

const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');
const eslint = require('rollup-plugin-eslint');

const livereload = require('gulp-livereload');

const input = {
    'html': 'src/*.html',
    'css': 'src/css/**/*.css',
    'js': 'src/js/index.js'
};

const output = {
    'html': 'build',
    'css': 'build/css',
    'js': 'build/js/index.js'
};

gulp.task('html', function() {
    return gulp.src(input.html)
        .pipe(gulp.dest(output.html))
        .pipe(livereload());
});

gulp.task('css', function () {
    return gulp.src(input.css)
        .pipe(sourcemaps.init())
        .pipe(postcss([
            require('precss')({ /* options */ })
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(output.css))
        .pipe(livereload());
});

gulp.task('js', function () {
  return rollup({
    entry: input.js,
    plugins: [
        eslint(),
        babel({
            exclude: 'node_modules/**'
        })
    ]
  }).then(function (bundle) {
    const res = bundle.generate({
      format: 'iife',
      sourceMap: true,
      sourceMapFile: output.js
    });

    fs.mkdir('build', () => {});
    fs.mkdir('build/js', () => {});
    fs.writeFileSync(output.js, res.code +
        '\n//# sourceMappingURL=index.js.map');
    fs.writeFileSync(output.js + '.map', res.map.toString());

    gulp.src(input.js).pipe(livereload());
  })
});

gulp.task('default', ['html', 'css', 'js']);

gulp.task('watch', function() {
    livereload.listen();
    for (let t of ['html', 'css', 'js']) {
        gulp.watch(input[t], [t]);
    }
});
