const express = require('express');
// const cors = require('cors');
const next = require('next');
const mongoose = require('mongoose');

const authService = require('./services/auth');
const routes = require('../routes');
const config =
	process.env.NODE_ENV === 'production'
		? {
				DB_URI: process.env.DB_URI,
				NAMESPACE: process.env.NAMESPACE_PROD,
		  }
		: {
				DB_URI: process.env.DB_URI,
				NAMESPACE: process.env.NAMESPACE_DEV,
		  }; // require('./config');

const Book = require('./models/book');

const bookRoutes = require('./routes/book');
const portfolioRoutes = require('./routes/portfolio');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler(app);

const secretData = [
	{
		title: 'SecretData 1',
		description: 'Plans how to build spaceship',
	},
	{
		title: 'SecretData 2',
		description: 'My secret passwords',
	},
];

mongoose
	.connect(config.DB_URI, { useNewUrlParser: true })
	.then(() => console.log('Database Connected!'))
	.catch((err) => console.error(err));

// async () => (await mongoose.connect(config.DB_URI, { useNewUrlParser: true}))();

app
	.prepare()
	.then(() => {
		const server = express();
		const PORT = 3000;

		server.use(express.json());
		// server.use(cors());
		// server.use(express.urlencoded({ extended: true }));
		// server.use(express.static(path.join(__dirname, '../public')));

		server.use('/api/v1/books', bookRoutes);
		server.use('/api/v1/portfolios', portfoliosRoutes);

		server.get(
			'/api/v1/secret',
			[authService.checkJWT, authService.verifyHeaderAuthorization],
			(request, response) => {
				console.log(request.user);
				return response.json(secretData);
			}
		);

		server.get(
			'/api/v1/onlysiteowner',
			[
				authService.checkJWT,
				authService.verifyHeaderAuthorization,
				authService.checkRole('siteOwner'),
			],
			(request, response) => {
				return response.json(secretData);
			}
		);

		server.get(
			'*',
			authService.verifyHeaderAuthorization,
			(request, response) => {
				return handle(request, response);
			}
		);

		// server.use(authService.verifyHeaderAuthorization);

		// server.use(authService.vh);

		// server.use((error, request, response, next) => {
		// 	if (error.name === 'UnauthorizedError') {
		// 		response
		// 			.status(401)
		// 			.send({ title: 'Unauthorized', detail: 'Unauthorized Access!' });
		// 	} else {
		// 		console.log(request.headers.authorization);
		// 		next();
		// 	}
		// });

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
