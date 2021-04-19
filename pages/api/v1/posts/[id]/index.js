export default async (request, response) => {
	try {
		const post = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${request.query.id}`
		).then((response) => response.json());
		response.status(200).json(post);
	} catch (e) {
		console.error(e);
		response.status(error.status || 400).end({ message: 'Api error' });
	}
};
