import React, { useState } from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	CardText,
	CardTitle,
	Button,
} from 'reactstrap';

import PortfolioCardDetail from './PortfolioCardDetail';

const PortfolioCard = ({
	portfolio: { position, location, title, description },
	children,
}) => {
	const { isOpen, setIsOpen } = useState(false);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<span onClick={handleToggle}>
			<PortfolioCardDetail
				toggle={handleToggle}
				portfolio={portfolio}
				isOpen={isOpen}
			/>

			<Card className='portfolio-card'>
				<CardHeader className='portfolio-card-header'>{position}</CardHeader>
				<CardBody>
					<p className='portfolio-card-city'>{location}</p>
					<CardTitle className='portfolio-card-title'>{title}</CardTitle>
					<CardText className='portfolio-card-text'>{description}</CardText>
					<div className='readMore'>{children}</div>
				</CardBody>
			</Card>
		</span>
	);
};

export default PortfolioCard;
