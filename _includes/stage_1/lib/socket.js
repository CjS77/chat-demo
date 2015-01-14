/* global require */
/* jshint node:true */
'use strict';

var io = require('socket.io'),
    ChatRoom = require('./chat-server');



/**
 * Initialises the WebSocket / IOSocket. server must be an HTTPServer instance
 * @param server
 */
exports.initialise = function(server) {
    var rooms = [];
    //Attaches the server to an engine.io instance on srv with the supplied opts (optionally).
    var io = require('socket.io')(server);
    io.on('connection', function(socket) {
        console.log('Socket.io connection established.' );
        var room = ChatRoom(socket);
        rooms.push(room);
    });
    return rooms;
};

