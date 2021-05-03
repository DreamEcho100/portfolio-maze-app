import React from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';

const wrapper = (role) => (Component) => {
	return class withAuth extends React.Component {
		// static async getInitialProps(args) {
		// 	const pageProps =
		// 		(await Component.getInitialProps) &&
		// 		(await Component.getInitialProps(args));

		// 	return { ...pageProps };
		// }

		static async getInitialProps(args) {
			const pageProps =
				(await Component.getInitialProps) &&
				(await Component.getInitialProps(args));

			return { ...pageProps };
		}

		renderProtectedPage() {
			const { isAuthenticated, user } = this.props.auth;
			const userRole = user && user[`${process.env.NAMESPACE}/role`];
			let isAuthorized = false;

			if (role) {
				if (userRole && userRole === role) {
					isAuthorized = true;
				}
			} else {
				isAuthorized = true;
			}

			if (!isAuthenticated) {
				console.log('1');
				return (
					<BaseLayout {...this.props.auth}>
						<BasePage>
							<h1>
								{' '}
								You are not authenticated. Please Login to access this page.{' '}
							</h1>
						</BasePage>
					</BaseLayout>
				);
			} else if (!isAuthorized) {
				console.log('2');
				return (
					<BaseLayout {...this.props.auth}>
						<BasePage>
							<h1>
								{' '}
								You are not authorized. You dont have a permission to visit this
								page{' '}
							</h1>
						</BasePage>
					</BaseLayout>
				);
			} else {
				return <Component {...this.props} />;
			}
		}

		render() {
			return this.renderProtectedPage();
		}
	};
};

export default wrapper;

/*
const wrapper = (role) => (Component) => {
	return class withAuth extends React.Component {
		render() {
			return <Component {...this.props} />;
		}
	};
};

export default wrapper;
*/
