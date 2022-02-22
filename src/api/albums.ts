import { AlbumProp } from 'src/types';
import { instance } from '.';

export const getAlbums = async () => {
	const albumApi = instance();

	const response = await albumApi.get('albums');

	const data: AlbumProp[] = response.data;

	return data;
};

export const getAlbumsById = async (id: string) => {
	const postApi = instance();

	const response = await postApi(`users/${id}/albums`);

	const data: AlbumProp = response.data;

	return data;
};
