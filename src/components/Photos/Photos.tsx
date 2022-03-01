import { useState } from 'react';
import { useQuery } from 'react-query';
import { getPhotos } from 'src/api';
import './Photos.scss';

export const Photos = () => {
	const [page, setPage] = useState(1);
	const [limit] = useState(32);

	const { isLoading, data, isFetching, isPreviousData } = useQuery(
		['photos', page],
		() => getPhotos(page, limit),
		{
			keepPreviousData: true,
		}
	);

	if (isLoading) return <p>Loading</p>;

	if (!data) return null;

	return (
		<div className='photos__container'>
			<h2>Photos</h2>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className='photos__grid'>
					{data.map((photo) => (
						<img
							key={photo.id}
							src={photo.thumbnailUrl}
							alt={photo.title}
							className='photos__card'
						/>
					))}
					<button
						onClick={() => setPage((old) => Math.max(old - 1, 0))}
						disabled={page === 0}>
						Previous
					</button>
					<button
						onClick={() => {
							if (!isPreviousData) {
								setPage((old) => old + 1);
							}
						}}
						disabled={isPreviousData}>
						Next
					</button>
					{isFetching ? <span> Loading...</span> : null}
				</div>
			)}
		</div>
	);
};
