import { CommentProps } from './Comment.types';

export const Comment = ({ comment }: CommentProps) => {
	const { body } = comment;

	return <section>{body}</section>;
};
