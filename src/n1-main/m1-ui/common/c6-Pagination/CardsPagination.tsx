import * as React from 'react';
import Stack from '@mui/material/Stack';
import {useAppDispatch, useAppSelector} from "../../../m2-bll/store";
import {TablePagination} from "@mui/material";

export const CardsPagination = () => {
    const dispatch = useAppDispatch();
    const pageCount = useAppSelector(state => state.packs.params.pageCount)
    const page = useAppSelector(state => state.packs.params.page)
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)

    const handleChangePage = () => {

    }

    const rowsPerPage =4
    const handleChangeRowsPerPage = () => {

    }

    return (
        <Stack spacing={2}>
            <TablePagination
                component="div"
                count={cardPacksTotalCount}
                page={page-1}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Stack>
    );
}