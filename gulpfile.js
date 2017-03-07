var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');

gulp.task('test',function(){
	console.log('测试gulp');
})
   
gulp.task('move', function() {
    // content
    gulp.src('./app.js')
      .pipe(gulp.dest('./dist'));
});

//压缩
gulp.task('uglify', function() {
  gulp.src('./app.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
});

//js合并并压缩
gulp.task('script', function() {
    // content
    // 指定指定的文件:参数是匹配的规则
  // 参数也可以是数组，数组中的元素就是匹配的规则
    gulp.src(['./app.js','./index.js'])
    .pipe(concat('./merge.js'))// concat 的参数是合并之后的文件名字
      .pipe(uglify())// 压缩
      .pipe(gulp.dest('./dist'))// dest方法参数，指定输出文件的路径
});

//css合并并压缩
gulp.task('style', function() {
    // content
    // 指定指定的文件:参数是匹配的规则
  // 参数也可以是数组，数组中的元素就是匹配的规则
    gulp.src(['./app.css','./index.css'])
    .pipe(concat('./merge.css'))// concat 的参数是合并之后的文件名字
      .pipe(cssnano())// 压缩
      .pipe(gulp.dest('./dist'))// dest方法参数，指定输出文件的路径
});

//html进行压缩
gulp.task('html', function() {
    // content
    gulp.src('./index.html')
      .pipe(htmlmin({collapseWhitespace:true}))
      .pipe(gulp.dest('./dist'));
});


//监视文件变化，执行相应任务
gulp.task('defalut',['test','script','style','html'], function() {
    // content
    // 第一个参数：要监视的文件的规则
  	// 第二个参数：是要执行的任务
	gulp.watch(['index.js','app.js'], ['script']);
	gulp.watch(['index.css','app.css'], ['style']);
	gulp.watch(['index.html'], ['html']);
});

