export default async (request, response) => {
	try {
		const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
			.then((response) => response.json())
			.then((data) => data.splice(0, 10));
		response.status(200).json(posts);
	} catch (e) {
		console.error(e);
		response.status(error.status || 400).end({ message: 'Api error' });
	}
};
