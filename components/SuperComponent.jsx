import { useState } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';

const SuperComponent = () => {
	const [someVariable, setSomeVariable] = useState('Just some variable');

	const alertName = (title) => {
		alert(title);
	};

	return (
		<BaseLayout>
			<h1> I am Blogs Page </h1>
		</BaseLayout>
	);
};

export default SuperComponent;
