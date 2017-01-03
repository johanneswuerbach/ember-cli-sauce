/* jshint node: true */
'use strict';

var path = require('path');
var fs = require('fs');

var addLauncherToJSON = require('../utils/add-launcher-to-json');
var addLauncherToJS = require('../utils/add-launcher-to-js');

module.exports = {
  name: 'sauce',
  works: 'insideProject',
  description: 'Add a sauce browser into your testem.json. ' +
               'Visit https://wiki.saucelabs.com/display/DOCS/Platform+Configurator and select "Selenium" / "node.js" for available browsers.',

  availableOptions: [
    {
      name: 'browser', type: String, default: 'chrome', aliases: ['b']
    },
    {
      name: 'visibility', type: String, default: 'public', aliases: ['vi']
    },
    {
      name: 'version', type: String, aliases: ['v']
    },
    {
      name: 'platform-name', type: String, aliases: ['p']
    },
    {
      name: 'platform-version', type: String, aliases: ['pv']
    },
    {
      name: 'device-name', type: String, aliases: ['dn']
    },
    {
      name: 'device-orientation', type: String, aliases: ['do']
    },
    {
      name: 'launcher-name', type: String
    },
    {
      name: 'add-to-ci',
      type: Boolean,
      default: false,
      description: 'Start this browser when running "ember test".'
    },
    {
      name: 'add-to-dev',
      type: Boolean,
      default: false,
      description: 'Start this browser when running "ember test --serve".'
    },
    {
      name: 'protocol',
      type: String,
      default: 'browser',
      description: 'The "browser" protocol reports individual test results, but is less stable then the "tap" protocol.'
    }
  ],

  run: function(options) {
    var jsonPath = path.join(this.project.root, 'testem.json');
    var launcherName = this.buildLauncherName(options);
    var launcher = this.buildLauncher(options);

    if (fs.existsSync(jsonPath)) {
      addLauncherToJSON(jsonPath, launcherName, launcher, options);
      this.ui.writeInfoLine('Sauce browser ' + options.browser + ' added to your "testem.json" as ' + launcherName + '.');
      return;
    }

    var jsPath = path.join(this.project.root, 'testem.js');

    if (fs.existsSync(jsPath)) {
      addLauncherToJS(jsPath, launcherName, launcher, options);
      this.ui.writeInfoLine('Sauce browser ' + options.browser + ' added to your "testem.js" as ' + launcherName + '.');
      return;
    }

    return this.ui.writeWarnLine('Couldn\'t find "testem.json" or "testem.js" in ' + this.project.root + '.');
  },

  joinArgs: function(args) {
    return args
      .map(function(arg) {
        if (arg.indexOf(' ') !== -1) {
          arg = '"' + arg + '"';
        }
        return arg;
      })
      .join(' ');
  },

  buildLauncherName: function(options) {
    var launcherName;
    if (options.launcherName) {
      launcherName = options.launcherName;
    }
    else {
      launcherName = [
        'SL',
        options.browser,
        options.visibility,
        options.version,
        options.platformName,
        options.platformVersion,
        options.deviceName,
        options.deviceOrientation
      ].filter(function(n) { return !!n; }).join('_').replace(/(\s|\.)+/g, "_");
    }

    return launcherName;
  },

  buildLauncher: function(options) {
    var args = ['-b', options.browser];
    if (options.version) {
      args.push('-v');
      args.push(options.version);
    }
    if (options.visibility) {
      args.push('--vi');
      args.push(options.visibility);
    }
    if (options.platformName) {
      args.push('-p');
      args.push(options.platformName);
    }
    if (options.platformVersion) {
      args.push('-pv');
      args.push(options.platformVersion);
    }
    if (options.deviceName) {
      args.push('-dn');
      args.push(options.deviceName);
    }
    if (options.deviceOrientation) {
      args.push('-do');
      args.push(options.deviceOrientation);
    }

    if (options.protocol === 'browser') {
      args.push('--at'); // Wait until testem finished
    }
    args.push('--no-ct'); // Don't create a seperate tunnel
    args.push('--u'); // Read URL provided by testem

    var launcher;
    if (options.protocol === 'browser') {
      launcher = {
        exe: 'ember',
        args: ['sauce:launch'].concat(args),
        protocol: 'browser'
      };
    }
    else {
      args.push('<url>');

      launcher = {
        command: 'ember sauce:launch ' + this.joinArgs(args),
        protocol: 'tap'
      };
    }

    return launcher;
  }
};
