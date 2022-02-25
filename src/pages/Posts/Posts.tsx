import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getPosts } from 'src/api';
import { Button, Comments } from 'src/components';

import './Posts.scss';

export const Posts = () => {
	const { isLoading, data } = useQuery('posts', getPosts);

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<div className='posts-container'>
			<section>
				<h2>Posts</h2>
				<div className='posts-grid'>
					{data.map((post) => (
						<div key={post.id} className='posts-card'>
							<h3>{post.title}</h3>
							<p>{post.body}</p>
							<div className='posts-button'>
								<Link to={`/posts/${post.id}`}>
									<Button>Click</Button>
								</Link>
							</div>
						</div>
					))}
				</div>
			</section>
			<aside>
				<Comments />
			</aside>
		</div>
	);
};
