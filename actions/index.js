/*
import { useEffect, useState } from 'react';

export const useGetData = (url) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);
	useEffect(async () => {
		async function getData() {
			try {
				const result = await fetch(url).then((response) => response.json());
				setData(result);
			} catch (error) {
				setError(error);
			}

			setLoading(false);
		}

		url && getData();
	}, []);

	return { data, error, loading };
};
*/
import useSWR from 'swr';

const fetcher = (url) =>
	fetch(url).then(async (response) => {
		const result = await response.json();

		if (response.status !== 200) {
			return Promise.reject(result);
		} else {
			return result;
		}
	});

export const useGetPosts = () => {
	const { data, error, ...rest } = useSWR('/api/v1/posts', fetcher);
	return { data, error, loading: !data && !error, ...rest };
};

export const useGetPostById = (id) => {
	const { data, error, ...rest } = useSWR(
		id ? `/api/v1/posts/${id}` : null,
		fetcher
	);
	return { data, error, loading: !data && !error, ...rest };
};
