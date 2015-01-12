/* jshint node:true */
'use strict';

exports.index = function(req, res) {
  res.render('index');
};

exports.css = function(req, res) {
    if (req.params[0]) {
        res.sendFile('css/' + res.params[0]);
    }
};

