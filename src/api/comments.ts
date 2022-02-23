import { CommentProp } from 'src/types';
import { api } from '.';

export const getComments = async () => {
	const { data } = await api.get<CommentProp[]>('comments');

	return data;
};

export const getCommentsById = async (id: string) => {
	const { data } = await api.get<CommentProp>(`posts/${id}/comments`);

	return data;
};

export const getCommentById = async (id: string) => {
	const commentApi = instance();

	const response = await commentApi(`posts/${id}/comments`);

	const data: CommentProp = response.data;

	return data;
};
