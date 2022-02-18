import { PhotoProps } from './Photo.types';

export const Card = ({ thumbnailUrl, title }: PhotoProps) => {
	return <img src={thumbnailUrl} alt={title} />;
};
