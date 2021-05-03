import withAuth from '@/components/hoc/withAuth';

import { getSecretData } from '../actions/index';

import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { useEffect, useState } from 'react';

const Secret = ({ auth, superSecretValue, anotherSecretData }) => {
	const [secretData, setSecretData] = useState([]);

	useEffect(async () => {
		const secretData = /*anotherSecretData
			? anotherSecretData
			: */ await getSecretData();

		setSecretData(secretData);
	}, []);

	const displaySecretData = () => {
		if (secretData && secretData.length > 0) {
			return secretData.map((data, index) => (
				<div key={index}>
					<p> {data.title} </p>
					<p> {data.description} </p>
				</div>
			));
		}
	};

	return (
		<BaseLayout {...auth}>
			<BasePage>
				<h1>I am Secret Page</h1>
				<p>Secret Content Here</p>
				{displaySecretData()}
			</BasePage>
		</BaseLayout>
	);
};

export default withAuth()(Secret);

Secret.getInitialProps = async ({ req }) => {
	const superSecretValue = 'Super Secret Value';

	const anotherSecretData = await getSecretData(req);

	return { anotherSecretData };
};
