import { UserProp } from 'src/types';
import { api } from '.';

export const getUsers = async () => {
	const { data } = await api.get<UserProp[]>('users');

	return data;
};

export const getUsersById = async (id: string) => {
	const { data } = await api.get<UserProp>(`users/${id}`);

	return data;
};
