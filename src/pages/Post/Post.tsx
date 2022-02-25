import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { getPostsById } from 'src/api';
import { Button } from 'src/components';
import './Post.scss';

export const Post = () => {
	const { id = '' } = useParams();
	const { isLoading, data } = useQuery({
		queryKey: ['posts', id],
		queryFn: () => getPostsById(id),
	});

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	//TODO: username, comments
	/* export type PostProp = {
	userId: number;
	id: number;
	title: string;
	body: string;
};
 */

	return (
		<article className='post-article'>
			<h3>{data.title}</h3>
			<p>{data.body}</p>
			<Link to='/posts'>
				<Button>Click</Button>
			</Link>
		</article>
	);
};
