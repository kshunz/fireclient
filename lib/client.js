const _ = require('lodash');
const firebase = require('firebase');
const fs = require('fs');
const path = require('path');

class Client {

  constructor(config) {
    if (!config) {
      throw 'Configuration Object is required';
    }

    if (config.states) {
      this.states = config.states;
    }

    if (config.firebase) {
      firebase.initializeApp(config.firebase);
      this.firebase = firebase;
    } else {
      throw 'config.firebase is required. See firebase console for your configuration object.';
    }

    console.log(config);
  }

  on(state, handler) {

  }
  all() {

  }
  get(state, handler) {

  }
  listen(port = 5000, handler = () => {}) {
    const exec = require('child_process').spawn;

    handler();

    exec('firebase', ['serve', '--only', 'functions', '-p', `${port}`], {
      stdio: 'inherit'
    });

  }
  post(state, handler) {

  }
  use(req, res, next) {

  }

}

module.exports = Client;
