import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getPhotosById } from 'src/api';
import { Button } from 'src/components';
import './Photo.scss';

export const Photo = () => {
	const { id = '' } = useParams();
	const { isLoading, data } = useQuery({
		queryKey: ['photos', id],
		queryFn: () => getPhotosById(id),
	});

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<article className='photo-article'>
			<h2>{data.title}</h2>
			<img src={data.thumbnailUrl} alt={data.title} />
			<img src={data.url} alt={data.title} />
			<Link to={`/albums/${data.albumId}`}>
				<Button>Click</Button>
			</Link>
		</article>
	);
};
