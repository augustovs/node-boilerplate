import BaseModel from './base';

export default class User extends BaseModel {
	static load(sequelize) {
		return super.init({}, {
			timestamps: true,
			sequelize: sequelize,
			modelName: 'user',
			tableName: 'users',
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		});
	}
}
