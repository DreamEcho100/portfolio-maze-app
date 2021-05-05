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
	Dropdown,
	DropdownItem,
	DropdownToggle,
	DropdownMenu,
} from 'reactstrap';

import '../../styles/main.scss';

import auth0 from '@/services/auth0';

const BsNavLink = ({
	LinkTagHref,
	anchorTagTitle,
	addClassesNameToLinkTag,
	defaultLinkTagClassName = 'font-size-inherit nav-link port-navbar-link',
	extraLinkTagAttributes = {},
	addClassesNameToAnchorTag,
	defaultAnchorTagClassName = 'nav-link port-navbar-link',
	extraAnchorTagAttributes = {},
}) => {
	const LinkTagAttributes = {
		className: addClassesNameToLinkTag
			? `${addClassesNameToLinkTag} ${defaultLinkTagClassName}`
			: defaultLinkTagClassName,
		href: LinkTagHref,
		...extraLinkTagAttributes,
	};
	const anchorTagAttributes = {
		className: addClassesNameToAnchorTag
			? `${addClassesNameToAnchorTag} ${defaultAnchorTagClassName}`
			: defaultAnchorTagClassName,
		...extraAnchorTagAttributes,
	};
	return (
		<Link {...LinkTagAttributes}>
			<a {...anchorTagAttributes}>{anchorTagTitle}</a>
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
	// <span className='nav-link port-navbar-link clickable'>Login</span>
	<BsNavLink
		extraAnchorTagAttributes={{
			onClick: auth0.login,
		}}
		LinkTagHref='#' // '/api/v1/login'
		anchorTagTitle='Login'
	/>
);

const LogoutLink = () => (
	// <span className='nav-link port-navbar-link clickable'>Logout</span>
	<BsNavLink
		extraAnchorTagAttributes={{
			onClick: auth0.logout,
		}}
		LinkTagHref='#' // '/api/v1/logout'
		anchorTagTitle='Logout'
	/>
);

const renderBlogMenu = ({ isSiteOwner }) => {
	if (isSiteOwner) {
		return (
			<Dropdown
				className='port-navbar-link port-dropdown-menu'
				nav
				isOpen={this.state.dropdownOpen}
				toggle={this.toggleDropdown}
			>
				<DropdownToggle className='port-dropdown-toggle' nav caret>
					Blog
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem>
						<BsNavLink
							className='port-dropdown-item'
							route='/blogs'
							title='Blogs'
						/>
					</DropdownItem>
					<DropdownItem>
						<BsNavLink
							className='port-dropdown-item'
							route='/blogs/new'
							title='Create a Blog'
						/>
					</DropdownItem>
					<DropdownItem>
						<BsNavLink
							className='port-dropdown-item'
							route='/blogs/dashboard'
							title='Blogs Dashboard'
						/>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		);
	}

	return (
		<NavItem className='port-navbar-item'>
			<BsNavLink route='/blogs' title='Blog' />
		</NavItem>
	);
};

const Header = ({ title, children, isAuthenticated, user, isSiteOwner }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<header className='main-header'>
			<Navbar
				className={`port-navbar port-nav-base absolute ${className}`}
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
							<BsNavLink LinkTagHref='/' anchorTagTitle='Home' />
						</NavItem>
						<NavItem className='port-navbar-item'>
							<BsNavLink LinkTagHref='/about' anchorTagTitle='About' />
						</NavItem>
						<NavItem className='port-navbar-item'>
							<BsNavLink
								LinkTagHref='/portfolios'
								anchorTagTitle='Portfolios'
							/>
						</NavItem>
						<NavItem className='port-navbar-item'>
							<BsNavLink LinkTagHref='/blogs' anchorTagTitle='Blogs' />
						</NavItem>
						{/* {renderBlogMenu(isSiteOwner)} */}
						<NavItem className='port-navbar-item'>
							<BsNavLink LinkTagHref='/cv' anchorTagTitle='Cv' />
						</NavItem>
					</Nav>
					<Nav navbar>
						{/* <NavItem className='port-navbar-item'>
							<LoginLink />
						</NavItem>
						<NavItem className='port-navbar-item'>
							<LogoutLink />
						</NavItem> */}
						<NavItem className='port-navbar-item'>
							{isAuthenticated ? <LogoutLink /> : <LoginLink />}
						</NavItem>
						{isAuthenticated && (
							<NavItem className='port-navbar-item'>
								<span className='font-size-inherit nav-link port-navbar-link clickable'>
									{user.name}
								</span>
							</NavItem>
						)}
					</Nav>
				</Collapse>
			</Navbar>
		</header>
	);
};

export default Header;
