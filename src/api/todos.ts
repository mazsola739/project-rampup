import { TodoProp } from 'src/types';
import { api } from '.';

export const getTodos = async () => {
	const { data } = await api.get<TodoProp[]>('todos');

	return data;
};

export const getTodosById = async (id: string) => {
	const { data } = await api.get<TodoProp>(`users/${id}/albums`);

	return data;
};
