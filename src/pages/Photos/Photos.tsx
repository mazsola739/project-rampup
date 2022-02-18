import { useQuery } from 'react-query';
import { getPhotos } from 'src/api';
import { Photo } from 'src/components';

export const Photos = () => {
	const { isLoading, data } = useQuery('photos', getPhotos);

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<div>
			{data.map((photo) => (
				<Photo
					key={photo.id}
					title={photo.title}
					thumbnailUrl={photo.thumbnailUrl}
				/>
			))}
		</div>
	);
};
