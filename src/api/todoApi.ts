import { TodoProps } from '../types';

export const getTodos = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/todos');
	const data: TodoProps[] = await response.json();

	return data;
};
