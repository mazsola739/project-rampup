import { useQuery } from 'react-query';
import { getComments } from 'src/api';
import './Comments.scss';

export const Comments = () => {
	const { isLoading, data } = useQuery('comments', getComments);

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<section className='comments-container'>
			<h2>Comments</h2>
			{data.map((comment) => (
				<div key={comment.id} className='comments-card'>
					<p>{comment.body}</p>
				</div>
			))}
		</section>
	);
};
