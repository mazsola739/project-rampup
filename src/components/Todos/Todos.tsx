import { useState } from 'react';
import { useQuery } from 'react-query';
import { getTodos } from 'src/api';
import { Todo } from '..';
import './Todos.scss';

export const Todos = () => {
	const [page, setPage] = useState(1);
	const [limit] = useState(4);

	const { isLoading, data, isFetching, isPreviousData } = useQuery(
		['todos', page],
		() => getTodos(page, limit),
		{
			keepPreviousData: true,
		}
	);

	if (!data) return null;

	return (
		<section className='todos__section'>
			<h2>Todos</h2>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					{data.map((todo) => (
						<Todo key={todo.id} todo={todo} />
					))}
					<button
						onClick={() => setPage((old) => Math.max(old - 1, 0))}
						disabled={page === 0}>
						Previous
					</button>
					<button
						onClick={() => {
							if (!isPreviousData) {
								setPage((old) => old + 1);
							}
						}}
						disabled={isPreviousData}>
						Next
					</button>
					{isFetching ? <span> Loading...</span> : null}
				</>
			)}
		</section>
	);
};
