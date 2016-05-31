/* jshint node: true */
'use strict';
var fs = require('fs');
var recast = require('recast');
var b = recast.types.builders;

function addToLaunchers(testemJS, listName, launcherName) {
  var list;

  recast.visit(testemJS, {
    // Compare identifiers with a new name to ensure it's unique
    visitProperty: function(path) {
      var key = path.value.key;
      if ((key.type === 'Identifier' && key.name === listName) ||
        (key.type === 'Literal' && key.value === listName)) {
        list = path;
        this.abort();
      }
      return false;
    }
  });

  list.value.value.elements.push(b.literal(launcherName));
}

module.exports = function(fullPath, launcherName, launcher, options) {
  var ast = recast.parse(fs.readFileSync(fullPath, { encoding: 'utf8' }));

  var testemJS = ast.program.body[0];

  var property = null;

  recast.visit(testemJS, {
    // Compare identifiers with a new name to ensure it's unique
    visitProperty: function(path) {
      var key = path.value.key;
      if ((key.type === 'Identifier' && key.name === 'launchers') ||
        (key.type === 'Literal' && key.value === 'launchers')) {
        property = path;
        this.abort();
      }
      return false;
    }
  });

  // TODO Find a better way
  var launcherPattern = recast.parse('a = ' + JSON.stringify(launcher, null, 2))
    .program.body[0].expression.right;
  var launcherProperty = b.property('init', b.identifier(launcherName), launcherPattern);

  if (property) {
    property.value.value.properties.push(launcherProperty);
  } else {
    testemJS.expression.right.properties.push(
      b.property('init', b.identifier('launchers'), b.objectPattern([launcherProperty])
    ));
  }

  if (options.addToCi) {
    addToLaunchers(testemJS, 'launch_in_ci', launcherName);
  }

  if (options.addToDev) {
    addToLaunchers(testemJS, 'launch_in_dev', launcherName);
  }

  fs.writeFileSync(fullPath, recast.print(ast).code, { encoding: 'utf8' });
};
