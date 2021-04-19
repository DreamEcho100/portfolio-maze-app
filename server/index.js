const express = require('express');
const next = require('next');
const path = require('path');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);

app
	.prepare()
	.then(() => {
		const server = express();
		const PORT = 3000;

		server.use(express.json());
		// server.use(express.urlencoded({ extended: true }));
		// server.use(express.static(path.join(__dirname, '../public')));

		server.get('*', (request, response) => {
			return handle(request, response);
		});

		server.use(handle).listen(PORT, (error) => {
			if (error) {
				throw error;
			}
			console.log(`Ready on http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.error(error.stack);
		process.exit(1);
	});
