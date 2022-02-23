import { PhotoProp } from 'src/types';
import { api } from '.';

export const getPhotos = async () => {
	const { data } = await api.get<PhotoProp[]>('photos');

	return data;
};

export const getPhotosById = async (id: string) => {
	const { data } = await api.get<PhotoProp>(`albums/${id}/photos`);

	return data;
};

export const getPhotoById = async (id: string) => {
	const commentApi = instance();

	const response = await commentApi(`albums/${id}/photos`);

	const data: PhotoProp = response.data;

	return data;
};
