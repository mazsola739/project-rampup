import { TodoProp } from 'src/types';
import { instance } from '.';

export const getTodos = async () => {
	const todoApi = instance();

	const response = await todoApi('todos');

	const data: TodoProp[] = response.data;

	return data;
};

export const getTodosById = async (id: string) => {
	const postApi = instance();

	const response = await postApi(`users/${id}/albums`);

	const data: TodoProp = response.data;

	return data;
};
