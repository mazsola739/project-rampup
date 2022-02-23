import { UserProp } from 'src/types';
import { instance } from '.';

export const getUsers = async () => {
	const userApi = instance();

	const response = await userApi('users');

	const data: UserProp[] = response.data;

	return data;
};

export const getUserById = async (id: string) => {
	const postApi = instance();

	const response = await postApi(`users/${id}`);

	const data: UserProp = response.data;

	return data;
};
