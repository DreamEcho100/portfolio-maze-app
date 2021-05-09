import { Fragment } from 'react';
import Link from 'next/link';
import { Col, Row, Button } from 'reactstrap';

import {
	AddToHead,
	DescriptionMetaTag,
	handleDescription,
	KeywordsMetaTag,
	handleKeywords,
	TitleMetaTag,
	handleTitle,
} from '@/components/Meta/MetaTagsActions';
import { Router } from '@/routes';
import { getPortfolios, deletePortfolio } from '@/actions';

import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import PortfolioCard from '@/components/portfolio/PortfolioCard';

const Portfolios = ({ auth, portfolios }) => {
	const navigateToEdit = (portfolioId, e) => {
		e.stopPropagation();
		Router.pushRoute(`/portfolios/${portfolioId}/edit`);
	};

	const displayDeleteWarning = (portfolioId, e) => {
		e.stopPropagation();
		const isConfirm = confirm(
			'Are you sure you want to delete this portfolio???'
		);

		if (isConfirm) {
			handleDeletePortfolio(portfolioId);
		}
	};

	const handleDeletePortfolio = (portfolioId) => {
		deletePortfolio(portfolioId)
			.then(() => {
				Router.pushRoute('/portfolios');
			})
			.catch((err) => console.error(err));
	};

	const renderPortfolios = (portfolios = []) => {
		console.log(portfolios);
		const { isAuthenticated, isSiteOwner } = auth;

		return portfolios.map((portfolio, index) => {
			return (
				<Col key={index} md='4'>
					<PortfolioCard portfolio={portfolio}>
						{isAuthenticated && isSiteOwner && (
							<React.Fragment>
								<Button
									onClick={(e) => navigateToEdit(portfolio._id, e)}
									color='warning'
								>
									Edit
								</Button>{' '}
								<Button
									onClick={(e) => displayDeleteWarning(portfolio._id, e)}
									color='danger'
								>
									Delete
								</Button>
							</React.Fragment>
						)}
					</PortfolioCard>
				</Col>
			);
		});
	};

	return (
		<BaseLayout {...auth}>
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
			<BasePage className='portfolio-page'>
				{auth.isAuthenticated && isSiteOwner && (
					<Button
						onClick={() => Router.pushRoute('/portfolioNew')}
						color='success'
						className='create-port-btn'
					>
						Create Portfolio
					</Button>
				)}
				<Row>{renderPortfolios(portfolios)}</Row>
			</BasePage>
		</BaseLayout>
	);
};

Portfolios.getInitialProps = async () => {
	let portfolios = [];

	try {
		portfolios = await getPortfolios();
	} catch (err) {
		console.error(err);
	}

	return { portfolios };
};

export default Portfolios;
