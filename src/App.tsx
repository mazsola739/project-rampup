import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Post } from './components';
import { MainLayout } from './layouts';
import { Albums, Posts, Users } from './pages';

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Navigate replace to='/posts' />} />
				<Route path='/' element={<MainLayout />}>
					<Route path='/albums' element={<Albums />} />
					<Route path='/albums/:id' element={<Albums />} />
					<Route path='/posts' element={<Posts />} />
					<Route path='/posts/:id' element={<Post />} />
					<Route path='/users' element={<Users />} />
					<Route path='/users/:id' element={<Users />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
