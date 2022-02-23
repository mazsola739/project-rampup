import axios from 'axios';

const instance = (endpoint = '/') => {
	return axios.create({
		timeout: 1000,
		baseURL: `https://jsonplaceholder.typicode.com${endpoint}`,
	});
};

export const api = instance();
