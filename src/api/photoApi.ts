import { PhotoProps } from '../types';

export const getPhotos = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/photos');
	const data: PhotoProps[] = await response.json();

	return data;
};
