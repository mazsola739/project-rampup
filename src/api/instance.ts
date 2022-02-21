import axios from 'axios';

export const instance = (endpoint = '/') => {
	return axios.create({
		method: 'get',
		timeout: 1000,
		baseURL: `https://jsonplaceholder.typicode.com${endpoint}`,
	});
};
