import { PhotoProp } from 'src/types';
import { api } from '.';

export const getPhotos = async () => {
	const { data } = await api.get<PhotoProp[]>('photos');

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
