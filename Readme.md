# links

http://www.jetbrains.com/webstorm/webhelp/running-and-debugging-node-js.html

# deployment

## global dependencies

node.js installation
http://nodejs.org/

phantom.js installation
http://phantomjs.org/

## npm install

npm install from cmd line will install missing packages specified in package.json ->.dependencies
package.json contains * as version so npm update works

## npm global dependencies

gulp
bower

bower install from cmd line will install missing packages specified in bower.json ->.dependencies

use 
npm install gulp -g //installs gulp globally
gulp                // use gulp to compile / style check / convert stuff

### dev dependencies

#### gulp
task runner / compiler replacement

#### gulp-jshint
reports bad js style

####gulp-less
converts less to css

####gulp-concat
concats files

####gulp-csslint    
reports bad css style

####express-livereload
automatic client refresh
 
####karma
testrunner

####gulp-karma
testrunner

####karma-jasmine
testrunner

####karma-phantomjs-launcher
testrunner

### dependencies

####express
server / routing framework

####debug


####bower
client package manager

####serve-favicon
liefert fav icon


####morgan

####cookie-parser

####body-parser

####socket.io
web socket server for data updates

####jade
templating engine for serverside error page rendering

####passport
authentification framework

####passport-local
authentification strategy

####q-io
file api with promises

### bower dependencies

####angular
spa framework
####json3
####es5-shim
####bootstrap
ui framework

####angular-resource

####angular-cookies
####angular-sanitize
####angular-animate
####angular-touch
####angular-route

####socket.io-client
web socket client to receive data

####angular-local-storage
api for local storage

####angular-bootstrap
ui framework

##gulp tasks

###watch
watch input files and launch other tasks

###lint
check js for code style problems

###test
run unit tests

###csslint
check css for code vstyle problems

###serve
launch website