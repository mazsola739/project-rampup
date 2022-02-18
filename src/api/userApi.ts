import { UserProps } from '../types';

export const getUsers = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const data: UserProps[] = await response.json();

	return data;
};
