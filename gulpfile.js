var gulp        = require('gulp'),
    shell       = require('gulp-shell'),
    browserSync = require('browser-sync').create(),
    htmltidy    = require('gulp-htmltidy');

// Task for building blog when something changed:
gulp.task('build', shell.task(['jekyll build --watch']));

// Task for serving sub directory blog with Browsersync
gulp.task('serve', function () {
    browserSync.init({
      server: { baseDir: '_site/' }
    });
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

// Tidy HTML
gulp.task('htmlTidy', function() {
  return gulp.src('./_site/*.html')
  .pipe(htmltidy({
    indent: true
  }))
  .pipe(gulp.dest('./_site'));
});

// builds jekyll site & watch for changes
gulp.task('default', ['build', 'serve']);
gulp.task('tidy', ['htmlTidy']);
