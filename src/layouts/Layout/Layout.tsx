import { Outlet } from 'react-router-dom';
import { Header, Navigation, Footer } from '..';

export const Layout = () => {
	return (
		<>
			<Header />
			<Navigation />
			<Outlet />
			<Footer />
		</>
	);
};
