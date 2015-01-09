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
* Add your launchers to your `launch_in_ci` array, when you want to test against them during CI.
* During test runs an **open Sauce Connect tunnel is required**. You can create a tunnel using the following command:
```bash
curl -L https://gist.githubusercontent.com/johanneswuerbach/ce15304c6d33538ecc6e/raw/sauce-connect.sh | bash
```

## Using on Travis
* Add `SAUCE_USERNAME`, `SAUCE_ACCESS_KEY` and the following script to your `.travis.yml`
```yaml
before_script:
  - curl -L https://gist.githubusercontent.com/johanneswuerbach/ce15304c6d33538ecc6e/raw/sauce-connect.sh | bash
```
* Happy testing!

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
