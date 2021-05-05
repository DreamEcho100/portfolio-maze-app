// import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Typed from 'react-typed';

import {
	AddToHead,
	DescriptionMetaTag,
	handleDescription,
	KeywordsMetaTag,
	handleKeywords,
	TitleMetaTag,
	handleTitle,
} from '@/components/Meta/MetaTagsActions';

import BaseLayout from '@/components/layouts/BaseLayout';
// import BasePage from '@/components/BasePage';
// import SuperComponent from '@/components/SuperComponent';

// import BackgroundIndexImage from '../public/images/background-index.png';
// import Section1Image from '../public/images/section-1.png';
const BackgroundIndexImage = '';
const Section1Image = '';
const Home = ({ auth }) => {
	const [userData, setUserData] = useState({});
	const [title, setTitle] = useState('I am Index Page');
	const [initialData, setInitialData] = useState([1, 2, 3, 4]);

	const roles = [
		'Developer',
		'Tech Lover',
		'Team Player',
		'HTML&CSS',
		'React.js',
		'Node.js',
	];

	useEffect(async () => {
		try {
			// const data = await fetch(
			// 	'https://jsonplaceholder.typicode.com/todos/1'
			// ).then((response) => response.json());
			// setUserData(data);
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<BaseLayout className='cover' {...auth} headerType="index">
			<AddToHead
				elements={[
					TitleMetaTag({
						title: handleTitle({
							addFirst: 'Home Page - ',
						}),
					}),
					KeywordsMetaTag({
						keywords: handleKeywords({
							addFirst: ['Home Page'],
						}),
					}),
					DescriptionMetaTag({
						description: handleDescription({
							addFirst: 'Home Page, ',
						}),
					}),
				]}
			/>
			<div className='main-section'>
				<div className='background-image'>
					<img src='images/background-index.png' />
				</div>
				<Container>
					<Row>
						<Col md='6'>
							<div className='hero-section'>
								<div className={`flipper`}>
									<div className='back'>
										<div className='hero-section-content'>
											<h2> Full Stack Web Developer </h2>
											<div className='hero-section-content-intro'>
												Have a look at my portfolio and job history.
											</div>
										</div>
										<img className='image' src='images/section-1.jpg' />
										<div className='shadow-custom'>
											<div className='shadow-inner'> </div>
										</div>
									</div>
								</div>
							</div>
						</Col>
						<Col md='6' className='hero-welcome-wrapper'>
							<div className='hero-welcome-text'>
								<h1>
									{auth.isAuthenticated && <strong>{auth.user.name}</strong>}{' '}
									Welcome to the portfolio website of Filip Jerga. Get informed,
									collaborate and discover projects I was working on through the
									years!
								</h1>
							</div>
							<em>
								<Typed
									loop
									typeSpeed={70}
									backSpeed={70}
									strings={roles}
									backDelay={1000}
									loopCount={0}
									showCursor
									className='self-typed'
									cursorChar='|'
								/>
							</em>
							<div className='hero-welcome-bio'>
								<h1>Let's take a look on my work.</h1>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		</BaseLayout>
	);
};

export default Home;
