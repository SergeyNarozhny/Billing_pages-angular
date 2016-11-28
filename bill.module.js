import './static/main.post.css';

import angular from 'angular';
import ngRoute from 'angular-route';
import mainController from './bill.main.controller';
import routing from './bill.config';
import bonus from './bill.bonus.component';
import dropdown from './bill.dropdown.component';
import model from './bill.model';

/**
 * Main app, router, service and ctrl definition
 */
angular
	.module('bill', [ngRoute])
	.config(routing)
	.service('modelService', model)
	.component('bonusList', bonus)
	.component('dropList', dropdown)
	.controller('main', mainController);
