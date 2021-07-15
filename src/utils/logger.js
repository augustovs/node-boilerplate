import chalk from 'chalk';

import ExceptionUtils from './exception';

class Logger {
	static log(req, error) {
		if (error instanceof ExceptionUtils) {
			return;
		}

		console.info(chalk.red(error.stack || error));
	}

	static error(message) {
		console.info(chalk.red(message));
	}

	static success(message) {
		console.info(chalk.green(message));
	}
}

export default Logger;
