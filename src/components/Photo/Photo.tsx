import { PhotoProps } from './Photo.types';

export const Photo = ({ thumbnailUrl, title }: PhotoProps) => {
	return <img src={thumbnailUrl} alt={title} />;
};
