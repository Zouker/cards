import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

export const CardsSelect = () => {
    const [page, setPage] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setPage(event.target.value);
    };

    return (
        <FormControl sx={{m: 1, minWidth: 120}}>
            <Select
                value={page}
                onChange={handleChange}
                displayEmpty
            >
                <MenuItem value="" style={{display: 'flex', justifyContent: 'center'}}>
                    {/*<em>None</em>*/}
                </MenuItem>
                <MenuItem style={{display: 'flex', justifyContent: 'center'}} value={10}>10</MenuItem>
                <MenuItem style={{display: 'flex', justifyContent: 'center'}} value={20}>20</MenuItem>
                <MenuItem style={{display: 'flex', justifyContent: 'center'}} value={30}>30</MenuItem>
            </Select>
        </FormControl>
    );
}
