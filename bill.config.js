/**
 * Routes configuration
 * @ngInject [$routeProvider]
 */
function routing($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/static/view/deposit.html',
		})
		.when('/pay/', {
			templateUrl: '/static/view/payment.html',
		});
	$locationProvider.hashPrefix('');
}
routing.$inject = ['$routeProvider', '$locationProvider'];

export default routing;
