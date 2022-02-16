import { useQuery } from 'react-query';
import { getPhotos } from 'src/api';
/* import { Card } from '..'; */

export const CardList = () => {
	const { isLoading, data } = useQuery('photos', getPhotos);

	if (isLoading) return <p>Loading</p>;
	console.log(data);

	return (
		<div>
			{/* {data.map((image) => (
				<Card title={image.title} thumbnailUrl={image.thumbnailUrl} />
			))} */}
		</div>
	);
};
