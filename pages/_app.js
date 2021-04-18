import { Fragment } from 'react';

import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
import { DefaultMetaTags } from '../components/Meta/MetaTagsActions';

const MyApp = ({ Component, pageProps }) => {
	// debugger;
	return (
		<Fragment>
			{/* <Navbar /> */}
			<main className='base-page'>
				<DefaultMetaTags />
				<Component {...pageProps} />
			</main>
			{/* <Footer /> */}
		</Fragment>
	);
};

export default MyApp;
