import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from '../../n1-main/m2-bll/store';
import {useEffect} from 'react';
import {setPacksTC} from '../../n1-main/m2-bll/reducers/packs-reducer';

export const Packs = () => {
    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.packs.cardPacks)

    useEffect(() => {
        dispatch(setPacksTC())
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Cards</TableCell>
                        <TableCell align="right">Last Updated</TableCell>
                        <TableCell align="right">Created By</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packs.map((pack) => (
                        <TableRow
                            key={pack._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {pack.name}
                            </TableCell>
                            <TableCell align="right">{pack.user_name}</TableCell>
                            <TableCell align="right">{pack.updated}</TableCell>
                            <TableCell align="right">{pack.created}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
