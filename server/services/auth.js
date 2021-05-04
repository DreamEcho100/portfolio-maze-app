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
