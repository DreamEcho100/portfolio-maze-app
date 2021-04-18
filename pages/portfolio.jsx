import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';

import BaseLayout from '../components/layouts/BaseLayout';

const Portfolio = ({ query }) => {
	const portfolioId = query.id;
	const [portfolio, setPortfolio] = useState({});

	useEffect(async () => {
		try {
			const data = await fetch(
				`https://jsonplaceholder.typicode.com/posts/${portfolioId}`
			).then((response) => response.json());

			setPortfolio(data);
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<BaseLayout>
			<h1> {portfolio.title} </h1>
			<p>Body: {portfolio.body} </p>
			<p>Id: {portfolio.id}</p>
		</BaseLayout>
	);
};

export default withRouter(Portfolio);
