import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

type PaginationPropsType = {
    count: number
    page: number
    onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null,
                   newPage: number,) => void
    rowsPerPage: number
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const Pagination: React.FC<PaginationPropsType> = React.memo(({
                                                                         count,
                                                                         page,
                                                                         onPageChange,
                                                                         rowsPerPage,
                                                                         onRowsPerPageChange
                                                                     }) => {

    return (
        <TablePagination
            component="div"
            count={count}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
        />
    );
});
