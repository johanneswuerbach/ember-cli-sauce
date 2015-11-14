# ember-cli-sauce [![Build Status](https://travis-ci.org/johanneswuerbach/ember-cli-sauce.svg?branch=master)](https://travis-ci.org/johanneswuerbach/ember-cli-sauce)

Cross browser testing for your ember-cli app using SauceLabs.

## Installation

* `ember install ember-cli-sauce`

## Usage

* Get a SauceLabs account.
* Make sure Sauce credentials are set in env:
  * `SAUCE_USERNAME` - your SauceLabs username
  * `SAUCE_ACCESS_KEY` - your SauceLabs API/Access key.
* Add browsers using `ember sauce --help`
* During test runs an **open Sauce Connect tunnel is required**. You can create a tunnel using the following command:
```bash
ember start-sauce-connect
```

### Use a different port 
Some browsers (e.g. Safari & Edge) don't work with the default testem port and require a different port for now.
```bash
ember test --test-port 7000
```

Please vote on https://saucelabs.ideas.aha.io/ideas/SLIDEA-I-146, to have this working out of the box.

## Using on Travis
* Add `SAUCE_USERNAME`, `SAUCE_ACCESS_KEY` and the following script to your `.travis.yml`
```yaml
before_script:
  - ember sauce:connect

after_script:
  - ember sauce:disconnect
```
* Happy testing!

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
