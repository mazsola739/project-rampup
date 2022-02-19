import { PostProps } from './Post.types';

import './Post.scss';

export const Post = ({ post }: PostProps) => {
	const { body, title } = post;

	return (
		<section>
			<h1>{title}</h1>
			<p>{body}</p>
		</section>
	);
};
