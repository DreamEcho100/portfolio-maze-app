import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Alert } from 'reactstrap';
import PortInput from '@/components/form/PortInput';
import PortDate from '@/components/form/PortDate';

import moment from 'moment';

const validateInputs = (values) => {
	let errors = {};

	Object.entries(values).forEach(([key, value]) => {
		if (!values[key] && key !== 'endDate') {
			errors[key] = `Field ${key} is required!`;
		}
	});

	const startDate = moment(values.startDate);
	const endDate = moment(values.endDate);

	if (startDate && endDate && endDate.isBefore(startDate)) {
		errors.endDate = 'End Date cannot be before start date!!!';
	}

	return errors;
	/*
		let errors = {};
		if (!values.email) {
			errors.email = 'Required';
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
		) {
			errors.email = 'Invalid email address';
		}
		return errors;
	*/
};

const INITIAL_VALUES = {
	title: '',
	company: '',
	location: '',
	position: '',
	description: '',
	startDate: '',
	endDate: '',
};

const PortfolioCreateForm = ({ initialValues, onSubmit, error }) => (
	<div>
		<Formik
			initialValues={INITIAL_VALUES}
			validate={validateInputs}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}, 400);
			}}
		>
			{({ isSubmitting }) => (
				<Form>
					<Field type='text' name='title' label='Title' component={PortInput} />
					<Field
						type='text'
						name='company'
						label='Company'
						component={PortInput}
					/>
					<Field
						type='text'
						name='location'
						label='Location'
						component={PortInput}
					/>
					<Field
						type='text'
						name='position'
						label='Position'
						component={PortInput}
					/>
					<Field
						type='textarea'
						name='description'
						label='Description'
						component={PortInput}
					/>

					<Field
						name='startDate'
						label='Start Date'
						initialDate={initialValues.startDate}
						component={PortDate}
					/>

					<Field
						name='endDate'
						label='End Date'
						canBeDisabled={true}
						initialDate={initialValues.endDate}
						component={PortDate}
					/>
					{error && <Alert color='danger'>{error}</Alert>}
					<Button
						color='success'
						size='lg'
						type='submit'
						disabled={isSubmitting}
					>
						Create
					</Button>
				</Form>
			)}
		</Formik>
	</div>
);

export default PortfolioCreateForm;
