'use strict';

import DataService from './app/services/data/Service';
import angular from 'angular';
import List from './app/components/list/Definition';


var app = angular.module('app',[]);

app.component('cpnList',new List());
app.service('dataService', DataService);