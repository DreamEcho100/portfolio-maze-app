import React from 'react';

import Header from '@/components/shared/Header';

const BaseLayout = ({ className, children, isAuthenticated, user }) => {
	return (
		<div className='layout-container'>
			<Header isAuthenticated={isAuthenticated} user={user} />
			<main
				style={{
					paddingTop: '5rem',
					minHeight: '100vh',
				}}
				className={`cover ${className}`}
			>
				<div className='wrapper'>{children}</div>
			</main>
		</div>
	);
};

export default BaseLayout;
