import { PhotoProps } from './Photo.types';

import './Photo.scss';

export const Photo = ({ photo }: PhotoProps) => {
	const { thumbnailUrl, title } = photo;

	return (
		<article className='photo-article'>
			<h2>{title}</h2>
			<img src={thumbnailUrl} alt={title} />
		</article>
	);
};
