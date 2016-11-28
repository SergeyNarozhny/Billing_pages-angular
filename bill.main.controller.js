/**
 * @class [mainController] Main ctrl class
 * @ngInject [$scope, $routeParams] params through DI
 */
export default class mainController {
	/**
	 * @constructor Class constructor function
	 * @param  $scope
	 * @param  $routeParams
	 */
	constructor($scope, $route, modelService) {
		// Initial params
		this.droped = false;
		this.omitBacker = false;
		this.bonusChecked = false;
		this.currency = 'USD';
		this.payment = 'Visa/MasterCard';
		this.buttonText = 'Continue&ensp;&gt;';

		this.modelService = modelService;
		this.getCurrencySign = () => this.modelService.getCurrencySign.call(modelService);
		this.amountChange = () => this.modelService.amountChange.call(modelService, this.amount);
		
		/**
		 * Get active bonus wrap from modelService
		 * Additionally returns requested params
		 * @param  {String} param [type of param to return]
		 * @return {String|Boolean}
		 */
		this.getActiveBonus = (param) => {
			const tryActive = this.modelService.getActiveBonus.call(modelService);
			if (tryActive) {
				if (this.amount !== tryActive.sum && ~['diff', 'total'].indexOf(param)) {
					const total = this.amount * (1 + tryActive.bonus / 100);
					return (param === 'diff')
							? (total - this.amount) 
							: (this.bonusChecked ? total : this.amount);
				}
				return (param === 'total')
						? tryActive.sum
						: tryActive[param];
			}
			return false;
		};

		// React when route has changed
		$scope.$on('$routeChangeSuccess', () => this.prepareParams($route));
	}

	prepareParams(params) {
		if (params.current.$$route.originalPath !== '/') {
			this.omitBacker = true;
		}
		else {
			this.omitBacker = false;
		}
	}

	toggleBonus() {
		this.bonusChecked = !this.bonusChecked;
	}

}

mainController.$inject = ['$scope', '$route', 'modelService'];
