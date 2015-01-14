/* jshint node:true */
'use strict';
var util = require('util'),
    format = util.format;

function init(socket) {
    var room = this;
    socket.emit('serverMessage', 'Welcome to the #ChatRoom');

    socket.on('userMessage', function (payload) {
        if (room.handleServerCommand(payload)) {
            return;
        }
        socket.broadcast.emit('userMessage', payload);
        socket.emit('myMessage', payload.msg);
    });

    socket.on('setNick', function (user) {
        socket.broadcast.emit('serverMessage', format("%s has changed his/her nick to <b>%s</b>", user.old, user.new));
        room.users[room.users.indexOf(user.old)] = user.new;
        socket.emit('myMessage', format("Nick changed to <b>%s</b>", user.new));
    });

    socket.on('userJoined', function(nick) {
        room.users.push(nick);
    })
}

/**
 *
 * @param socket - an instance of Socket (from socket.io)
 * @param name - the name of the room
 * @returns {ChatRoom}
 * @constructor
 */
function ChatRoom(socket, name) {
    //If new hasn't been called, do it for them
    if (!(this instanceof ChatRoom)) {
        return new ChatRoom(socket)
    }
    this.socket = socket;
    this.name = name;
    this.users = [];
    init.call(this, socket);
}

ChatRoom.prototype.handleServerCommand = function(payload) {
    var m = payload.msg.match(/^\/(.*)/);
    if (!m) {
        return false;
    }
    var command = m[1];
    switch (command) {
        case 'users':
            this.sendUsers();
            return true;
        case 'help':
            this.sendHelp();
            return true;
        case 'bye':
            socket.emit('serverMessage','Bye!');
            socket.disconnect();
            return true;
        default:
            return false;
    }
};

ChatRoom.prototype.sendUsers = function() {
    var userstr = this.users.join(', ');
    this.socket.emit('serverMessage', 'Users in this room: '+userstr);
};

ChatRoom.prototype.sendHelp = function() {
    this.socket.emit('serverMessage', "Server commands:<br/>"+
        "<ul>"+
        "<li>\/help:   Print this message</li>"+
        "<li>\/users:  Print list of users</li>"+
        "<li>\/bye:    Close the connection to the room</li>"+
        "</ul>");
};

module.exports = ChatRoom;