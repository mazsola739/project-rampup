import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getPosts } from 'src/api';
import { Button } from 'src/components';

import './Posts.scss';

export const Posts = () => {
	const { isLoading, data } = useQuery('posts', getPosts);

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<section className='posts-section'>
			<h2>Posts</h2>
			<div className='posts-grid'>
				{data.map((post) => (
					<article key={post.id} className='posts-article'>
						<h3>{post.title}</h3>
						<p>{post.body}</p>
						<Link to={`/posts/${post.id}`}>
							<Button>Click</Button>
						</Link>
					</article>
				))}
			</div>
		</section>
	);
};
