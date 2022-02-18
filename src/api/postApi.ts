import { PostProps } from '../types';

export const getPosts = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	const data: PostProps[] = await response.json();

	return data;
};
