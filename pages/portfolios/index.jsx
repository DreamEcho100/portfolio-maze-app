import Link from 'next/link';
import {
	Col,
	Row,
	Card,
	CardHeader,
	CardBody,
	CardText,
	CardTitle,
} from 'reactstrap';

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
import { Fragment } from 'react';

const Portfolios = () => {
	const { data, error, loading } = useGetPosts();

	const renderPosts = (posts) => {
		return posts.map((post, index) => {
			return (
				// <li key={index}>
				// 	{/* <Link route={`/portfolio/${post.id}`}> */}
				// 	<Link href='/portfolios/[id]' as={`/portfolios/${post.id}`}>
				// 		<a href='#' style={{ fontSize: '2rem' }}>
				// 			{' '}
				// 			{post.title}{' '}
				// 		</a>
				// 	</Link>
				// </li>
				<Col md='4'>
					<Fragment key={index}>
						<span>
							<Card className='portfolio-card'>
								<CardHeader className='portfolio-card-header'>
									Some Position {index}
								</CardHeader>
								<CardBody>
									<p className='portfolio-card-city'> Some Location {index} </p>
									<CardTitle className='portfolio-card-title'>
										Some Company {index}
									</CardTitle>
									<CardText className='portfolio-card-text'>
										Some Description {index}
									</CardText>
									<div className='readMore'> </div>
								</CardBody>
							</Card>
						</span>
					</Fragment>
				</Col>
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
				<Row>
					{loading && <p>Loading data...</p>}
					{data && <ul>{renderPosts(data)}</ul>}
					{error && <div className='alert alert-danger'>{error.message}</div>}
				</Row>
			</BasePage>
		</BaseLayout>
	);
};

export default Portfolios;
