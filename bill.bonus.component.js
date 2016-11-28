class bonusCtrl {
	constructor(modelService) {
		this.modelService = modelService;
		this.bonuses = this.modelService.data.moneyPresets;
		this.confirmBonus = (sum) => {
			this.modelService.confirmBonus.call(this.modelService, sum);
			
			// Auto assign amount when bonus item is selected
			this.amount = Math.round(sum);
		}
	}
}
bonusCtrl.$inject = ['modelService'];

const bonus = {
	templateUrl: './static/view/bonus.template.html',
	controller: bonusCtrl,
	controllerAs: 'bonusCtrl',
	bindings: {
		amount: '=',
		onUpdate: '&'
	}
};

export default bonus;
