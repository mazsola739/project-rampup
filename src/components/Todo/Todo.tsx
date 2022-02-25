import { TodoProps } from './Todo.types';
import { UserName } from '..';

import './Todo.scss';

export const Todo = ({ todo }: TodoProps) => {
	const { userId, completed, title } = todo;

	return (
		<article className='todo-article'>
			<h3>{title}</h3>
			<UserName id={userId} />
			<p>Completed? {completed ? 'YES' : 'NO'}</p>
		</article>
	);
};
