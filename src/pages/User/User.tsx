import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getUsersById } from 'src/api';
import { Avatar, Button } from 'src/components';
import './User.scss';

export const User = () => {
	const { id = '' } = useParams();
	const { isLoading, data } = useQuery({
		queryKey: ['users', id],
		queryFn: () => getUsersById(id),
	});

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	//TODO: albums comments posts todos

	/* export type UserProp = {
	id: number;
	name: string;
	username: string;
	email: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		geo: {
			lat: string;
			lng: string;
		};
	};
	phone: string;
	website: string;
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
};
 */

	return (
		<article className='user-article'>
			<h3>
				<Avatar id={data.id} />
				{data.username}
			</h3>
			<table>
				<thead>
					<tr>
						<th>Name: </th>
						<th>{data.name}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Email: </td>
						<td>{data.email}</td>
					</tr>
					<tr>
						<td>Phone: </td>
						<td>{data.phone}</td>
					</tr>
					<tr>
						<td>Website: </td>
						<td>{data.website}</td>
					</tr>
				</tbody>
			</table>
			<Link to='/users'>
				<Button>Click</Button>
			</Link>
		</article>
	);
};
