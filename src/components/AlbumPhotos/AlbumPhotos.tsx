import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getPhotosByAlbumId } from 'src/api';
import { AlbumPhotosProps } from './AlbumPhotos.types';
import './AlbumPhotos.scss';

export const AlbumPhotos = ({ id }: AlbumPhotosProps) => {
	const { isLoading, data } = useQuery({
		queryKey: ['albums', id],
		queryFn: () => getPhotosByAlbumId(`${id}`),
	});

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<div className='albumPhotos__container'>
			{data.map((photo) => (
				<div key={photo.id}>
					<Link to={`/photos/${photo.id}`}>
						<img
							src={photo.thumbnailUrl}
							alt={photo.title}
							className='albumPhotos__image'
						/>
					</Link>
				</div>
			))}
		</div>
	);
};
