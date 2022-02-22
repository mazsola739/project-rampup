import { Button } from '..';
import { AlbumProps } from './Album.types';

import './Album.scss';

export const Album = ({ album }: AlbumProps) => {
	const { title } = album;

	return (
		<article className='album-article'>
			<h4>{title}</h4>
			<p>created by: username</p>
			<Button>Click</Button>
		</article>
	);
};
