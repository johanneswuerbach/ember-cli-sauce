/* jshint node: true */
'use strict';

var path = require('path');
var fs = require('fs');

module.exports = {
  name: 'sauce',
  works: 'insideProject',
  description: 'Add a sauce browser into your testem.json. ' +
               'Visit https://docs.saucelabs.com/reference/platforms-configurator/ and select "Selenium" / "node.js" for available browsers.',

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
      name: 'platform', type: String, aliases: ['p']
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
    var fullPath = path.join(this.project.root, 'testem.json');

    if (!fs.existsSync(fullPath)) {
      return;
    }
    var testemJSON = JSON.parse(fs.readFileSync(fullPath, { encoding: 'utf8' }));

    var args = ['-b', options.browser];
    if (options.version) {
      args.push('-v');
      args.push(options.version);
    }
    if (options.visibility) {
      args.push('--vi');
      args.push(options.visibility);
    }
    if (options.platform) {
      args.push('-p');
      args.push(options.platform);
    }

    if (options.protocol === 'browser') {
      args.push('--at'); // Wait until testem finished
    }
    args.push('--no-ct'); // Don't create a seperate tunnel
    args.push('--u'); // Read URL provided by testem

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
        options.platform
      ].filter(function(n) { return !!n; }).join('_').replace(/(\s|\.)+/g, "_");
    }

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

    testemJSON.launchers = testemJSON.launchers || {};
    testemJSON.launchers[launcherName] = launcher;

    if (options.addToCi) {
      this.addToLaunchers(launcherName, testemJSON.launch_in_ci);
    }

    if (options.addToDev) {
      this.addToLaunchers(launcherName, testemJSON.launch_in_dev);
    }

    fs.writeFileSync(fullPath, JSON.stringify(testemJSON, null, 2), { encoding: 'utf8' });

    this.ui.writeLine('Sauce browser ' + options.browser + ' added to your "testem.json" as ' + launcherName + '.');
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

  addToLaunchers: function(name, list) {
    if (list.indexOf(name) === -1) {
      list.push(name);
    }
  }
};
