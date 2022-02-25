import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getAlbums } from 'src/api';
import { UserName, Button, Photos } from 'src/components';
import './Albums.scss';

export const Albums = () => {
	const { isLoading, data } = useQuery('albums', getAlbums);

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<div className='albums-container'>
			<section>
				<h2>Albums</h2>
				<div className='albums-grid'>
					{data.map((album) => (
						<div key={album.id} className='albums-card'>
							<h3>{album.title}</h3>
							<UserName id={album.userId} />
							<div className='albums-button'>
								<Link to={`/albums/${album.id}`}>
									<Button>Click</Button>
								</Link>
							</div>
						</div>
					))}
				</div>
			</section>
			<aside>
				<Photos />
			</aside>
		</div>
	);
};
