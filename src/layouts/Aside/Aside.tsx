import { useLocation } from 'react-router-dom';
import { Todos, Comments } from 'src/pages';

import './Aside.scss';

export const Aside = () => {
	const site = useLocation().pathname;

	return <aside>{site === '/users' ? <Todos /> : <Comments />}</aside>;
};
