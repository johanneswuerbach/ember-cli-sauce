var path = require('path');
var fs = require('fs');

module.exports = {
  description: 'ember-cli-sauce',

  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    var fullPath = path.join(this.project.root, 'testem.json');

    if (!fs.existsSync(fullPath)) {
      return;
    }

    var testemJSON = JSON.parse(fs.readFileSync(fullPath, { encoding: 'utf8' }));

    testemJSON.launchers = testemJSON.launchers || {};
    testemJSON.launchers.SL_Chrome = {
      exe: './node_modules/.bin/ember-cli-sauce',
      args: ['-b', 'chrome', '--at', '--no-ct', '-u'],
      protocol: 'browser'
    };

    fs.writeFileSync(fullPath, JSON.stringify(testemJSON, null, 2), { encoding: 'utf8' });

  }
};
