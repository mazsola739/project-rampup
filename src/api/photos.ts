import { PhotoProp } from 'src/types';
import { api } from '.';

export const getPhotos = async (page: number = 1, limit: number = 28) => {
	const { data } = await api.get<PhotoProp[]>(
		`photos/?_page=${page}&_limit=${limit}`
	);

	return data;
};

export const getPhotosById = async (id: string) => {
	const { data } = await api.get<PhotoProp>(`photos/${id}`);

	return data;
};

export const getPhotosByAlbumId = async (id: string) => {
	const { data } = await api.get<PhotoProp[]>(`albums/${id}/photos`);

	return data;
};
