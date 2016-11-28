/**
 * Routes configuration
 * @ngInject [$routeProvider]
 */
function routing($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: './static/view/deposit.html',
		})
		.when('/pay/', {
			templateUrl: './static/view/payment.html',
		});
}
routing.$inject = ['$routeProvider'];

export default routing;
