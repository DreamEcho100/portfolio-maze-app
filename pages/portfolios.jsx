import Link from 'next/link';
import { useEffect, useState } from 'react';

import BaseLayout from '../components/layouts/BaseLayout';

const Portfolios = () => {
	const [posts, setPosts] = useState([]);

	useEffect(async () => {
		try {
			await fetch('https://jsonplaceholder.typicode.com/posts')
				.then((response) => response.json())
				.then((data) => setPosts(data.splice(0, 10)));
		} catch (error) {
			console.error(error);
		}
	}, []);

	const renderPosts = (posts) => {
		return posts.map((post, index) => {
			return (
				<li key={index}>
					{/* <Link route={`/portfolio/${post.id}`}> */}
					<Link href={`/portfolio/${post.id}`} as={`/portfolio/${post.id}`}>
						<a href='#' style={{ fontSize: '2rem' }}>
							{' '}
							{post.title}{' '}
						</a>
					</Link>
				</li>
			);
		});
	};

	return (
		<BaseLayout>
			<h1> I am Portfolios Page </h1>
			<ul>{renderPosts(posts)}</ul>
		</BaseLayout>
	);
};

export default Portfolios;
