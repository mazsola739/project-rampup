import { AvatarProps } from './Avatar.types';
import { avatars } from 'src/assets/users';

import './Avatar.scss';

export const Avatar = ({ id }: AvatarProps) => {
	const userAvatar = avatars;

	return (
		<img className='avatar' src={userAvatar[+`${id}` - 1]} alt={`${id}`} />
	);
};
