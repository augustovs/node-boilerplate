import BaseModel from './base';

export default class Product extends BaseModel {
	static load(sequelize, DataTypes) {
		return super.init({
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: false,
				defaultValue: 0
			},
			slug: {
				type: DataTypes.STRING,
				allowNull: false
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				defaulValue: false
			}
		}, {
			timestamps: true,
			sequelize: sequelize,
			modelName: 'product',
			tableName: 'products',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			scopes: {
				findBySlug: slug => {
					return {
						where: {
							slug,
							is_deleted: false
						}
					};
				}
			}
		});
	}
}
