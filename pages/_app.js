import { Fragment } from 'react';
import auth0 from '@/services/auth0';

import 'bootstrap/dist/css/bootstrap.min.css';

import { DefaultMetaTags } from '@/components/Meta/MetaTagsActions';

const namespace = process.env.NAMESPACE;

const MyApp = ({ Component, pageProps, auth, user }) => {
	return (
		<Fragment>
			<main className='base-page'>
				<DefaultMetaTags />
				<Component {...pageProps} auth={auth} user={user} />
			</main>
		</Fragment>
	);
};

export default MyApp;

MyApp.getInitialProps = async ({ Component, router, ctx }) => {
	let pageProps = {};
	const user = process.browser
		? await auth0.clientAuth()
		: await auth0.serverAuth(ctx.req);

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	const isSiteOwner =
		user && user[`${process.env.NAMESPACE}/roles`] === 'siteOwner';
	const auth = { user, isAuthenticated: !!user, isSiteOwner };

	return { pageProps, auth };
};
