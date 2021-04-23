import auth0 from '@/utils/auth0';

export default async (request, response) => {
	try {
		await auth0.handleLogin(request, response);
	} catch (error) {
		console.error(error);
		res.status(error.status || 400).end(error.message);
	}
};
