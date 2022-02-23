import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../../api';
import { Button } from '..';

import './Post.scss';

export const Post = () => {
	const { id = '' } = useParams();
	const { isLoading, data } = useQuery({
		queryKey: ['posts', id],
		queryFn: () => getPostById(id),
	});

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	//TODO: username, comments

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
