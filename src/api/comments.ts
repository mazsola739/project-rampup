import { CommentProp } from 'src/types';
import { instance } from '.';

export const getComments = async () => {
	const commentApi = instance();

	const response = await commentApi('comments');

	const data: CommentProp[] = response.data;

	return data;
};
