import axios from 'axios';

export const apiService = (endpoint = '/') => {
	return axios.create({
		baseURL: `https://jsonplaceholder.typicode.com${endpoint}`,
	});
};
