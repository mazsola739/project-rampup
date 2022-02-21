import { PostProps } from './Post.types';
import { Button } from '..';

import './Post.scss';

export const Post = ({ post }: PostProps) => {
	const { body, title } = post;

	return (
		<article className='post-article'>
			<h3>{title}</h3>
			<p>{body}</p>
			<Button>More info</Button>
		</article>
	);
};
