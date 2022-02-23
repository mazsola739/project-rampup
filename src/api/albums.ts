import { AlbumProp } from 'src/types';
import { api } from '.';

export const getAlbums = async () => {
	const { data } = await api.get<AlbumProp[]>('albums');

	return data;
};

export const getAlbumsById = async (id: string) => {
	const { data } = await api.get<AlbumProp>(`users/${id}/albums`);

	return data;
};
