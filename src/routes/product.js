import { Router } from 'express';

import SchemaValidator from '../utils/schema-validator';
import ProductSchema from '../schemas/product';
import ProductController from '../controllers/product';

class ProductRoutes {
	constructor() {
		this.router = new Router();

		this.productController = new ProductController();
	}

	setup() {
		this.router.post('/', SchemaValidator.validate(ProductSchema.create), this.productController.create);
		this.router.get('/:slug', SchemaValidator.validate(ProductSchema.find), this.productController.find);

		return this.router;
	}
}

export default ProductRoutes;
