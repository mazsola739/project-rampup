import { CardProps } from './Card.types';

export const Card = ({ thumbnailUrl, title }: CardProps) => {
	return <img src={thumbnailUrl} alt={title} />;
};
