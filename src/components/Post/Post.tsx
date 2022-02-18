import { PostProps } from './Post.types';

export const Post = ({ post }: PostProps) => {
	const { body } = post;

	return <p>{body}</p>;
};
