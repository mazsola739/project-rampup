import { PhotoProp } from '../types';

export const getPhotos = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/photos');
	const data: PhotoProp[] = await response.json();

	return data;
};
