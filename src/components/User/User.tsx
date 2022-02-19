import { UserProps } from './User.types';

import './User.scss';

export const User = ({ user }: UserProps) => {
	const { username, name, email, phone, website } = user;

	return (
		<article className='user-article'>
			<h3>{username}</h3>
			<table>
				<thead>
					<tr>
						<th>Name: </th>
						<th>{name}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Email: </td>
						<td>{email}</td>
					</tr>
					<tr>
						<td>Phone: </td>
						<td>{phone}</td>
					</tr>
					<tr>
						<td>Website: </td>
						<td>{website}</td>
					</tr>
				</tbody>
			</table>
		</article>
	);
};
