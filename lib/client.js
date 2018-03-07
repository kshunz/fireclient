const _ = require('lodash');
const fs = require('fs');
const path = require('path');

class Client {

  constructor(config) {
    if (!config) return null;

    if (config.states) {
      this.states = config.states;
    }
  }

  on(state, handler) {
    let name = _.replace(state, /[^A-Z]/gi, '.')
      .split('.')
      .filter(a => a)
      .map((part, idx) => {
        return idx !== 0 ? _.capitalize(part) : part;
      })
      .join('');

    let fileContents  =
    `
    exports.${name} = functions.database.ref('${state}')
      .onWrite(${handler});
    `;
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
