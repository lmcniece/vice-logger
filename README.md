# ember-js-getting-started

A barebones Ember.js app, which can easily be deployed to Heroku.

**This app is deployed as a static app, if you would like to try a one click deploy of a FastBoot app check out [this branch](https://github.com/heroku/ember-js-getting-started/tree/fastboot).**

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Running Locally

```sh
$ git clone git@github.com:heroku/ember-js-getting-started.git
$ cd ember-js-getting-started
$ npm install
$ bower install
$ ember server
```
Your app should now be running on [localhost:4200](http://localhost:4200/).

## Deploying to Heroku

```sh
$ heroku create --buildpack https://codon-buildpacks.s3.amazonaws.com/buildpacks/heroku/emberjs.tgz
$ git push heroku master
$ heroku open
```
or

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/heroku/ember-js-getting-started)

## Documentation

* [Heroku Ember.js Buildpack](https://github.com/heroku/heroku-buildpack-emberjs)
* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
