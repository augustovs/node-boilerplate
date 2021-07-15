import { Router } from 'express';

import SchemaValidator from '../utils/schema-validator';
import ExampleSchema from '../schemas/example';
import ExampleController from '../controllers/example';

class ExampleRoutes {
	constructor() {
		this.router = new Router();

		this.exampleController = new ExampleController();
	}

	setup() {
		this.router.get('/', SchemaValidator.validate(ExampleSchema.list), this.ExampleController.list);

		return this.router;
	}
}

export default ExampleRoutes;
