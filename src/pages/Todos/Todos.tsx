import { useQuery } from 'react-query';
import { getTodos } from 'src/api';
import { Todo } from 'src/components';

import './Todos.scss';

export const Todos = () => {
	const { isLoading, data } = useQuery('todos', getTodos);

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<section className='todos-section'>
			<h1>Todos</h1>
			{data.map((todo) => (
				<Todo key={todo.id} todo={todo} />
			))}
		</section>
	);
};
