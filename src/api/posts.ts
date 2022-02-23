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

export const getPostById = async (id: string) => {
	const postApi = instance();

	const response = await postApi(`posts/${id}`);

	const data: PostProp = response.data;

	return data;
};
