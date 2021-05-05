const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const config = require('../config/index');

// Middleware
exports.checkJWT = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 50,
		jwksUri: `https://${process.env.AUTH0_ISSUER_BASE_URL}/.well-known/jwks.json`,
	}),
	audience: process.env.AUTH0_CLIENT_ID,
	issuer: `https://${process.env.AUTH0_ISSUER_BASE_URL}/`,
	algorithms: ['RS256'],
});

exports.verifyHeaderAuthorization = (error, request, response, next) => {
	if (error.name === 'UnauthorizedError') {
		response
			.status(401)
			.send({ title: 'Unauthorized', detail: 'Unauthorized Access!' });
	} else {
		next();
	}
};

exports.ha = (request, response, next) => {
	request.headers.authorization =
		'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ii0wVjBuVjBMbjVHdUhvR2NPTDBGYSJ9.eyJodHRwOi8vbG9jYWxob3N0OjMwMDAvcm9sZXMiOiJzaXRlT3duZXIiLCJnaXZlbl9uYW1lIjoiRHJlYW0iLCJmYW1pbHlfbmFtZSI6IkVjaG8iLCJuaWNrbmFtZSI6Im1hemU2NTcyMTk4IiwibmFtZSI6IkRyZWFtIEVjaG8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2lieXZZV2RsdXlPZ21mWTRKemt0bEpMc1YxWE9CQlB3b0p5VmZlPXM5Ni1jIiwibG9jYWxlIjoiYXIiLCJ1cGRhdGVkX2F0IjoiMjAyMS0wNS0wNFQxODoyOToxNC44MzVaIiwiaXNzIjoiaHR0cHM6Ly9kcmVhbWVjaG8xMDAuZXUuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTEwMjQ0OTYyOTk2MDA1MDY2NDkxIiwiYXVkIjoidG1ONHdJMjgzNDQ0UjhKMnZtaFRJVGQ0NHc0Y2pHVWkiLCJpYXQiOjE2MjAxNTI5NTQsImV4cCI6MTYyMDE4ODk1NCwiYXRfaGFzaCI6Ik5qUnBkV1htai1YaFpBWGdQdHpoY2ciLCJub25jZSI6InNFSWllXzZ6WX5hNXU1bVBaLUEwTTdyUmIxZW1adjgxIn0.R-knAhyKZ3uRZFigyqm5XA4F9wlGCLWXiL0um6XVWVAAFap51V8-rybImTEw2uWQi2gtw-hEPfP0Y-eR8knTbdSQxdzOVq_ljj2XBY6WSUMDsvzaY9VoI7aJ3e0ET2y0AZLDrmE40IoTqQ6Sb8q8t0f-uMqYojadkUfmbDz0lIbHpJZoB0ujLA4UNCaZUAFo51TtGEszQG1fzgtj-03B67K9CTzVq4IDqlKQJ_CBpfkrPBQzeolFTyphrpn7NAHq_Ghzo5WAZ4-UY3hUaXyjphZ0dMB6gF8mIqbtY9XkaNyQC_e1Sb9WUJgBl9nPj-w5MRHAJJ-c4vF-b2FoOaXEdg';
	next();
};

exports.checkRole = (role) => (req, res, next) => {
	const user = req.user;
	const config =
		process.env.NODE_ENV === 'production'
			? {
					DB_URI: process.env.DB_URI,
					NAMESPACE: process.env.NAMESPACE_PROD,
			  }
			: {
					DB_URI: process.env.DB_URI,
					NAMESPACE: process.env.NAMESPACE_DEV,
			  };

	console.log(user);
	console.log(req.headers);
	console.log(role);
	console.log(`${config.NAMESPACE}/roles`);

	if (
		user &&
		user[`${config.NAMESPACE}/roles`] &&
		user[`${config.NAMESPACE}/roles`] === role
	) {
		next();
	} else {
		return res.status(401).send({
			title: 'Not Authorized',
			detail: 'You are not authorized to access this data',
		});
	}
};

/*
exports.checkRole = (role) => (request, response, next) => {
	const user = request.user;
	const config =
		process.env.NODE_ENV === 'production'
			? {
					DB_URI: process.env.DB_URI,
					NAMESPACE: process.env.NAMESPACE_PROD,
			  }
			: {
					DB_URI: process.env.DB_URI,
					NAMESPACE: process.env.NAMESPACE_DEV,
			  };

	console.log(user);
	console.log(`${config.NAMESPACE}/roles`);
	// console.log(user[`${config.NAMESPACE}/roles`]);
	// console.log(user[`${config.NAMESPACE}/roles`] === role);

	if (
		user &&
		user[`${config.NAMESPACE}/roles`] &&
		user[`${config.NAMESPACE}/roles`] === role
	) {
		next();
	} else {
		return response.status(401).send({
			title: 'Not Authorized',
			detail: 'You are not authorized to access this data.',
		});
	}
};
*/

/*
// Middleware
exports.checkJWT = (request, response, next) => {
	const isValidToken = true;

	if (isValidToken) {
		request.user = {
			name: 'Filip',
			lastName: 'Jerga',
		};
		next();
	} else {
		return response.status(401).send({
			title: 'Not Aithorized!',
			detail: 'Please login in order to get a data.',
		});
	}
};
*/

/*
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const config = require('../config');
const NAMESPACE = config.NAMESPACE;

// MIDDLEWARE
exports.checkJWT = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 50,
		jwksUri: 'https://eincode.eu.auth0.com/.well-known/jwks.json',
	}),
	audience: 'NfvS9nw81ItncHJKPHCaAvwD9ChNWYn3',
	issuer: 'https://eincode.eu.auth0.com/',
	algorithms: ['RS256'],
});

exports.checkRole = (role) => (req, res, next) => {
	const user = req.user;

	if (user && user[NAMESPACE + '/role'] && user[NAMESPACE + '/role'] === role) {
		next();
	} else {
		return res.status(401).send({
			title: 'Not Authorized',
			detail: 'You are not authorized to access this data',
		});
	}
};
*/
