import { Outlet } from 'react-router-dom';
import { Aside } from '..';

import './Main.scss';

export const Main = () => {
	return (
		<main>
			<Outlet />
			<Aside />
		</main>
	);
};
