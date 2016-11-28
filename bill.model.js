export default class model {
	constructor() {
		this.data = {
			moneyPresets: [
				{ deposit: 250, bonus: 30 },
				{ deposit: 500, bonus: 33 },
				{ deposit: 1000, bonus: 36, vip: true },
				{ deposit: 3000, bonus: 40, vip: true }
			].map(function(m) {
				m.sum = m.deposit;
				m.total = m.deposit * (1 + m.bonus / 100);
				m.diff = m.total - m.deposit;
				m.active = false;
				return m;
			}),
			paymentTypes: [
				{ name: 'Visa/MasterCard', class: 'visa-master' },
				{ name: 'Neteller', class: 'neteller' },
				{ name: 'skrill', class: 'skrill' },
				{ name: 'Neosurf', class: 'neosurf' },
				{ name: 'Euteller', class: 'euteller' },
				{ name: 'iDeal', class: 'ideal' },
			],
			currencyOptions: [
				{ name: 'usd', sign: '$', multiplier: 1, default: true },
				{ name: 'eur', sign: '€', multiplier: 1.07 },
				{ name: 'gbp', sign: '£', multiplier: 1.25 },
				{ name: 'rub', sign: '₽', multiplier: 65.85 }
			].map(function(c) {
				c.name = c.name.toUpperCase();
				return c;
			})
		};
	}

	/**
	 * Choose bonus and make it active
	 * @param  {Number} deposit
	 * @return {Noop}
	 */
	confirmBonus(deposit) {
		angular.forEach(this.data.moneyPresets, (b) => {
			b.active = false;
			if (deposit && b.sum === deposit) {
				b.active = true;
			}
		});
	}

	/**
	 * Try to find closest bonus according to user amount input
	 * and make it active
	 * @param  {Number|String} amount
	 * @return {Boolean}
	 */
	amountChange(amount) {
		this.confirmBonus();

		const v = +amount;
		let pd = this.data.moneyPresets[0].sum;
		let ai = 0;
		if (v < pd || !v) {
			return false;
		}
		for (var i = 1; i < this.data.moneyPresets.length; i++) {
			let td = this.data.moneyPresets[i].sum;
			if (v >= pd && v < td) {
				break;
			}
			else {
				ai = i;
				pd = td;
			}
		}
		this.data.moneyPresets[ai].active = true;
		return true;
	}

	/**
	 * Wrap function that creates a loop which is immidiately breaked
	 * when callback's condition fulfilled, and returns resulted data
	 * @param  {Array}   data
	 * @param  {Function} cb
	 * @return {Object|Boolean}
	 */
	recurs(data, cb) {
		let out = false;
		if (!data) return false;
		for (var i = 0; i < data.length; i++) {
			out = cb(data[i]);
			if (out) {
				break;
			}
		}
		return out;
	}

	/**
	 * Get active bonus in loop
	 * @return {Object|Boolean}
	 */
	getActiveBonus() {
		return this.recurs(this.data.moneyPresets, function(preset) {
			return preset.active ? preset : false;
		})
	}

	/**
	 * Get currency sign in place
	 * @return {String|Boolean}
	 */
	getCurrencySign() {
		let s;
		this.data.currencyOptions.some((d) => {
			if (d.name === this.data.currency) {
				s =  d.sign;
				return true;
			}
			return false;
		});
		return s;
	}
};
