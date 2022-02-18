import { TodoProp } from '../types';

export const getTodos = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/todos');
	const data: TodoProp[] = await response.json();

	return data;
};
