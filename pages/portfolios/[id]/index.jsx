import { useRouter } from 'next/router';

import { useGetPostById } from '@/actions';
import BasePage from '@/components/BasePage';

import BaseLayout from '@/components/layouts/BaseLayout';

const Portfolio = () => {
	const router = useRouter();
	// const { data: portfolio, error, loading } = useGetData(
	// 	router.query.id ? `/api/v1/posts/${router.query.id}` : null
	// );
	const { data: portfolio, error, loading } = useGetPostById(router.query.id);

	return (
		<BaseLayout>
			<BasePage>
				{loading && <p>Loading Data...</p>}
				{error && <div className='alert alert-danger'>{error.message}</div>}
				{portfolio && (
					<>
						<h1>I am Portfolio page</h1>
						<p>Id: {portfolio.id}</p>
						<h1>Title: {portfolio.title}</h1>
						<p>Body: {portfolio.body}</p>
					</>
				)}
			</BasePage>
		</BaseLayout>
	);
};

// Portfolio.getInitialProps = async ({ query: { id } }) => {
// 	let post = {};
// 	try {
// 		post = await fetch(
// 			`https://jsonplaceholder.typicode.com/posts/${id}`
// 		).then((response) => response.json());
// 	} catch (error) {
// 		console.error(error);
// 	}
// 	return { portfolio: post };
// };

export default Portfolio;
