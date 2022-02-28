import { PostProp } from 'src/types';
import { api } from '.';

export const getPosts = async (page: number = 1, limit: number = 6) => {
	const { data } = await api.get<PostProp[]>(
		`posts/?_page=${page}&_limit=${limit}`
	);

	return data;
};

export const getPostsById = async (id: string) => {
	const { data } = await api.get<PostProp>(`posts/${id}`);

	return data;
};

export const getPostsByUserId = async (id: string) => {
	const { data } = await api.get<PostProp>(`users/${id}/posts`);

	return data;
};
