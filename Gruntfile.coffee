"use strict"

module.exports = (grunt) ->

  grunt.initConfig

    ####
    # watch
    ####
    watch:
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
        ]
        options:
            jshintrc: ".jshintrc"

    ####
    # bower
    ####
    bower:
      install:
        options:
          targetDir: './vendor'
          layout: 'byComponent'
          install: true
          verbose: false
          cleanTargetDir: true
          cleanBowerDir: true

  grunt.registerTask "run", ["watch"]

  require("matchdep").filterDev("grunt-*").forEach grunt.loadNpmTasks
