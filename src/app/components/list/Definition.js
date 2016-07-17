import Controller from './Controller'

export default class Definition {
  constructor() {
    this.template = require('./View.html');
    this.controller = Controller;
    this.bindings = {};
  }
};
