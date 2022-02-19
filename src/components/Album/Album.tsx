import { AlbumProps } from './Album.types';

export const Album = ({ album }: AlbumProps) => {
	const { title } = album;

	return (
		<section>
			<h1>{title}</h1>
		</section>
	);
};
