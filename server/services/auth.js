const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

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

exports.ha = (request, response, next) => {
	request.headers.authorization =
		'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ii0wVjBuVjBMbjVHdUhvR2NPTDBGYSJ9.eyJnaXZlbl9uYW1lIjoiRHJlYW0iLCJmYW1pbHlfbmFtZSI6IkVjaG8iLCJuaWNrbmFtZSI6Im1hemU2NTcyMTk4IiwibmFtZSI6IkRyZWFtIEVjaG8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2lieXZZV2RsdXlPZ21mWTRKemt0bEpMc1YxWE9CQlB3b0p5VmZlPXM5Ni1jIiwibG9jYWxlIjoiYXIiLCJ1cGRhdGVkX2F0IjoiMjAyMS0wNC0yOFQyMzowMzoyNC43OThaIiwiaXNzIjoiaHR0cHM6Ly9kcmVhbWVjaG8xMDAuZXUuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTEwMjQ0OTYyOTk2MDA1MDY2NDkxIiwiYXVkIjoidG1ONHdJMjgzNDQ0UjhKMnZtaFRJVGQ0NHc0Y2pHVWkiLCJpYXQiOjE2MTk2NTEwMDQsImV4cCI6MTYxOTY4NzAwNCwiYXRfaGFzaCI6IjFRd3FlSWIzV1RNUmFyeGxGR1RCWXciLCJub25jZSI6IlR-YzFJUVB1VkVPM0ZSWVk2MXRMcmRyU2ZPc35IZ0EyIn0.qoYdD1RJwWUR1o1wGX9nTwfl-7M9E-fliEebtqueoAS4RcXclAYqymU7TiFsYDjInQhofZZYLpPMrqaVwE2oYBVV-WcSKM-3fU4wX93w95N64ZbRBad8pxLNBBG7AbctSp3c8TPPlrDgf5dwSlId0hujD-PPWHtfKfLcWKmnB1Nb2HTgICI_w652jPN7nKSHVKMEG-r9e1V8-lopzmjjVl4ovTlHlpBiE0jShfMoMeoslzuNa6TMmXnTFwU_ZRmUeJZ-GrgORyHZ65kI_DDRTjteRVvIdSHc3W7uHlBN9AAFoz8wtsWd-Rch0Eq2uE-Q6mTT0UEzKQ4DKoPUuU6yHQ';
	next();
};

exports.verifyHeaderAuthorization = (error, request, response, next) => {
	if (error.name === 'UnauthorizedError') {
		response
			.status(401)
			.send({ title: 'Unauthorized', detail: 'Unauthorized Access!' });
	} else {
		next();
	}
};

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
