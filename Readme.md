# links

http://www.jetbrains.com/webstorm/webhelp/running-and-debugging-node-js.html

# deployment

npm install from cmd line will install missing packages specified in package.json ->.dependencies
package.json contains * as version so npm update works

bower install from cmd line will install missing packages specified in bower.json ->.dependencies

use 
npm install gulp -g //installs gulp globally
gulp                // use gulp to compile / style check / convert stuff

## dev dependencies

gulp            task runner / compiler replacement

gulp-jshint     reports bad js style

gulp-less       converts less to css

gulp-concat     concats files

gulp-qunit      unit tests

gulp-csslint    reports bad css style

amdefine        package definition

bower           client package manager

## dependencies

connect         used for socket listening

requirejs       dependency management / late loading

express         mvc control implementation

hbs             mvc view implementation rendering on server

mime            helper for discovery of mime types

path            helper for manipulating path strings

## ui / bower dependencies

jquery                      improved dom manipulation

jquery-ui                   widgets and interaction behaviors

Cookies                     cookies

qunit                       unittests

requirejs-domready          waiting for domready the requirejs way

linqjs-amd                  linq for js searching / filtering / sorting / joining of enumerables + aggregate functions

handlebars                  mvc view implementation for rendering from view model

require-handlebars-plugin   require views for rendering

# documentation

DomainModel created with
https://creately.com/

## architecture

v-vm-m-c

### view 

display stuff

### view model

logic of interaction between view and model
should handle events from the view and provide additional information not present in the model

each view model should have:

display method that renders it

connectModelWithView method that connects the view with the view model
this should be replaced by ember or knockout but no time for that yet

### model

the data

### controller

handles server side view rendering and provides the model will later handle the manipulation persistence of the model
