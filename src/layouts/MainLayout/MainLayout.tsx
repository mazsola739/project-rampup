import { Header, Navigation, Main, Footer } from '..';

import './MainLayout.scss';

export const MainLayout = () => {
	return (
		<div className='layout'>
			<Header />
			<Navigation />
			<Main />
			<Footer />
		</div>
	);
};
