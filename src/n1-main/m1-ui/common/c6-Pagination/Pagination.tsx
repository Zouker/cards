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

export const Pagination: React.FC<PaginationPropsType> = (props) => {
    // const [page, setPage] = React.useState(2);
    // const [rowsPerPage, setRowsPerPage] = React.useState(10);
    //
    // const handleChangePage = (
    //     event: React.MouseEvent<HTMLButtonElement> | null,
    //     newPage: number,
    // ) => {
    //     setPage(newPage);
    // };
    //
    // const handleChangeRowsPerPage = (
    //     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    // ) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

    return (
        <TablePagination
            component="div"
            count={100}
            page={props.page}
            onPageChange={props.onPageChange}
            rowsPerPage={props.rowsPerPage}
            onRowsPerPageChange={props.onRowsPerPageChange}
        />
    );
}
