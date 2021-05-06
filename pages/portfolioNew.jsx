import React, { useState } from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import PortfolioCreateForm from '@/components/portfolio/PortfolioCreateForm';

import { Row, Col } from 'reactstrap';

import { createPortfolio } from '../actions';

import withAuth from '@/components/hoc/withAuth';
import { Router } from '@/routes';
import moment from 'moment';

const INITIAL_VALUES = {
	title: '',
	company: '',
	location: '',
	position: '',
	description: '',
	startDate: moment(),
	endDate: moment(),
};

const PortfolioNew = ({ auth }) => {
	const [error, setError] = useState(undefined);

	const savePortfolio = (portfolioData, { setSubmitting }) => {
		setSubmitting(true);

		createPortfolio(portfolioData)
			.then((portfolio) => {
				setSubmitting(false);
				if (error !== undefined) {
					setError({ error: undefined });
				}
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
			<BasePage className='portfolio-create-page' title='Create New Portfolio'>
				<Row>
					<Col md='6'>
						<PortfolioCreateForm
							initialValues={INITIAL_VALUES}
							error={error}
							onSubmit={savePortfolio}
						/>
					</Col>
				</Row>
			</BasePage>
		</BaseLayout>
	);
};

export default withAuth()(PortfolioNew);
