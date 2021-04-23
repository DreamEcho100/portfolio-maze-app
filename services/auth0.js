import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

import { getCookieFromReq } from '../helpers/utils';

const CLIENT_ID = process.env.CLIENT_ID;

class Auth0 {
	constructor() {
		this.auth0 = new auth0.WebAuth({
			domain: 'dreamecho100.eu.auth0.com',
			clientID: CLIENT_ID,
			redirectUri: `${process.env.BASE_URL}/callback`,
			responseType: 'token id_token',
			scope: 'openid profile',
		});

		// this.login = this.login.bind(this);
	}

	handleAuthentication = () => {
		return new Promise((resolve, reject) => {
			this.auth0.parseHash((error, authResult) => {
				if (authResult && authResult.accessToken && authResult.idToken) {
					this.setSession(authResult);
					resolve(authResult);
					return authResult;
				} else if (error) {
					reject(error);
					console.error(error);
				}
			});
		});
	};

	setSession = (authResult) => {
		const expiresAt = JSON.stringify(
			authResult.expiresIn * 1000 + new Date().getTime()
		);

		Cookies.set('jwt', authResult.idToken);
	};

	logout = () => {
		Cookies.remove('jwt');

		this.auth0.logout({
			returnTo: process.env.BASE_URL,
			clientID: CLIENT_ID,
		});
	};

	login = () => {
		this.auth0.authorize();
	};

	getJWKS = async () => {
		//  const res = await axios.get('https://dreamecho100.eu.auth0.com/.well-known/jwks.json');
		//  const jwks = res.data;
		const jwks = fetch(
			'https://dreamecho100.eu.auth0.com/.well-known/jwks.json'
		).then((response) => response.json());
		return jwks;
	};

	verifyToken = async (token) => {
		if (token) {
			const decodedToken = jwt.decode(token, { complete: true });

			if (!decodedToken) {
				return undefined;
			}

			const jwks = await this.getJWKS();
			const jwk = jwks.keys[0];

			// BUILD CERTIFICATE
			let cert = jwk.x5c[0];
			cert = cert.match(/.{1,64}/g).join('\n');
			cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;

			if (jwk.kid === decodedToken.header.kid) {
				try {
					const verifiedToken = jwt.verify(token, cert);
					const expiresAt = verifiedToken.exp * 1000;

					return verifiedToken && new Date().getTime() < expiresAt
						? verifiedToken
						: undefined;
				} catch (err) {
					return undefined;
				}
			}
		}

		return undefined;
	};

	clientAuth = async () => {
		const token = Cookies.getJSON('jwt');
		const verifiedToken = await this.verifyToken(token);

		return verifiedToken;
	};

	serverAuth = async (request) => {
		if (request.headers.cookie) {
			const token = getCookieFromReq(request, 'jwt');
			const verifiedToken = await this.verifyToken(token);

			return verifiedToken;
		}

		return undefined;
	};
}

// const auth0Client = new Auth0();

export default new Auth0();
