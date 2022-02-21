import { useQuery } from 'react-query';
import { getUsers } from 'src/api';
import { User } from 'src/components';

import './Users.scss';

export const Users = () => {
	const { isLoading, data } = useQuery('users', getUsers);

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<section className='users-section'>
			<h2>Users</h2>
			<div className='users-grid'>
				{data.map((user) => (
					<User key={user.id} user={user} />
				))}
			</div>
		</section>
	);
};
