import { PhotoProps } from './Photo.types';

export const Photo = ({ photo }: PhotoProps) => {
	const { thumbnailUrl, title } = photo;

	return (
		<section>
			<h1>{title}</h1>
			<img src={thumbnailUrl} alt={title} />
		</section>
	);
};
