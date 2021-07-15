import cors from 'cors';
import http from 'http';
import helmet from 'helmet';
import dotenv from 'dotenv';
import express from 'express';

import Database from './databases';

import Routes from './routes.js';
import Logger from './utils/logger';

class App {
	constructor() {
		dotenv.config({ path: `${__dirname}/../.env` });

		this.app = express();
		this.port = process.env.PORT || '5000';
		this.httpServer = http.createServer(this.app);

		this.logger = new Logger();
		this.database = new Database();
	}

	async setup() {
		await this.database.connect();

		const routes = new Routes();

		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(cors());
		this.app.use(helmet());

		this.app.use(routes.setup());
	}

	gracefulStop() {
		return () => {
			this.httpServer.close(async error => {
				await this.database.disconnect();

				return error ? process.exit(1) : process.exit(0);
			});
		};
	}

	start() {
		this.httpServer.listen(this.port, () => this.setup());

		process.on('SIGINT', this.gracefulStop());
	}
}

export default App;
