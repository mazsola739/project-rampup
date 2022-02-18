import { TodoProps } from './Todo.types';

export const Todo = ({ todo }: TodoProps) => {
	const { title } = todo;

	return <p>{title}</p>;
};
