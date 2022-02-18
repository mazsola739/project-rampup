import { AlbumProp } from '../types';

export const getAlbums = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/albums');
	const data: AlbumProp[] = await response.json();

	return data;
};
