import { PostProp } from '../types';

export const getPosts = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	const data: PostProp[] = await response.json();

	return data;
};
