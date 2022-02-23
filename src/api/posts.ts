import { PostProp } from 'src/types';
import { api } from '.';

export const getPosts = async () => {
	const { data } = await api.get<PostProp[]>('posts');

	return data;
};

export const getPostsById = async (id: string) => {
	const { data } = await api.get<PostProp>(`posts/${id}`);

	return data;
};
