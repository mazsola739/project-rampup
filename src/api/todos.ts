import { TodoProp } from 'src/types';
import { instance } from '.';

export const getTodos = async () => {
	const todoApi = instance();

	const response = await todoApi('todos');

	const data: TodoProp[] = response.data;

	return data;
};
