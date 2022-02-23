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

export const getTodoById = async (id: string) => {
	const postApi = instance();

	const response = await postApi(`users/${id}/albums`);

	const data: TodoProp = response.data;

	return data;
};
