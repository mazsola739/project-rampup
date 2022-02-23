import { CardProps } from './Card.types';

import './Card.scss';

export const Card = ({ children }: CardProps) => {
	return <div className='card'>{children}</div>;
};
