import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';

const PortfolioCardDetail = ({
	isOpen,
	toggle,
	portfolio: {
		title,
		description,
		company,
		position,
		location,
		startDate,
		endDate,
	},
}) => {
	return (
		<div>
			<Modal isOpen={isOpen} toggle={toggle}>
				<ModalHeader toggle={toggle}>{title}</ModalHeader>
				<ModalBody>
					<p>
						<b>Description: </b>
						{description}
					</p>
					<p>
						<b>Company: </b>
						{company}
					</p>
					<p>
						<b>Position: </b>
						{position}
					</p>
					<p>
						<b>Location: </b>
						{location}
					</p>
					<p>
						<b>Start Date: </b>
						{moment(startDate).format('MMMM YYYY')}
					</p>
					<p>
						<b>End Date: </b>
						{endDate
							? moment(endDate).format('MMMM YYYY')
							: 'Still Working Here'}
					</p>
				</ModalBody>
				<ModalFooter>
					<Button color='secondary' onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default PortfolioCardDetail;
