'use strict';

import DataService from './app/services/DataService';
import angular from 'angular';
import List from './app/components/list/Definition.js';


var app = angular.module('app',[]);

app.component('cpnList',new List());
app.service('dataService', DataService);