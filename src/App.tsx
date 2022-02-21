import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { Albums, Users } from './pages';
import { Posts } from './pages/Posts';

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Navigate replace to='/posts' />} />
				<Route path='/' element={<Layout />}>
					<Route path='/albums' element={<Albums />} />
					<Route path='/posts' element={<Posts />} />
					<Route path='/users' element={<Users />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
