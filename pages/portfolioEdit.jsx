import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';

import { updatePortfolio, getPortfolioById } from '@/actions';
import withAuth from '@/components/hoc/withAuth';
import { Router } from '@/routes';

import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import PortfolioCreateForm from '@/components/portfolios/PortfolioCreateForm';

const portfolioEdit = ({ auth, portfolio }) => {
	const [error, setError] = useState(undefined);

	const handleUpdatePortfolio = (portfolioData, { setSubmitting }) => {
		setSubmitting(true);

		updatePortfolio(portfolioData)
			.then((portfolio) => {
				setSubmitting(false);
				setError({ error: undefined });
				Router.pushRoute('/portfolios');
			})
			.catch((err) => {
				const error = err.message || 'Server Error!';
				setSubmitting(false);
				setError({ error });
			});
	};

	return (
		<BaseLayout {...auth}>
			<BasePage className='portfolio-create-page' title='Update Portfolio'>
				<Row>
					<Col md='6'>
						<PortfolioCreateForm
							initialValues={portfolio}
							error={error}
							onSubmit={handleUpdatePortfolio}
						/>
					</Col>
				</Row>
			</BasePage>
		</BaseLayout>
	);
};

portfolioEdit.getInitialProps = async ({ query }) => {
	let portfolio = {};

	try {
		portfolio = await getPortfolioById(query.id);
	} catch (error) {
		console.error(err);
	}

	return { portfolio };
};

export default withAuth('siteOwner')(PortfolioEdit);
