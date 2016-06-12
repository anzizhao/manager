module.exports  = function(grunt) {
    var nowTime = new Date(); 
    var mainPageCommitMessage = "autoCommit" + nowTime.getTime(); 
    var commonCommitMess = "autoCommit" + nowTime.getTime(); 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    'modules/nprogress/nprogress.min.js':'modules/nprogress/nprogress.js',
                }
            }
        },
        cssmin: {  
            compress: {  
                files: {  
                    'modules/nprogress/nprogress.min.css': [  
                        "modules/nprogress/nprogress.css",  
                    ]  
                }  
            }  
        },  
        clean: {
            options:{
                force: true,
            },
            ghPages: ["../FarmPrivateKitchen_gh-pages/*" ] 
            
        },



        copy_mate: {
            mainPage: {
                options: {
                    type: "recursive"
                },
                src: "dist",
                destDir: "../anzizhao.github.io/dist" 
            },

            backendDist: {
                options: {
                    type: "recursive"
                },
                src: "dist",
                destDir: "../anzizhaoBackend/public/dist" 
            },

            backendImg: {
                options: {
                    type: "recursive"
                },
                src: "img",
                destDir: "../anzizhaoBackend/public/img" 
            },

            backendModules: {
                options: {
                    type: "recursive"
                },
                src: "modules",
                destDir: "../anzizhaoBackend/public/modules" 
            },

            backendStyles: {
                options: {
                    type: "recursive"
                },
                src: "styles",
                destDir: "../anzizhaoBackend/public/styles" 
            },

            backendSingle: {
                options: {
                    type: "batch"
                },
                src:['index.html', 'favicon.ico'] ,
                destDir: "../anzizhaoBackend/public" 
            },
        },

        gitadd: {
            bin:{
                options: {
                    all: true,
                    cwd: "../../bin" 
                }
            },
            misc:{
                options: {
                    all: true,
                    cwd: "../misc" 
                }
            },
            myprofile:{
                options: {
                    all: true,
                    cwd: "../myprofile" 
                }
            },
            anzizhaoBackend:{
                options: {
                    all: true,
                    cwd: "../anzizhaoBackend" 
                }
            },
            myprofile:{
                options: {
                    all: true,
                    cwd: "../myprofile" 
                }
            },
            manager:{
                options: {
                    all: true,
                    cwd: "." 
                }
            },
        },
        gitcommit: {
            bin: {
                options: {
                    cwd: "../../bin",
                    message: "关机自动提交" 
                },
            },
            misc: {
                options: {
                    cwd: "../misc",
                    message: "关机自动提交" 
                },
            },
            anzizhaoBackend: {
                options: {
                    cwd: "../anzizhaoBackend",
                    message: "关机自动提交" 
                },
            },
            manager: {
                options: {
                    cwd: ".",
                    message: "关机自动提交" 
                },
            },
            myprofile: {
                options: {
                    cwd: "../myprofile",
                    message: "关机自动提交" 
                },
            },
        },

        gitcheckout:{
            current:{
                options:{
                   create: true, 
                   branch: '<%= gitcheckout.current.branch %>',
                    cwd: "~/Workspace/myprofile" 
                },
            } 
        },
        gitpush:{
           bin: {
                options: {
                    remote: "origin",
                    branch: "master",
                    cwd: "../../bin" 
                }
            },
            misc: {
                options: {
                    remote: "origin",
                    branch: "master",
                    cwd: "../misc" 
                }
            },
            anzizhaoBackend: {
                options: {
                    remote: "origin",
                    branch: "master",
                    cwd: "../anzizhaoBackend" 
                }
            },
            myprofile: {
                options: {
                    remote: "osc",
                    branch: "static_i",
                    cwd: "../myprofile" 
                }
            },
            manager: {
                options: {
                    remote: "origin",
                    branch: "master",
                    cwd: "." 
                }
            },
        },
        gitfetch: {
            myprofile: {
                options: {
                    repository: 'osc',
                    cwd: "../myprofile" 
                }
            },
            manager: {
                options: {
                    repository: 'origin',
                    cwd: "../../bin" 
                }
            },
            backend: {
                options: {
                    repository: 'origin',
                    cwd: "../anzizhaoBackend" 
                }
            },
        },
        gitmerge: {
            manager: {
                options: {
                    branch: 'origin/master',
                    cwd: "../../bin" 
                }
            },
            myprofile: {
                options: {
                    branch: 'osc/static_i',
                    cwd: "../myprofile" 
                }
            },
            backend: {
                options: {
                    branch: 'origin/master',
                    cwd: "../anzizhaoBackend" 
                }
            },
        },
        gitpull: {
            myprofile: {
                options: {
                    remote: "osc",
                    branch: "static_i",
                    cwd: "../anzizhao.github.io" 
                }
            },
        },
        gitarchive: {
            master: {
                options: {
                    format: 'tar.gz',
                    prefix: 'your-project-name/',
                    treeIsh: 'master',
                    output: '/tmp/your-project-name.tar.gz',
                    path: ['README', 'LICENSE']
                }
            }
        },
        run: {
            npmBuild: {
                 exec: 'npm run build',
            },
            tag: {
                 exec: 'git archive static_i | tar -x -C ../anzizhao.github.io',
            }
        }
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //这版本copy 不强大
    //grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-copy-mate');
    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //更新另一个目录的gh-pages分支
    grunt.registerTask('gh-cm', ['build', 'clean:ghPages', 'copy_mate:ghPages', 'gitadd:ghPages', 'gitcommit:ghPages']);
    grunt.registerTask('gh-push', ['gh-cm', 'gitpush:ghPages']);
    grunt.registerTask('pull', ['gitpull']);

    // 公司开启why not 开发环境
    grunt.registerTask('startWhynot', "grunt startWhynot  --start=   --list",
                        function(){
                            var start = grunt.option("start") || 1;
                            var list = grunt.option("list");
                            var cmds = [   
                                // 更新前后端项目代码
                                'gitfetch:myprofile',
                                'gitmerge:myprofile',
                                'gitfetch:backend',
                                'gitmerge:backend',
                                //在不同的窗口开启的 
                            ];
                            if ( list ) {
                                cmds.forEach(function(item, index ){
                                    console.log( (index+1) +'. ' + item ) 
                                })
                                return 
                            }
                            var runCmds = cmds.filter(function(item, index){
                                return  (index+1) >= start  
                            })
                            grunt.task.run( runCmds )
                        }
                      );

    // 公司关机执行程序 开发环境
    grunt.registerTask('shutdown', "grunt shutdown --start=   --list",
                        function(){
                            var start = grunt.option("start") || 1;
                            var list = grunt.option("list");
                            var cmds = [   
                                // 更新前后端项目代码
                                'gitadd:misc',
                                'gitcommit:misc',
                                'gitpush:misc',

                                'gitadd:manager',
                                'gitcommit:manager',
                                'gitpush:manager',

                                'gitadd:myprofile',
                                'gitcommit:myprofile',
                                'gitpush:myprofile',

                                'gitadd:anzizhaoBackend',
                                'gitcommit:anzizhaoBackend',
                                'gitpush:anzizhaoBackend',

                                'gitadd:bin',
                                'gitcommit:bin',
                                'gitpush:bin',
                                //在不同的窗口开启的 
                            ];
                            if ( list ) {
                                cmds.forEach(function(item, index ){
                                    console.log( (index+1) +'. ' + item ) 
                                })
                                return 
                            }
                            var runCmds = cmds.filter(function(item, index){
                                return  (index+1) >= start  
                            })
                            grunt.task.run( runCmds )
                        }
                      );


    //从现在基础上分支, 不知道这个是否同步的,后面在确定
    grunt.registerTask("newbranch", "grunt newbranch --branch=  --message= 基于现在分支建立新分支b, 分支提交使用m信息",
                        function () {
                             var branchName = grunt.option("branch"); 
                             var message = grunt.option("message");
                             grunt.config.set('gitcommit.master.message', message);
                             grunt.config.set('gitcheckout.current.branch', branchName);
                             grunt.task.run(['gitadd:master','gitcommit:master','gitcheckout:current']);
                        }
                      );


    // 清理  编译 打包 推git
    grunt.registerTask('tag', "grunt tag --message=  --start=   --list",
                        function(){
                             var message = grunt.option("message");
                             var start = grunt.option("start") || 1;
                             var list = grunt.option("list");
                             var cmds = [   'gitpull:mainPage',
                                            'run:npmBuild',
                                            'gitadd:profile',
                                            'gitcommit:profile',
                                            'run:tag',
                                            'copy_mate:mainPage',   // 拷贝dist目录
                                            'gitadd:mainPage',
                                            'gitcommit:mainPage',
                                            'gitpush:mainPage'];
                             if ( message ) {
                                 grunt.config.set('gitcommit.mainPage.message', message);
                             }

                             if ( list ) {
                                 cmds.forEach(function(item, index ){
                                     console.log( (index+1) +'. ' + item ) 
                                 })
                                 return 
                             }

                             var runCmds = cmds.filter(function(item, index){
                                    return  (index+1) >= start  
                             })

                             grunt.task.run( runCmds )
                             //runCmds.forEach(function(item, index ){
                                 //console.log( (index+1) +'. ' + item ) 
                             //})
                        
                             //grunt.task.run([
                                            //'gitpull:mainPage',
                                            //'run:npmBuild',
                                            //'gitadd:profile',
                                            //'gitcommit:profile',
                                            //'run:tag',
                                            //'gitadd:mainPage',
                                            //'gitcommit:mainPage',
                                            //'gitpush:mainPage']);
                        }
                      );

    // 打包到后台程序目录
    // 清理编译 复制到后台项目的对应目录 
    grunt.registerTask('backend', "grunt backend  --start=   --list",
                        function(){
                             var message = grunt.option("message");
                             var start = grunt.option("start") || 1;
                             var list = grunt.option("list");
                             var cmds = [   
                                            'run:npmBuild',
                                            'copy_mate:backendDist',   // 拷贝dist目录
                                            'copy_mate:backendModules',   // 拷贝dist目录
                                            'copy_mate:backendStyles',   // 拷贝dist目录
                                            'copy_mate:backendSingle',   // 拷贝dist目录
                                 ];
                             if ( list ) {
                                 cmds.forEach(function(item, index ){
                                     console.log( (index+1) +'. ' + item ) 
                                 })
                                 return 
                             }

                             var runCmds = cmds.filter(function(item, index){
                                    return  (index+1) >= start  
                             })

                             grunt.task.run( runCmds )
                        }
                      );


    //启动电脑,自动获取更新项目
    grunt.registerTask("updateProject", "grunt updateProject",
                        function () {
                            var start = grunt.option("start") || 1;
                            var list = grunt.option("list");
                            var cmds = [   
                                'gitfetch:manager',
                                'gitmerge:manager',
                            ];
                            if ( list ) {
                                cmds.forEach(function(item, index ){
                                    console.log( (index+1) +'. ' + item ) 
                                })
                                return 
                            }
                            var runCmds = cmds.filter(function(item, index){
                                return  (index+1) >= start  
                            })
                            grunt.task.run( runCmds )
                        }
                      );

};

