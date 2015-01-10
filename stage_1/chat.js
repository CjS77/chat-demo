/* jshint node:true */

var PORT = 33001;

var app = require('express')();
var server = require('http').Server(app);
var routes = require('./lib/routes');
var serveStatic = require('serve-static');

//process.env.DEBUG="* node";
require('./lib/socket').initialise(server);
app.set('view engine','jade');

/* the serveStatic middleware will serve all files in the 'public' folder to the '/' route.
   i.e. asking for /css/chat.js in the browser will serve up the file in public/css/chat.css
   Usually, I'll use NginX to serve static files; this is fine for development
 */
app.use(serveStatic('public'));

app.get('/', routes.index);

/*
 NB!! You must set the HTTP SERVER to listen on the port and NOT the Express instance, otherwise Socket.io
 eon't be able to intercept requests and you'll get 404 errors all the time.
 */
server.listen(process.env.PORT || PORT);
