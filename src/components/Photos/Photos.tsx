import { useQuery } from 'react-query';
import { getPhotos } from 'src/api';
import './Photos.scss';

export const Photos = () => {
	const { isLoading, data } = useQuery('photos', getPhotos);

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<div className='photos-container'>
			<h2>Photos</h2>
			<div className='photos-grid'>
				{data.map((photo) => (
					<img
						key={photo.id}
						src={photo.thumbnailUrl}
						alt={photo.title}
						className='photos-card'
					/>
				))}
			</div>
		</div>
	);
};
