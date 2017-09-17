var gulp         = require('gulp');
var sass         = require('gulp-sass');
var concat       = require('gulp-concat');
var cleanCSS     = require('gulp-clean-css');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');

gulp.task('sass', function () {
	return gulp.src('assets/styles/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('assets/styles'));
});

gulp.task('scripts', function(){
	// return gulp.src(['assets/scripts/*.js', '!assets/scripts/*.min.js'])
	//     .pipe(uglify())
	//     .pipe(rename({suffix: '.min'}))
	// 	.pipe(gulp.dest('assets/scripts'));
});

gulp.task('watch', function(){
    gulp.watch('assets/styles/*.scss', ['sass']);
	gulp.watch('assets/scripts/*.js', ['scripts']);
});

gulp.task('build', ['sass', 'scripts', 'watch']);