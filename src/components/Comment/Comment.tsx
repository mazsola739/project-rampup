import { CommentProps } from './Comment.types';
import './Comment.scss';

export const Comment = ({ comment }: CommentProps) => {
	const { name, email, body } = comment;

	return (
		<div className='comment-container'>
			<h4>
				by: {name} email: {email}
			</h4>
			<p>{body}</p>
		</div>
	);
};
