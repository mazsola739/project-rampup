import { TodoProps } from './Todo.types';

export const Todo = ({ todo }: TodoProps) => {
	const { title } = todo;

	return (
		<section>
			<h1>{title}</h1>
		</section>
	);
};
