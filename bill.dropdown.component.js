class dropCtrl {
	constructor(modelService) {
		this.droped = false;
		this.modelService = modelService;

		// Initial setup
		this.$onInit = function() {
			this.recalcData(this.content, this.model);
		};
	}

	/**
	 * Recalculate data after dropdown's model is changed
	 * @param  {String} content [type of dropdown's content]
	 * @param  {String} value   [value of dropdown's element in the list]
	 * @return {Noop}
	 */
	recalcData(content, value) {
		const isCurrency = ~content.indexOf('currency');
		const model = isCurrency ? 'currency' : 'payment';

		if (value) {
			this.modelService.data[model] = value;
		}
		const active = this.modelService.data[content].filter((d) => {
				return d.name.toLowerCase() === this.modelService.data[model].toLowerCase();
			}).shift();

		// If it is currency dropdown, recalculate sums according to the new multiplier
		if (isCurrency) {
			angular.forEach(this.modelService.data.moneyPresets, function(v) {
				v.sum = v.deposit * active.multiplier;
				v.total = v.sum * (1 + v.bonus / 100);
				v.diff = v.total - v.sum;
			});
			// @todo if this.amount is set, we need to call confirmBonus to update amount
		}

		// For model-view binding
		this.model = active.name;
		this.activeClass = active.class;

		this.rest = this.modelService.data[content].filter((d) => {
			return d.name.toLowerCase() !== this.modelService.data[model].toLowerCase();
		});

		this.droped = false;
	}

	toggleDrop() {
		this.droped = !this.droped;
	}
}
dropCtrl.$inject = ['modelService'];

const dropdown = {
	templateUrl: './static/view/dropdown.template.html',
	bindings: {
		content: '@',
		model: '=ngModel'
	},
	controller: dropCtrl,
	controllerAs: 'dropCtrl'
};

export default dropdown;
