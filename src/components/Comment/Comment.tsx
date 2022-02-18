import { CommentProps } from './Comment.types';

export const Comment = ({ comment }: CommentProps) => {
	const { body } = comment;

	return <p>{body}</p>;
};
