import { Model } from 'sequelize';

export default class BaseModel extends Model {
	static init() {
		this.instances = {};

		return super.init(...arguments);
	}

	static setInstance(instanceName, instance) {
		this.instances[instanceName] = instance;
	}

	static getInstance(instanceName) {
		return this.instances[instanceName] || this.instances['master'];
	}
}
