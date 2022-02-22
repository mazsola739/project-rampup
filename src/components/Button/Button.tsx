import { ButtonProps } from './Button.types';

import './Button.scss';

export const Button = ({ children }: ButtonProps) => {
	return <button>{children}</button>;
};
