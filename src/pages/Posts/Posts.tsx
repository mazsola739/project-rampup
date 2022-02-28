import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getPosts } from 'src/api';
import { Button, Comments } from 'src/components';

import './Posts.scss';

export const Posts = () => {
	const [page, setPage] = useState(1);
	const [limit] = useState(6);

	const { isLoading, data, isFetching, isPreviousData } = useQuery(
		['posts', page],
		() => getPosts(page, limit),
		{
			keepPreviousData: true,
		}
	);

	if (!data) return null;

	return (
		<div className='posts__container'>
			<section>
				<h2>Posts</h2>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<div className='posts__grid'>
						{data.map((post) => (
							<div key={post.id} className='posts__card'>
								<h3>{post.title}</h3>
								<p>{post.body}</p>
								<div className='posts__button'>
									<Link to={`/posts/${post.id}`}>
										<Button>Click</Button>
									</Link>
								</div>
							</div>
						))}{' '}
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
					</div>
				)}
			</section>
			<aside>
				<Comments />
			</aside>
		</div>
	);
};
