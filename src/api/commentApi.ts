import { CommentProp } from '../types';

export const getComments = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/comments');
	const data: CommentProp[] = await response.json();

	return data;
};
