import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getUsers } from 'src/api';
import { Avatar, Button, Todos } from 'src/components';
import './Users.scss';

export const Users = () => {
	const { isLoading, data } = useQuery('users', getUsers);

	if (!data) return null;

	return (
		<div className='users__container'>
			<section>
				<h2>Users</h2>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<div className='users__grid'>
						{data.map((user) => (
							<div key={user.id} className='users__card'>
								<h3>
									<Avatar id={user.id} />
									{user.username}
								</h3>
								<table>
									<thead>
										<tr>
											<th>Name: </th>
											<th>{user.name}</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Email: </td>
											<td>{user.email}</td>
										</tr>
										<tr>
											<td>Phone: </td>
											<td>{user.phone}</td>
										</tr>
										<tr>
											<td>Website: </td>
											<td>{user.website}</td>
										</tr>
									</tbody>
								</table>
								<div className='users__button'>
									<Link to={`/users/${user.id}`}>
										<Button>Click</Button>
									</Link>
								</div>
							</div>
						))}
					</div>
				)}
			</section>
			<aside>
				<Todos />
			</aside>
		</div>
	);
};
