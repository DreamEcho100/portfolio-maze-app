import withAuth from '@/components/hoc/withAuth';

import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { useEffect, useState } from 'react';

const Secret = ({ auth, superSecretValue }) => {
	const [secretData, setSecretData] = useState([]);

	useEffect(async () => {
		const secretData = await fetch('/api/v1/secret').then((response) =>
			response.json()
		);

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
				<h2>{superSecretValue}</h2>
				{displaySecretData()}
			</BasePage>
		</BaseLayout>
	);
};

export default withAuth()(Secret);

Secret.getInitialProps = () => {
	const superSecretValue = 'Super Secret Value';

	return { superSecretValue };
};
