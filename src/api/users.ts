import { UserProp } from 'src/types';
import { api } from '.';

export const getUsers = async () => {
	const { data } = await api.get<UserProp[]>('users');

	return data;
};
