"use strict"

LIVERELOAD_PORT = 35729

liveReload = require('connect-livereload')(port: LIVERELOAD_PORT)
serveStatic = (connect, base) ->
  connect.static (require("path").resolve base)

module.exports = (grunt) ->

  grunt.initConfig

    ####
    # static server
    ####
    connect:
        options:
            port: 9000
            hostname: "0.0.0.0" # cannot omit, default is "127.0.0.1"
        dev:
            options:
                middleware: (connect, options) ->
                  [liveReload, serveStatic(connect, "src")]

    ####
    # watch
    ####
    watch:
        options:
            livereload: LIVERELOAD_PORT
        files: ["src/**/*", "Gruntfile.coffee", ".jshintrc"]
        tasks: ["jshint"]

    ####
    # jshint
    ####
    jshint:
        files:[
            "package.json"
            ".jshintrc"
            "src/**/*.js"
            "!src/vendor/**/*.js"
        ]
        options:
          jshintrc: ".jshintrc"

    ####
    # bower
    ####
    bower:
      install:
        options:
          targetDir: './src/vendor'
          layout: 'byComponent'
          install: true
          verbose: false
          cleanTargetDir: true
          cleanBowerDir: true

  grunt.registerTask "run", ["connect:dev", "watch"]

  require("matchdep").filterDev("grunt-*").forEach grunt.loadNpmTasks
