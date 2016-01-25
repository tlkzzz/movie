module.exports = function(grunt){
    //配置
   grunt.initConfig({
            // pkg: grunt.file.readJSON('package.json'),
      watch : {
         jade : {
            files : ['view/**'],
            options : {
            livereload : true
            }
            },
          js : {
            files : ['punlic/js/**', 'models/**/*.js'],
            //task : ['jshint'],
            options : {
            livereload : true
            }
            }
            },

     nodemon : {
        dev : {
            options : {
            files : "app.js",
            // script:'app.js',
            args : [],
            ignoredFiles : ['README.md', 'node_modules/**', '.DS_Store'],
            watchedExtensions : ['js'],
            watchedFolders : ['app', 'config'],
            debug : true,
            delayTime : 1,
            env : {
            PORT : 3000
            },
            cwd : __dirname
            }
            }
            },
     concurrent : {
            task : ['nodemon', 'watch'],
            options : {
            logConcurrentOutput : true
            }
            }
            })


    //只要文件修改就会重新执行任务
    grunt.loadNpmTasks('grunt-contrib-watch')
    //时时监听app.js
    grunt.loadNpmTasks('grunt-contrib-nodemon')
    //执行慢任务执行以上两个任务
    grunt.loadNpmTasks('grunt-concurrent')

    //不因为语法警告或错误而阻止服务重新启动
    grunt.option('force', true)
    //执行任务
    grunt.registerTask('default', ['concurrent'])
}