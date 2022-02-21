import { useQuery } from 'react-query';
import { getPosts } from 'src/api';
import { Post } from 'src/components';

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
					<Post key={post.id} post={post} />
				))}
			</div>
		</section>
	);
};
