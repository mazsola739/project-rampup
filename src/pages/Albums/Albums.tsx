import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getAlbums } from 'src/api';
import { UserName, Button, Photos } from 'src/components';
import './Albums.scss';

export const Albums = () => {
	const [page, setPage] = useState(1);
	const [limit] = useState(6);

	const { isLoading, data, isFetching, isPreviousData } = useQuery(
		['albums', page],
		() => getAlbums(page, limit),
		{
			keepPreviousData: true,
		}
	);

	if (!data) return null;

	return (
		<div className='albums__container'>
			<section>
				<h2>Albums</h2>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<div className='albums__grid'>
						{data.map((album) => (
							<div key={album.id} className='albums__card'>
								<h3>{album.title}</h3>
								<UserName id={album.userId} />
								<div className='albums__button'>
									<Link to={`/albums/${album.id}`}>
										<Button>Click</Button>
									</Link>
								</div>
							</div>
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
			</section>
			<aside>
				<Photos />
			</aside>
		</div>
	);
};
