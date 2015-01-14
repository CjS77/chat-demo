/* jshint browser:true */
/* globals $, io */
'use strict';


//shortcut for document.onready = function()
$(function() {
    var nick = "user";
    var socket = io.connect('localhost:33001/')
    .on('connect', function() {
        $('#status').html("<b>Connected</b>").removeClass().addClass('connected');
        socket.emit('userJoined',nick);
    })
    .on('disconnect', function(socket) {
        $('#status').html("<b>Disconnected</b>").removeClass().addClass('disconnected');
    })
    .on('reconnecting', function(socket) {
        $('#status').html("<b>Reconnecting...</b>").removeClass().addClass('reconnecting');
    })
    .on('serverMessage', function(message) {
        $('#messages').append('<p class="server"><b>Admin:</b> '+message+'</p>');
    })
    .on('myMessage', function(message) {
        $('#messages').append('<p class="message me"><i><b>Me:</b> '+message+'</i></p>');
    })
    .on('userMessage', function(payload) {
        var el = $('#messages').append(sprintf('<p><b>%s:</b> %s</p>', payload.nick, payload.msg));
        el.addClass("message "+payload.nick);
    });

    function sendMessage() {
        if (!socket.connected) return;
        var msg = $('#message').val();
        socket.emit('userMessage', {nick:nick, msg: msg});
    }

    $('#send').click(function() {
        sendMessage()
    });

    $('#btnnick').click(function() {
        var newNick = $('#nick').val();
        socket.emit('setNick', {old: nick, new: newNick});
        nick = newNick;
    })

    $('#message').keydown(function(event) {
        if (event.which === 13) { //ENTER
            sendMessage();
        }
    })
});