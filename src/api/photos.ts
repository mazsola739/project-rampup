import { PhotoProp } from 'src/types';
import { instance } from '.';

export const getPhotos = async () => {
	const photoApi = instance();

	const response = await photoApi('photos');

	const data: PhotoProp[] = response.data;

	return data;
};

export const getPhotosById = async (id: string) => {
	const commentApi = instance();

	const response = await commentApi(`albums/${id}/photos`);

	const data: PhotoProp = response.data;

	return data;
};
