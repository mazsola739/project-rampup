import { useQuery } from 'react-query';
import { getTodos } from 'src/api';
import { Todo } from 'src/components';

export const Todos = () => {
	const { isLoading, data } = useQuery('todos', getTodos);

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<main>
			{data.map((todo) => (
				<Todo key={todo.id} todo={todo} />
			))}
		</main>
	);
};
