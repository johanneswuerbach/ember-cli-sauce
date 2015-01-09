# ember-cli-sauce [![Build Status](https://travis-ci.org/johanneswuerbach/ember-cli-sauce.svg?branch=master)](https://travis-ci.org/johanneswuerbach/ember-cli-sauce)

Cross browser testing for your ember-cli app using SauceLabs.

## Installation

* `ember install:addon ember-cli-sauce`

## Usage

* Get a SauceLabs account.
* Make sure Sauce credentials are set in env:
  * `SAUCE_USERNAME` - your SauceLabs username
  * `SAUCE_ACCESS_KEY` - your SauceLabs API/Access key.
* Add your browsers into the `launchers` section of your `testem.json`, Chrome was already added for you.
* Add your launchers to your `launch_in_ci` array, when you want to test against them during CI

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
