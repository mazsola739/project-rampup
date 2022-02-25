import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getAlbumsById } from 'src/api';
import { UserName, AlbumPhotos, Button } from 'src/components';
import './Album.scss';

export const Album = () => {
	const { id = '' } = useParams();
	const { isLoading, data } = useQuery({
		queryKey: ['albums', id],
		queryFn: () => getAlbumsById(id),
	});

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<div className='album-container'>
			<article className='album-article'>
				<h2>{data.title}</h2>
				<Link to={`/users/${data.id}`}>
					<UserName id={data.userId} />
				</Link>
				<AlbumPhotos id={data.id} />
				<div className='album-button'>
					<Link to='/albums'>
						<Button>Back</Button>
					</Link>
				</div>
			</article>
		</div>
	);
};
