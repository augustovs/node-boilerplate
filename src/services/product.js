import Product from '../models/product';
import slugify from 'slugify';
import ExceptionUtils from '../utils/exception';

class ProductService {
	constructor() {
		this.productModel = Product.getInstance();
	}

	async generateSlug(slug, suffix = 1) {
		slug = slugify(slug, '-');

		let slugWhere = slug;

		if (suffix > 1) {
			slugWhere += `-${suffix}`;
		}

		const hasSlug = await this.productModel.scope({
			method: ['findBySlug', slugWhere]
		}).count();

		if (hasSlug) {
			suffix++;

			return this.generateSlug(slug, suffix);
		}

		let newSlug = slug;

		if (suffix > 1) {
			newSlug += `-${suffix}`;
		}

		return newSlug;
	}

	async create(data) {
		const slug = await this.generateSlug(data.name);

		return this.productModel.create({
			...data,
			slug
		});
	}

	async find(slug) {
		const product = await this.productModel.scope({
			method: ['findBySlug', slug]
		}).findOne();

		if (!product) {
			throw new ExceptionUtils('NOT_FOUND');
		}

		return product;
	}
}

export default ProductService;
