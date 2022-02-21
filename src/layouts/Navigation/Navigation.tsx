import { Link } from 'react-router-dom';

export const Navigation = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link to={'/albums'}>Albums</Link>
				</li>
				<li>
					<Link to={'/posts'}>Posts</Link>
				</li>
				<li>
					<Link to={'/users'}>Users</Link>
				</li>
			</ul>
		</nav>
	);
};
