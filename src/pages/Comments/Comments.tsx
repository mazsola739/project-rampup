import { useQuery } from 'react-query';
import { getComments } from 'src/api';
import { Comment } from 'src/components';

export const Comments = () => {
	const { isLoading, data } = useQuery('comments', getComments);

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<main>
			{data.map((comment) => (
				<Comment key={comment.id} comment={comment} />
			))}
		</main>
	);
};
