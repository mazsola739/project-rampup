import { AlbumProp } from 'src/types';
import { api } from '.';

export const getAlbums = async (page: number = 1, limit: number = 6) => {
	const { data } = await api.get<AlbumProp[]>(
		`albums/?_page=${page}&_limit=${limit}`
	);

	return data;
};

export const getAlbumsById = async (id: string) => {
	const { data } = await api.get<AlbumProp>(`albums/${id}`);

	return data;
};

export const getAlbumsByUserId = async (id: string) => {
	const { data } = await api.get<AlbumProp>(`users/${id}/albums`);

	return data;
};
