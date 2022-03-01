import { useState } from 'react';
import { useQuery } from 'react-query';
import { getComments } from 'src/api';

import './Comments.scss';

export const Comments = () => {
	const [page, setPage] = useState(1);
	const [limit] = useState(5);

	const { isLoading, data, isPreviousData } = useQuery(
		['comments', page],
		() => getComments(page, limit),
		{
			keepPreviousData: true,
		}
	);

	if (!data) return null;

	return (
		<section className='comments__container'>
			<h2>Comments</h2>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					{data.map((comment) => (
						<div key={comment.id} className='comments__card'>
							<p>{comment.body}</p>
						</div>
					))}
					<div>
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
					</div>
				</>
			)}
		</section>
	);
};
