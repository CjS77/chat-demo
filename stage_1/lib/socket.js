/* global require */
/* jshint node:true */
'use strict';

var io = require('socket.io');

/**
 * Initialises the WebSocket / IOSocket. server must be an HTTPServer instance
 * @param server
 */
exports.initialise = function(server) {
    //Attaches the server to an engine.io instance on srv with the supplied opts (optionally).
    var io = require('socket.io')(server);
    io.on('connection', function(socket) {
        console.log('Socket.io connection established.' );
        socket.emit('serverMessage','Welcome to the #ChatRoom');

        socket.on('userMessage', function(payload) {
            socket.broadcast.emit('userMessage', payload);
            socket.emit('myMessage', payload.msg);
        });
    });


};

