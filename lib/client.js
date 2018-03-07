const _ = require('lodash');
const firebase = require('firebase');
const fs = require('fs');
const path = require('path');
class Client extends FbInstance {

  constructor(config) {
    if (!config) return null;

    if (config.states) {
      this.states = config.states;
    }

    if (config.firebase) {
      firebase.initializeApp(config.firebase);
      this.firebase = firebase;
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
