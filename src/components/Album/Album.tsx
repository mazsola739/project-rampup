import { Button } from '..';
import { AlbumProps } from './Album.types';

export const Album = ({ album }: AlbumProps) => {
	const { title } = album;

	return (
		<article>
			<h1>{title}</h1>
			<p>created by: username</p>
			<Button>More info</Button>
		</article>
	);
};
