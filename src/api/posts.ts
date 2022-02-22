import { PostProp } from 'src/types';
import { instance } from '.';

export const getPosts = async () => {
	const postApi = instance();

	const response = await postApi('posts');

	const data: PostProp[] = response.data;

	return data;
};

export const getPostsById = async (id: string) => {
	const postApi = instance();

	const response = await postApi(`posts/${id}`);

	const data: PostProp = response.data;

	return data;
};
