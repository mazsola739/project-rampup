import { AlbumProps } from '../types';

export const getAlbums = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/albums');
	const data: AlbumProps[] = await response.json();

	return data;
};
