"use strict"

module.exports = (grunt) ->

  grunt.initConfig

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

  require("matchdep").filterDev("grunt-*").forEach grunt.loadNpmTasks
