import Head from 'next/head';
import styles from '../styles/Home.module.css';

import BaseLayout from '../components/layouts/BaseLayout';
import SuperComponent from '../components/SuperComponent';
import { useEffect, useState } from 'react';

export default function Home() {
	const [userData, setUserData] = useState({});
	const [title, setTitle] = useState('I am Index Page');
	const [initialData, setInitialData] = useState([1, 2, 3, 4]);

	const updateTitle = () => {
		setTitle('I am Updated Index Page');
	};

	useEffect(async () => {
		try {
			const data = await fetch(
				'https://jsonplaceholder.typicode.com/todos/1'
			).then((response) => response.json());

			setUserData(data);
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<BaseLayout>
			<h1 className='fromPage'> I am Index Page from Class Component</h1>
			<h2>{title}</h2>
			<h2>{userData.title}</h2>
			<button onClick={updateTitle}> Change Title </button>
		</BaseLayout>
	);
}
