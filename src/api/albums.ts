import { apiService } from '.';
import { AlbumProp } from '../types';

export const getAlbums = async () => {
	const albumApi = apiService();

	const response = await albumApi.get('albums');
	const data: AlbumProp[] = response.data;

	return data;
};
