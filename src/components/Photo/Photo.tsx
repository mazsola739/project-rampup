import { PhotoProps } from './Photo.types';

import './Photo.scss';

export const Photo = ({ photo }: PhotoProps) => {
	const { thumbnailUrl, title } = photo;

	return (
		<article className='photo-article'>
			<h1>{title}</h1>
			<img src={thumbnailUrl} alt={title} />
		</article>
	);
};
