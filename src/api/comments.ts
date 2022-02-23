import { CommentProp } from 'src/types';
import { instance } from '.';

export const getComments = async () => {
	const commentApi = instance();

	const response = await commentApi('comments');

	const data: CommentProp[] = response.data;

	return data;
};

export const getCommentById = async (id: string) => {
	const commentApi = instance();

	const response = await commentApi(`posts/${id}/comments`);

	const data: CommentProp = response.data;

	return data;
};
