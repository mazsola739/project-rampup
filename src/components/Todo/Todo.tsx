import { TodoProps } from './Todo.types';

import './Todo.scss';

export const Todo = ({ todo }: TodoProps) => {
	const { title } = todo;

	return (
		<article className='todo-article'>
			<h1>{title}</h1>
		</article>
	);
};
