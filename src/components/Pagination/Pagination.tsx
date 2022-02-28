import { Button } from '..';
import { PaginationProps } from './Pagination.types';

export const Pagination = ({
	currentPage,
	totalPages,
	paginate,
}: PaginationProps) => {
	return (
		<div>
			<div>
				<div>
					<Button
						onClick={() => paginate(currentPage !== 1 ? 1 : currentPage)}
						/* color={currentPage === 1 && 'disabled'} */
					>
						{'<<'}
					</Button>
					<Button
						onClick={() => currentPage !== 1 && paginate(currentPage - 1)}
						/* color={currentPage === 1 && 'disabled'} */
					>
						{'<'}
					</Button>
				</div>
				<Button
					onClick={() => paginate(1)}
					/* color={currentPage === 1 && 'active'} */
				>
					1
				</Button>
				{currentPage > 3 && <div>...</div>}
				{currentPage === totalPages && totalPages > 3 && (
					<Button onClick={() => paginate(currentPage - 2)}>
						{currentPage - 2}
					</Button>
				)}
				{currentPage > 2 && (
					<Button onClick={() => paginate(currentPage - 1)}>
						{currentPage - 1}
					</Button>
				)}
				{currentPage !== 1 && currentPage !== totalPages && (
					<Button onClick={() => paginate(currentPage)} color='active'>
						{currentPage}
					</Button>
				)}
				{currentPage < totalPages - 1 && (
					<Button onClick={() => paginate(currentPage + 1)}>
						{currentPage + 1}
					</Button>
				)}
				{currentPage === 1 && totalPages > 3 && (
					<Button onClick={() => paginate(currentPage + 2)}>
						{currentPage + 2}
					</Button>
				)}
				{currentPage < totalPages - 2 && <div>...</div>}
				<Button
					onClick={() => paginate(totalPages)}
					/* color={currentPage === totalPages && 'active'} */
				>
					{totalPages}
				</Button>
				<div>
					<Button
						onClick={() =>
							paginate(
								currentPage !== totalPages ? currentPage + 1 : currentPage
							)
						}
						/* color={currentPage === totalPages && 'disabled'} */
					>
						{'>'}
					</Button>
					<Button
						onClick={() =>
							paginate(currentPage !== totalPages ? totalPages : currentPage)
						}
						/* color={currentPage === totalPages && 'disabled'} */
					>
						{'>>'}
					</Button>
				</div>
			</div>
		</div>
	);
};
