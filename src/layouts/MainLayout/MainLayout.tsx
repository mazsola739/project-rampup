import { Outlet } from 'react-router-dom';
import { Header, Navigation, Footer } from '..';
import './MainLayout.scss';

export const MainLayout = () => {
	return (
		<div className='layout'>
			<Header />
			<Navigation />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};
