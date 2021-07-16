import BaseController from './base';
import ProductService from '../services/product';

class ProductController extends BaseController {
	constructor() {
		super();

		this.productService = new ProductService();

		this.create = this.create.bind(this);
		this.find = this.find.bind(this);
	}

	async create(req, res) {
		try {
			const product = await this.productService.create(req.data);

			this.successHandler(product, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async find(req, res) {
		try {
			const product = await this.productService.find(req.filter.slug);

			this.successHandler(product, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}

export default ProductController;
