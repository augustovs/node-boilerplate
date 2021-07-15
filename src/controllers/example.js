import BaseController from './base';
import ExampleService from '../services/example';
// import { pick } from 'lodash';

class ExampleController extends BaseController {
	constructor() {
		super();

		this.exampleService = new ExampleService();

		this.list = this.list.bind(this);
	}

	async list(req, res) {
		try {
			const examples = await this.exampleService.list({
				filter: {}
			});

			this.successHandler(examples, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}

export default ExampleController;
