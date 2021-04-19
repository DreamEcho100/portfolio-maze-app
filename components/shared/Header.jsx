import React, { useState } from 'react';
import Link from 'next/link';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	// NavLink,
	// NavbarText,
} from 'reactstrap';

import '../../styles/main.scss';

const BsNavLink = (props) => {
	const { href, title } = props;
	return (
		<Link href={href}>
			<a className='font-size-inherit nav-link port-navbar-link'>{title}</a>
		</Link>
	);
};

const BsNavBrand = () => (
	<NavbarBrand
		className='font-size-inherit navbar-brand port-navbar-brand'
		href='/'
	>
		Mazen Mohamed
	</NavbarBrand>
);

const LoginLink = () => (
	<span className='nav-link port-navbar-link clickable'>Login</span>
);

const LogoutLink = () => (
	<span className='nav-link port-navbar-link clickable'>Logout</span>
);

const Header = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<header className='current-theme main-header'>
			<Navbar
				className='port-navbar port-default absolute'
				color='light'
				light
				expand='md'
			>
				<BsNavBrand />
				<NavbarToggler
					className={`${
						isOpen ? 'navbar-opened' : ''
					} font-size-inherit navbar-toggler no-theme`}
					onClick={toggle}
					children={
						<>
							<div
								// style={{ backgroundColor: 'var(--main-bg-color) !important' }}
								className='navbar-toggler-item no-theme'
							></div>
							<div
								// style={{ background: 'var(--main-font-color) !important' }}
								className='navbar-toggler-item no-theme'
							></div>
							<div
								// style={{ background: 'var(--main-font-color) !important' }}
								className='navbar-toggler-item no-theme'
							></div>
						</>
					}
				/>
				<Collapse isOpen={isOpen} navbar>
					<Nav className='mr-auto' navbar>
						<NavItem className='port-navbar-item'>
							<BsNavLink href='/' title='Home' />
						</NavItem>
						<NavItem className='port-navbar-item'>
							<BsNavLink href='/about' title='About' />
						</NavItem>
						<NavItem className='port-navbar-item'>
							<BsNavLink href='/portfolios' title='Portfolios' />
						</NavItem>
						<NavItem className='port-navbar-item'>
							<BsNavLink href='/blogs' title='Blogs' />
						</NavItem>
						<NavItem className='port-navbar-item'>
							<BsNavLink href='/cv' title='Cv' />
						</NavItem>
					</Nav>
					<Nav navbar>
						<NavItem className='port-navbar-item'>
							<LoginLink />
						</NavItem>
						<NavItem className='port-navbar-item'>
							<LogoutLink />
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</header>
	);
};

export default Header;
