import { UserProps } from './User.types';

import './User.scss';
import { Avatar, Button } from '..';

export const User = ({ user }: UserProps) => {
	const { id, username, name, email, phone, website } = user;

	//TODO: albums comments posts todos

	return (
		<article className='user-article'>
			<h3>
				<Avatar id={id} />
				{username}
			</h3>
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
			<Button>Click</Button>
		</article>
	);
};
