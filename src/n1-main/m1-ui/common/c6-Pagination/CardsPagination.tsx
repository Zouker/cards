import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useAppDispatch, useAppSelector} from "../../../m2-bll/store";


export const CardsPagination = ()=> {
    const dispatch = useAppDispatch();
    const pageCount=useAppSelector(state => state.packs.pageCount)
    const totalCount=useAppSelector(state => state.packs.cardPacksTotalCount)
    const actualPage=useAppSelector(state => state.packs.page)


    let pageNumberCount=Math.ceil(totalCount/pageCount);
    return (
        <Stack spacing={2}>
            <Pagination count={pageNumberCount}
                        page={actualPage}
                        color="secondary" />
        </Stack>
    );
}