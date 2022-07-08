import * as React from 'react';
import Stack from '@mui/material/Stack';
import {useAppDispatch, useAppSelector} from '../../../m2-bll/store';
import {TablePagination} from '@mui/material';

export const PacksPagination = () => {
    const dispatch = useAppDispatch();
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const page = useAppSelector(state => state.packs.page)
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const packs = useAppSelector(state => state.packs.cardPacks)

    const handleChangePage = () => {
        // dispatch( getPacksAC(page))
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        //dispatch(getPacksAC(pageCount));
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