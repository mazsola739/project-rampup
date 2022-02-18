import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './layouts';
import { Albums, Comments, Photos, Posts, Todos, Users } from './pages';

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Navigate replace to='/posts' />} />
				<Route path='/' element={<Layout />}>
					<Route path='/albums' element={<Albums />} />
					<Route path='/comments' element={<Comments />} />
					<Route path='/photos' element={<Photos />} />
					<Route path='/posts' element={<Posts />} />
					<Route path='/todos' element={<Todos />} />
					<Route path='/users' element={<Users />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
