import { UserProp } from '../types';

export const getUsers = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const data: UserProp[] = await response.json();

	return data;
};
