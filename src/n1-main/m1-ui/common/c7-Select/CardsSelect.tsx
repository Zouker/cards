import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useAppDispatch, useAppSelector} from '../../../m2-bll/store';


export const CardsSelect = () => {
    const dispatch = useAppDispatch();
    const pageCount = useAppSelector(state => state.packs.pageCount)


    const [page, setPage] = React.useState<number>(pageCount);


    const handleChange = (event: SelectChangeEvent) => {
        setPage(+event.target.value);
        // dispatch(pageCountAC(page))
    };

    return (
        <FormControl sx={{m: 1, minWidth: 120}}>
            <Select
                id="demo-simple-select"
                //@ts-ignore
                value={pageCount}
                onChange={handleChange}
                displayEmpty
            >
                {/*// <MenuItem value={} style={{display: 'flex', justifyContent: 'center'}}>*/}

                {/*</MenuItem>*/}
                <MenuItem style={{display: 'flex', justifyContent: 'center'}} value={10}>10</MenuItem>
                <MenuItem style={{display: 'flex', justifyContent: 'center'}} value={20}>20</MenuItem>
                <MenuItem style={{display: 'flex', justifyContent: 'center'}} value={30}>30</MenuItem>
            </Select>
        </FormControl>
    );
}
