module.exports = function(grunt) {
    "use strict";

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        cacheBust: (new Date()).getTime(),

        dirs: {
            base     : "./",
            js       : {
                dest : "./js",
                src  : "./js/src",
                temp : "./js/src/_temp"
            },
            css      : {
                dest : "./css",
                src  : "./css/src",
            },
            img      : "./img",
            views    : "./app/resources/views",
            ctrl     : "./app/Http/Controllers",
        },

        jshint: {
            options: {
                jshintrc: "<%= dirs.js.src %>/.jshintrc"
            },
            all: [
                "<%= dirs.js.src %>/*.js",
                "!<%= dirs.js.src %>/script.js"
            ]
        },

        concat: {
            options       : {
                separator : "\n\n"
            },
            frameworks    : {
                src       : [
                    //"<%= dirs.js.src %>/jquery/jquery-2.1.3.min.js"
                    //"<%= dirs.js.src %>/bootstrap/*.js"
                ],
                dest      : "<%= dirs.js.temp %>/frameworks.js"
            },
            app           : {
                src       : [
                    "<%= dirs.js.src %>/app*.js"
                ],
                dest      : "<%= dirs.js.temp %>/app.js"
            },
            dev           : {
                src       : [
                    "<%= dirs.js.temp %>/app.js"
                ],
                dest      : "<%= dirs.js.src %>/script.js"
            }
        },

        // Minificar JS
        uglify: {
            options                 : {
                mangle              : {
                    //essa opção "mangle" é quem modifica os nomes de variáveis para palavras pequenas ou letras.
                    //no Array abaixo, podemos ignorar algumas variaveis.
                    except          : ["jQuery","$"]
                }
            },
            prod                    : {
                options             : {
                    banner          : "/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> */",
                    properties      : true,
                    preserveComments: false,
                    compress        : {
                        global_defs : {
                            "DEBUG" : false
                        },
                        dead_code   : true
                    }
                },
                files               : {
                    "<%= dirs.js.dest %>/script.min.js": ["<%= dirs.js.temp %>/script.log.js"],
                }
            }
        },

        removelogging: {
            dist: {
                files: {
                    "<%= dirs.js.temp %>/script.log.js": ["<%= dirs.js.src %>/script.js"],
                    //"<%= dirs.js.temp %>/AdBanner.log.js": ["<%= dirs.js.src %>/AdBanner.src.js"]
                }
            }
        },

        less: {
            dev              : {
                options      : {
                    compress : false,
                    dumpLineNumbers: true
                },
                files        : {
                    "<%= dirs.css.dest %>/style.css": "<%= dirs.css.src %>/style.less"
                }
            },
            prod             : {
                options      : {
                    compress : true
                },
                files        : {
                    "<%= dirs.css.dest %>/style.min.css": "<%= dirs.css.src %>/style.less"
                }
            }
        },

        csslint: {
            strict: {
                options: {
                    "important": false,
                    "adjoining-classes": false,
                    "known-properties": false,
                    "box-sizing": false,
                    "box-model": false,
                    "overqualified-elements": false,
                    "display-property-grouping": false,
                    "bulletproof-font-face": false,
                    "compatible-vendor-prefixes": false,
                    "regex-selectors": false,
                    "errors": true,
                    "duplicate-background-images": false,
                    "duplicate-properties": false,
                    "empty-rules": false,
                    "selector-max-approaching": false,
                    "gradients": false,
                    "fallback-colors": false,
                    "font-sizes": false,
                    "font-faces": false,
                    "floats": false,
                    "star-property-hack": false,
                    "outline-none": false,
                    "import": false,
                    "ids": false,
                    "underscore-property-hack": false,
                    "rules-count": false,
                    "qualified-headings": false,
                    "selector-max": false,
                    "shorthand": false,
                    "text-indent": false,
                    "unique-headings": false,
                    "universal-selector": false,
                    "unqualified-attributes": false,
                    "vendor-prefix": false,
                    "zero-units": false
                },
                src: ["<%= dirs.css.src %>/style.css"]
            }
        },

        // Watch
        watch: {
            options: {
                livereload: true
            },
            less: {
                files: [
                    "<%= dirs.css.src %>/**/*.less",
                    "<%= dirs.css.src %>/*.css"
                    ],
                tasks: ["less:prod"],
                options: {
                    livereload: false
                }
            },
            css: {
                files: ["<%= dirs.css.dest %>/*.css"]
            },
            js: {
                files: [
                    "Gruntfile.js",
                    "<%= dirs.js.src %>/**/*.js",
                    "!<%= dirs.js.src %>/script.js",
                    "!<%= dirs.js.dest %>/script.min.js",
                    "!<%= dirs.js.temp %>/*.js"
                ],
                tasks: ["concat","removelogging","uglify"]
            },
            others: {
                files: [
                    "<%= dirs.base %>/*.{html,txt,php}",
                    "<%= dirs.views %>/**/*.php",
                    "<%= dirs.ctrl %>/**/*.php"
                ]
            }
        },

    });

    grunt.registerTask("build", ["less:prod","js"]);
    grunt.registerTask("w", ["build","watch"]);
    grunt.registerTask("css", ["less"]);
    grunt.registerTask("js", ["concat","removelogging","uglify"]);
    grunt.registerTask("default", ["build"]);
};