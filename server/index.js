const express = require('express');
// const cors = require('cors');
const next = require('next');

const authService = require('./services/auth');

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

app
	.prepare()
	.then(() => {
		const server = express();
		const PORT = 3000;

		server.use(express.json());
		// server.use(cors());
		// server.use(express.urlencoded({ extended: true }));
		// server.use(express.static(path.join(__dirname, '../public')));

		server.get(
			'/api/v1/secret',
			[
				authService.ha,
				authService.checkJWT,
				authService.verifyHeaderAuthorization,
			],
			(request, response) => {
				console.log(request.user);
				return response.json(secretData);
			}
		);

		server.get(
			'/api/v1/onlysiteowner',
			[
				authService.ha,
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
