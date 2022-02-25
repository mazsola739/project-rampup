import { CommentProp } from 'src/types';
import { api } from '.';

export const getComments = async () => {
	const { data } = await api.get<CommentProp[]>('comments');

	return data;
};

export const getCommentsById = async (id: string) => {
	const { data } = await api.get<CommentProp>(`comments/${id}`);

	return data;
};

export const getCommentsByPostId = async (id: string) => {
	const { data } = await api.get<CommentProp>(`posts/${id}/comments`);

	return data;
};
