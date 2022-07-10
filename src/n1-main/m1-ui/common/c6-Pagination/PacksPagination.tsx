import * as React from 'react';
import Stack from '@mui/material/Stack';
import {useAppDispatch, useAppSelector} from '../../../m2-bll/store';
import {TablePagination} from '@mui/material';
import { pageAC, pageCountAC} from "../../../m2-bll/reducers/packs-reducer";
import {ChangeEvent} from "react";

export const PacksPagination = () => {
    const dispatch = useAppDispatch();
    const pageCount = useAppSelector(state => state.packs.params.pageCount)
    const page = useAppSelector(state => state.packs.params.page)
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)

    const handleChangePage = () => {
         dispatch(pageAC(page+1))
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(pageCountAC((Number(event.target.value))));
    }

    console.log({pageCount, page})

    return (
        <Stack spacing={2}>
            <TablePagination
                component="div"
                // rowsPerPageOptions={[10, 20, 30, 40]}
                count={cardPacksTotalCount}
                page={page-1}
                onPageChange={handleChangePage}
                rowsPerPage={pageCount}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Stack>
    );
}