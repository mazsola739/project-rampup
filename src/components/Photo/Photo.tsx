import { PhotoProps } from './Photo.types';

export const Photo = ({ photo }: PhotoProps) => {
	const { thumbnailUrl, title } = photo;

	return <img src={thumbnailUrl} alt={title} />;
};
