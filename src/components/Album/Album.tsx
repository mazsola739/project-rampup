import { AlbumProps } from './Album.types';

export const Album = ({ album }: AlbumProps) => {
	const { title } = album;

	return <p>{title}</p>;
};
