import React from 'react';
import Header from '../shared/Header';

const BaseLayout = ({ children }) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default BaseLayout;
