import { useQuery } from 'react-query';
import { getTodos } from 'src/api';
import { Todo } from '..';
import './Todos.scss';

export const Todos = () => {
	const { isLoading, data } = useQuery('todos', getTodos);

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<section className='todos-section'>
			<h2>Todos</h2>
			{data.map((todo) => (
				<Todo todo={todo} />
			))}
		</section>
	);
};
