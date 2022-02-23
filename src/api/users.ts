import { UserProp } from 'src/types';
import { api } from '.';

export const getUsers = async () => {
	const { data } = await api.get<UserProp[]>('users');

	return data;
};

export const getUserById = async (id: string) => {
	const postApi = instance();

	const response = await postApi(`users/${id}`);

	const data: UserProp = response.data;

	return data;
};
