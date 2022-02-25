import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts';
import { Albums, Album, Posts, Post, Users, User, Photo } from './pages';

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Navigate replace to='/posts' />} />
				<Route path='/' element={<MainLayout />}>
					<Route path='/albums' element={<Albums />} />
					<Route path='/albums/:id' element={<Album />} />
					<Route path='/photos/:id' element={<Photo />} />
					<Route path='/posts' element={<Posts />} />
					<Route path='/posts/:id' element={<Post />} />
					<Route path='/users' element={<Users />} />
					<Route path='/users/:id' element={<User />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
