import fs from 'fs';
import Sequelize from 'sequelize';

import Logger from './utils/logger';

class Database {
	constructor() {
		this.models = {};
		this.databaseOptions = {
			dialect: 'postgres',
			port: process.env.DB_PORT || 5432,
			logging: false,
			minifyAliases: true,
			pool: {
				max: 20,
				min: 5
			},
			query: {
				raw: true
			}
		};

		this.masterInstance = this._masterInstance();
	}

	getInstance() {
		return this.masterInstance;
	}

	_masterInstance() {
		return new Sequelize(
			process.env.DB_NAME,
			process.env.DB_USER,
			process.env.DB_PASSWORD,
			{
				host: process.env.DB_HOST,
				...this.databaseOptions
			}
		);
	}

	_loadModels() {
		fs.readdirSync(`${__dirname}/models`, { withFileTypes: true })
			.filter(entry => fs.statSync(`${__dirname}/models/${entry.name}`).isFile())
			.map(entry => `${__dirname}/models/${entry.name}`)
			.forEach(filePath => {
				const Model = require(filePath).default;

				if (Model.name === 'BaseModel') {
					return;
				}

				const masterInstance = Model.load(this.masterInstance, Sequelize);

				this.models[Model.name] = masterInstance;

				Model.setInstance('master', masterInstance);
			});
	}

	_instantiateModels() {
		Object.values(this.models)
			.filter(model => typeof model.associate === 'function')
			.forEach(model => {
				model.models = this.models;
				model.sequelize = this.masterInstance;
				model.associate(this.models);
			});
	}

	_authenticate() {
		return this.masterInstance.authenticate()
			.then(() => Logger.success('Database is connected.'))
			.catch(error => Logger.error(`Database connection error: ${error}`));
	}

	disconnect() {
		return this.masterInstance.close()
			.then(() => Logger.success('Database is disconnected.'))
			.catch(error => Logger.error(`Database disconnection error: ${error}`));
	}

	connect() {
		this._loadModels();
		this._instantiateModels();

		return this._authenticate();
	}
}

export default Database;
