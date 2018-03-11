const _ = require('lodash');
const firebase = require('firebase-admin');
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

    if (!config.firebase) {
      throw 'config.firebase is required. See firebase console for your configuration object.';
    }

    firebase.initializeApp(config.firebase);
    this.firebase = firebase;

    if (!config.functions) {
      throw 'config.functions is missing.';
    }
    this.functions = config.functions;

    process.env.fireclientFx = 'FIRE_CLIENT';
    global[process.env.fireclientFx] = {};
    this.registry = global[process.env.fireclientFx];
    this.marker = 'sSs';
  }
  offload(mods = exports) {
    // console.log('offload', process.env.fireclientFx, global);
  }
  _register(key, fx = () => {}) {
    let name = key.replace(/\//g, this.marker);
    this.registry[name] = fx;
  }
  _registerEvent(key, fx = () => {}) {
    let name = key.replace(/\//g, this.marker);
    this.registry[name] = this.functions.database.ref(name).onWrite(fx);
  }
  _registerHttpDelete(key, fx = () => {}) {
    let name = key.replace(/\//g, this.marker);
    this.registry[name] = this.functions.https.onRequest(fx);
  }
  _registerHttpGet(key, fx = () => {}) {
    let name = key.replace(/\//g, '_');
    var s = name;
    var noSlashes = s.replace(/\//g, '_');
    var startWithWord = /^_/.test(noSlashes) ? noSlashes.slice(1) : noSlashes;
    var webPath = _.camelCase(startWithWord);

    this.registry[webPath] = this.functions.https.onRequest(fx);
  }
  _registerHttpPatch(key, fx = () => {}) {
    this._registerHttpGet(key, fx);
  }
  _registerHttpPost(key, fx = () => {}) {
    let name = key.replace(/\//g, this.marker);
    this.registry[name] = this.functions.https.onRequest(fx);
  }
  _registerHttpPut(key, fx = () => {}) {
    this._registerHttpGet(key, fx);
  }
  all(state, handler) {
    this._registerHttpGet(state, handler);
  }
  del(state, handler) {
    this._registerHttpDelete(state, handler);
  }
  on(state, handler) {
    this._registerEvent(state, handler);
  }
  get(state, handler) {
    this._registerHttpGet(state, handler);
  }
  listen(port = 5000, handler = () => {}) {

    // const exec = require('child_process').spawn;

    //handler is not really tied into any other action at this point
    handler();

    // exec('firebase', ['serve', '--only', 'functions', '-p', `${port}`], {
    //   stdio: 'inherit'
    // });
  }
  patch(state, handler) {
    this._registerHttpPatch(state, handler);
  }
  post(state, handler) {
    this._registerHttpPost(state, handler);
  }
  put(state, handler) {
    this._registerHttpPost(state, handler);
  }
  use(handler) {
    //@TODO: augment the handler to include next
    return modifiedHandler;

    function modifiedHandler(h) {

    }
  }
}

module.exports = Client;
