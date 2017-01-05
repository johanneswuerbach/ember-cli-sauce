#!/usr/bin/env node

var saucie = require('saucie');
var options = saucie.parseArgv(process.argv);

saucie(options);
