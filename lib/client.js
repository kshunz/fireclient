const _ = require('lodash');
const fs = require('fs');
const path = require('path');

class Client {

  constructor(config) {
    if (!config) return null;

    if (config.states) {
      this.states = config.states;
    }

    console.log(config);
  }

  on(state, handler) {

  }
  all() {

  }
  get(state, handler) {

  }
  post(state, handler) {

  }
  use(req, res, next) {

  }

}

module.exports = Client;
