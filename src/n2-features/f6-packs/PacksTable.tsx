import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import {NavLink, useNavigate} from 'react-router-dom';
import styles from './Packs.module.css';
import {Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TableContainer from '@mui/material/TableContainer';
import {formatDate} from './Packs';
import {useAppSelector} from '../../n1-main/m2-bll/store';
import {DeletePackModal} from './Modals/DeletePackModal';
import {UpdatePackModal} from './Modals/UpdatePackModal';

export const PacksTable = () => {
    const navigate = useNavigate()

    const packs = useAppSelector(state => state.packs.cardPacks)
    const userId = useAppSelector(state => state.profile._id)

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 400}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Author</TableCell>
                        <TableCell align="right">Cards Count</TableCell>
                        <TableCell align="right">Grade</TableCell>
                        <TableCell align="right">Created By</TableCell>
                        <TableCell align="right">Last Updated</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packs?.map((pack) => (
                        <TableRow
                            key={pack._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                <NavLink className={styles.pack}
                                         to={'/cards/' + pack._id}>{pack.name}</NavLink>
                            </TableCell>
                            <TableCell align="right">{pack.user_name}</TableCell>
                            <TableCell align="right">{pack.cardsCount}</TableCell>
                            <TableCell align="right">{pack.grade}</TableCell>
                            <TableCell align="right">{formatDate(pack.created)}</TableCell>
                            <TableCell align="right">{formatDate(pack.updated)}</TableCell>
                            <TableCell className={styles.buttonBlock}>
                                <DeletePackModal packName={pack.name} cardPackId={pack._id} deleteCardPackButton={
                                    <Button disabled={userId !== pack.user_id}
                                            color="error"
                                            size="small"
                                            startIcon={<DeleteIcon/>}>
                                        Delete
                                    </Button>
                                }/>
                                <UpdatePackModal packName={pack.name} cardPackId={pack._id} updateCardPackButton={
                                    <Button disabled={userId !== pack.user_id}
                                            color="secondary"
                                            size="small"
                                            startIcon={<BorderColorIcon/>}>
                                        Edit
                                    </Button>
                                }/>

                                <Button
                                    disabled={pack.cardsCount === 0}
                                    onClick={() => {
                                        navigate(`/learn/${pack._id}`)
                                    }} color="secondary" size="small"
                                    startIcon={<MenuBookIcon/>}>
                                    Learn
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
