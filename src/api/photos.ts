import { PhotoProp } from 'src/types';
import { instance } from '.';

export const getPhotos = async () => {
	const photoApi = instance();

	const response = await photoApi('photos');

	const data: PhotoProp[] = response.data;

	return data;
};
