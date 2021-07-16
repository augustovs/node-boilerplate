import { Router } from 'express';

import ProductRoutes from './routes/product';

class Routes {
	constructor() {
		this.routes = new Router();
		this.productRoutes = new ProductRoutes();
	}

	setup() {
		this.routes.use('/product', this.productRoutes.setup());

		return this.routes;
	}
}

export default Routes;
