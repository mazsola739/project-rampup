import { TodoProp } from 'src/types';
import { api } from '.';

export const getTodos = async (page: number = 1, limit: number = 4) => {
	const { data } = await api.get<TodoProp[]>(
		`todos/?_page=${page}&_limit=${limit}`
	);

	return data;
};

export const getTodosById = async (id: string) => {
	const { data } = await api.get<TodoProp>(`todos/${id}`);

	return data;
};

export const getTodosByUserId = async (id: string) => {
	const { data } = await api.get<TodoProp[]>(`users/${id}/todos`);

	return data;
};
