import { UserProps } from './User.types';

export const User = ({ user }: UserProps) => {
	const { name } = user;

	return <p>{name}</p>;
};
