import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server';
import args from './util/args';

gulp.task('serve',(cb)=>{
  if(!args.watch) return cb();

  var server = liveserver.new(['--harmony','start']);
  server.start();

  gulp.watch(['server/controller/**/*.js','server/api/**/*.js','server/app.js','server/routes/**/*.js','server/crawler/**/*.js','server/middleware/**/*.js','app.js'],function(){
    server.start.bind(server)()
  });
})
