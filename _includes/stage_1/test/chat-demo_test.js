/*global describe,it*/
'use strict';
var assert = require('assert'),
  chatDemo = require('../lib/chat-demo.js');

describe('chat-demo node module.', function() {
  it('must be awesome', function() {
    assert( chatDemo.awesome(), 'awesome');
  });
});
