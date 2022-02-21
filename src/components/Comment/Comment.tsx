import { CommentProps } from './Comment.types';

import './Comment.scss';

export const Comment = ({ comment }: CommentProps) => {
	const { body } = comment;

	return (
		<article className='comment-article'>
			<p>{body}</p>
		</article>
	);
};
