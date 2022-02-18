import { CommentProps } from '../types';

export const getComments = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/comments');
	const data: CommentProps[] = await response.json();

	return data;
};
