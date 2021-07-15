import currency from 'currency.js';

export default class CurrencyUtils {
	static add(firstNumber, secondNumber) {
		return currency(firstNumber).add(secondNumber).value;
	}

	static subtract(firstNumber, secondNumber) {
		return currency(firstNumber).subtract(secondNumber).value;
	}

	static multiply(number, multiplier) {
		return currency(number).multiply(multiplier).value;
	}

	static divide(number, divisor) {
		return currency(number).divide(divisor).value;
	}
}
