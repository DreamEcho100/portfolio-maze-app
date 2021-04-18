import Link from 'next/link';

import '../../styles/main.scss';

const Header = ({ title, children }) => {
	return (
		<>
			<p> {title} </p>
			{children}
			<p className='customClass'> I am styled P element </p>
			<p className='customClassFromFile'> I am styled P element </p>

			<Link href='/'>
				<a style={{ fontSize: '20px' }}> Home </a>
			</Link>

			<Link href='/about'>
				<a> About </a>
			</Link>

			<Link href='/portfolios'>
				<a> Portfolio </a>
			</Link>

			<Link href='/blogs'>
				<a> Blog </a>
			</Link>

			<Link href='/cv'>
				<a> CV </a>
			</Link>
			<style jsx>
				{`
					a {
						font-size: 2rem;
					}
					.customClass {
						color: red;
					}
				`}
			</style>
		</>
	);
};

export default Header;
