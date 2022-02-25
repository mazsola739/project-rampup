import { avatars } from 'src/assets/users';
import { AvatarProps } from './Avatar.types';
import './Avatar.scss';

export const Avatar = ({ id }: AvatarProps) => {
	const userAvatar = avatars;

	return (
		<img
			className='avatar-image'
			src={userAvatar[+`${id}` - 1]}
			alt={`${id}`}
		/>
	);
};
