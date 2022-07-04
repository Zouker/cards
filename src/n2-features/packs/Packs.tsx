import * as React from 'react';
import {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from '../../n1-main/m2-bll/store';
import {deletePackTC, getPacksTC, updatePackTC} from '../../n1-main/m2-bll/reducers/packs-reducer';
import styles from './Packs.module.css'
import {Button} from '@mui/material';
import {RangeSlider} from '../../n1-main/m1-ui/common/c4-RangeSlider/RangeSlider';
import {SearchAppBar} from '../../n1-main/m1-ui/common/c5-SearchField/SearchField';
import {CardsPagination} from '../../n1-main/m1-ui/common/c6-Pagination/CardsPagination';
import {CardsSelect} from '../../n1-main/m1-ui/common/c7-Select/CardsSelect';
import {Navigate} from 'react-router-dom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DeleteIcon from '@mui/icons-material/Delete';

export const Packs = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const packs = useAppSelector(state => state.packs.cardPacks)

    const deletePack = (id: string) => {
        dispatch(deletePackTC(id))
    }

    const updatePack = (id: string) => {
        const name = 'UPDATED_NAME'
        dispatch(updatePackTC(id, name))
    }

    const learnPack = () => {
        console.log('LEARN')
    }

    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <div>
                        <p className={styles.title}>Show packs cards</p>
                        <div className={styles.buttonBlock}>
                            <Button variant="outlined" color="secondary">
                                My
                            </Button>
                            <Button variant="contained" color="secondary">
                                All
                            </Button>
                        </div>
                    </div>
                    <div>
                        <p className={styles.title}>Number of cards</p>
                        <div className={styles.rangeSlider}>
                            <RangeSlider/>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Packs List</h1>
                    <SearchAppBar/>
                    <TableContainer component={Paper} className={styles.cardsTable}>
                        <Table sx={{minWidth: 400}} aria-label="simple table">
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
                                        <td className={styles.buttonBlock}>
                                            <Button onClick={() => deletePack(pack._id)} color="secondary"
                                                    size="small"
                                                    startIcon={<DeleteIcon/>}>
                                                Delete
                                            </Button>
                                            <Button onClick={()=>updatePack(pack._id)} color="secondary" size="small"
                                                    startIcon={<BorderColorIcon/>}>
                                                Edit
                                            </Button>
                                            <Button onClick={learnPack} color="secondary" size="small"
                                                    startIcon={<MenuBookIcon/>}>
                                                Learn
                                            </Button>
                                        </td>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className={styles.paginatorBlock}>
                        <div>
                            <CardsPagination/>
                        </div>
                        <div className={styles.selector}>
                            Show
                            <CardsSelect/>
                            per Page
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
