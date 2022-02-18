import { useQuery } from 'react-query';
import { getPosts } from 'src/api';
import { Post } from '../../components';

export const Posts = () => {
	const { isLoading, data } = useQuery('posts', getPosts);

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<main>
			{data.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</main>
	);
};
