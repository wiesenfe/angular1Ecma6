import Controller from './Controller.js'

export default class Definition {
  constructor() {
    this.template = require('./View.html');
    this.controller = Controller;
    this.bindings = {};
  }
};
