import { useQuery } from 'react-query';
import { getComments } from 'src/api';
import { Comment } from 'src/components';

import './Comments.scss';

export const Comments = () => {
	const { isLoading, data } = useQuery('comments', getComments);

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<section className='comments-section'>
			<h2>Comments</h2>
			{data.map((comment) => (
				<Comment key={comment.id} comment={comment} />
			))}
		</section>
	);
};
