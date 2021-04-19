import React from 'react';
// import Header from '../shared/Header';
import Header from '@/components/shared/Header';

const BaseLayout = ({ className, children }) => {
	return (
		<div className='layout-container'>
			<Header />
			<main
				style={{
					paddingTop: '5rem',
				}}
				className={`cover ${className}`}
			>
				<div className='wrapper'>{children}</div>
			</main>
		</div>
	);
};

export default BaseLayout;
