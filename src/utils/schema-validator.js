import { pickBy, isUndefined } from 'lodash';

import Logger from './logger';
import ErrorMessages from '../constants/error.messages';

export default class SchemaValidator {
	static getMessage(error) {
		const field = error.path;
		const errorType = error.type;
		const fieldName = field;

		return ErrorMessages[errorType]
			? ErrorMessages[errorType](fieldName, error.params.originalValue, error.params.type)
			: 'Houve um erro, tente novamente em breve.';
	}

	static validate(schema) {
		return (req, res, next) => {
			const { error, results } = SchemaValidator.isValid(schema, req);

			if (error) {
				return res.status(400).json({
					status: 'error',
					message: SchemaValidator.getMessage(error)
				});
			}

			req.data = pickBy(results.data, value => !isUndefined(value));
			req.filter = pickBy(results.filter, value => !isUndefined(value));

			return next();
		};
	}

	static isValid(schemas, req) {
		try {
			const results = {
				filter: {},
				data: {}
			};

			Object.keys(schemas).forEach(key => {
				const schema = schemas[key];
				const result = schema.cast(schema.validateSync(req[key]));

				if (key === 'body') {
					results.data = Object.assign(results.data, result);
					return;
				}

				results.filter = Object.assign(results.filter, result);
			});

			return { results };
		} catch (error) {
			if (process.env.DEBUG) {
				Logger.error('---- VALIDATION ERROR ----');
				Logger.error(error.stack);
				Logger.error('---- VALIDATION ERROR ----');
			}

			return { error };
		}
	}
}
