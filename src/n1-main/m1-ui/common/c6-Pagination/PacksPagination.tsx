import * as React from 'react';
import Stack from '@mui/material/Stack';
import {useAppDispatch, useAppSelector} from '../../../m2-bll/store';
import {TablePagination} from '@mui/material';
import {setPageAC, setPageCountAC} from '../../../m2-bll/reducers/packs-reducer';

export const PacksPagination = () => {
    const dispatch = useAppDispatch();
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const page = useAppSelector(state => state.packs.page)
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)

    const handleChangePage = () => {
        debugger
        dispatch(setPageAC(page))
    }

    const handleChangeRowsPerPage = () => {
        debugger
        dispatch(setPageCountAC(pageCount));
    }

    return (
        <Stack spacing={2}>
            <TablePagination
                component="div"
                count={cardPacksTotalCount}
                page={page - 1}
                onPageChange={handleChangePage}
                rowsPerPage={pageCount}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Stack>
    );
}