const _ = require('lodash');
const firebase = require('firebase');
const functions = require('firebase-functions');
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

    process.env.fireclientFx = 'FIRE_CLIENT';
    global[process.env.fireclientFx] = {};
    this.registry = global[process.env.fireclientFx];
  }
  offload(mods = exports) {
    // console.log('offload', process.env.fireclientFx, global);
  }
  _register(key, fx = () => {}) {
    let name = key.replace(/\//g, 'sSs');
    this.registry[name] = fx;
  }
  _registerHttpGet(key, fx = () => {}) {
    let name = key.replace(/\//g, 'sSs');
    this.registry[name] = functions.https.onRequest(fx);
  }
  all() {

  }
  functionsModule() {
    // let firebaseJson = require(process.cwd() + '/firebase');
    // let fbFxJson = firebaseJson.functions || {};
    // let fxPath = fbFxJson.source || 'functions';
  }
  on(state, handler) {
    this._register(state, handler);
  }
  get(state, handler) {
    this._registerHttpGet(state, handler);
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
