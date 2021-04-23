import Link from 'next/link';

import {
	AddToHead,
	DescriptionMetaTag,
	handleDescription,
	KeywordsMetaTag,
	handleKeywords,
	TitleMetaTag,
	handleTitle,
} from '@/components/Meta/MetaTagsActions';
import { useGetPosts } from '@/actions/index.js';

import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';

const Portfolios = () => {
	const { data, error, loading } = useGetPosts();

	const renderPosts = (posts) => {
		return posts.map((post, index) => {
			return (
				<li key={index}>
					{/* <Link route={`/portfolio/${post.id}`}> */}
					<Link href='/portfolios/[id]' as={`/portfolios/${post.id}`}>
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
			<AddToHead
				elements={[
					TitleMetaTag({
						title: handleTitle({
							addFirst: 'Portfolios Page - ',
						}),
					}),
					KeywordsMetaTag({
						keywords: handleKeywords({
							addFirst: ['Portfolios Page'],
						}),
					}),
					DescriptionMetaTag({
						description: handleDescription({
							addFirst: 'Portfolios Page, ',
						}),
					}),
				]}
			/>
			<BasePage>
				<h1> I am Portfolios Page </h1>
				{loading && <p>Loading data...</p>}
				{data && <ul>{renderPosts(data)}</ul>}
				{error && <div className='alert alert-danger'>{error.message}</div>}
			</BasePage>
		</BaseLayout>
	);
};

export default Portfolios;
