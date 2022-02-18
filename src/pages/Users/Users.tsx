import { useQuery } from 'react-query';
import { getUsers } from 'src/api';
import { User } from 'src/components';

export const Users = () => {
	const { isLoading, data } = useQuery('users', getUsers);

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<main>
			{data.map((user) => (
				<User key={user.id} user={user} />
			))}
		</main>
	);
};
