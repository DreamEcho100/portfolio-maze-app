import { Fragment } from 'react';
// import { UserProvider } from '@auth0/nextjs-auth0';

// import '@/styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import auth0 from '@/services/auth0';
import { DefaultMetaTags } from '@/components/Meta/MetaTagsActions';

// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

const MyApp = ({ Component, pageProps, auth, user }) => {
	return (
		<Fragment>
			<main className='base-page'>
				<DefaultMetaTags />
				<Component {...pageProps} auth={auth} user={user} />
			</main>
			{/* <Footer /> */}
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
		user && user[process.env.NAMESPACE + '/role'] === 'siteOwner';
	const auth = { user, isAuthenticated: !!user, isSiteOwner };

	return { pageProps, auth };
};
