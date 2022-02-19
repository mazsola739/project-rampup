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
			<h1>Photos</h1>
			{data.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</section>
	);
};
