#!/usr/bin/env node
var path = require('path');
var spawn = require('child_process').spawn;

var sauciePath = path.join(__dirname, '..', './node_modules/.bin/saucie');

var saucie = spawn(sauciePath, process.argv, { stdio: 'inherit' });

'SIGINT SIGTERM SIGHUP'.split(' ').forEach(function(evt) {
  process.on(evt, function() {
    saucie.kill(evt);
  });
});
