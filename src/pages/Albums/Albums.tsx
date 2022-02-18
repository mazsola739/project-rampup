import { useQuery } from 'react-query';
import { getAlbums } from 'src/api';
import { Album } from 'src/components';

export const Albums = () => {
	const { isLoading, data } = useQuery('albums', getAlbums);

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<main>
			{data.map((album) => (
				<Album key={album.id} album={album} />
			))}
		</main>
	);
};
