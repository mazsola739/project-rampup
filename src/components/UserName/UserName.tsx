import { useQuery } from 'react-query';
import { getUsersById } from 'src/api';
import { Avatar } from '..';
import { UserNameProps } from './UserName.types';
import './UserName.scss';

export const UserName = ({ id }: UserNameProps) => {
	const { isLoading, data } = useQuery({
		queryKey: ['users', id],
		queryFn: () => getUsersById(`${id}`),
	});

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<div className='username'>
			<Avatar id={data.id} />
			<p>by {data.username}</p>
		</div>
	);
};
