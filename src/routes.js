import { Router } from 'express';

// import InventoryWarehouseRoutes from './routes/inventory-warehouse';

class Routes {
	constructor() {
		this.routes = new Router();
		// this.inventoryWarehouseRoutes = new InventoryWarehouseRoutes();
	}

	setup() {
		// this.routes.use('/inventory-warehouses', [AuthMiddleware.isAuthorized], this.inventoryWarehouseRoutes.setup());

		return this.routes;
	}
}

export default Routes;
