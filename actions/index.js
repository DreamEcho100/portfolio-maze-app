import useSWR from 'swr';
import Cookies from 'js-cookie';

const baseURL = `${process.env.BASE_URL}/api/v1`;

const setAuthorizationHeader = () => {
	const token = Cookies.getJSON('jwt');

	if (token) {
		return { authorization: `Bearer ${token}` };
	}

	return {};
};

const rejectPromise = (resError) => {
	let error = {};

	if (resError && resError.response && resError.response.data) {
		error = resError.response.data;
	} else {
		error = resError;
	}

	return Promise.reject(error);
};

export const getSecretData = async (req) => {
	// const url = req ? `${process.env.BASE_URL}/api/v1/secret` : '/api/v1/secret';
	const url = `${baseURL}/secret`;

	return await fetch(url, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			...setAuthorizationHeader(),
		},
	}).then((response) => response.json());
};

export const getPortfolios = async () => {
	const url = `${baseURL}/portfolios`;

	return await fetch(url, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			// ...setAuthorizationHeader(),
		},
	}).then((response) => response.json());
};

export const getPortfolioById = async (id) => {
	const url = `${baseURL}/portfolios/${id}`;

	return await fetch(url, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			// ...setAuthorizationHeader(),
		},
	}).then((response) => response.json());
};

export const createPortfolio = async (portfolioData) => {
	const url = `${baseURL}/portfolios/${id}`;

	return await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			...setAuthorizationHeader(),
			body: JSON.stringify(portfolioData),
		},
	})
		.then((response) => response.json())
		.catch((error) => rejectPromise(error));
};

export const updatePortfolio = async (portfolioData) => {
	const url = `${baseURL}/portfolios/${portfolioData._id}`;

	return await fetch(url, {
		method: 'PATCH',
		headers: {
			'Content-type': 'application/json',
			...setAuthorizationHeader(),
			body: JSON.stringify(portfolioData),
		},
	})
		.then((response) => response.json())
		.catch((error) => rejectPromise(error));
};

export const deletePortfolio = async (portfolioId) => {
	const url = `${baseURL}/portfolios/${portfolioId}`;

	return await fetch(url, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json',
			...setAuthorizationHeader(),
		},
	})
		.then((response) => response.json())
		.catch((error) => rejectPromise(error));
};
/**/
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
	const { data = [], error, ...rest } = useSWR('/api/v1/posts', fetcher);
	return { data, error, loading: !data && !error, ...rest };
};

export const useGetPostById = (id) => {
	const { data = {}, error, ...rest } = useSWR(
		id ? `/api/v1/posts/${id}` : null,
		fetcher
	);
	return { data, error, loading: !data && !error, ...rest };
};

// export const createPortfolio = async (portfolioData) => {
// 	return await axiosInstance
// 		.post(`${baseURL}/portfolios`, portfolioData, setAuthHeader())
// 		.then((response) => response.data)
// 		.catch((error) => rejectPromise(error));
// };
