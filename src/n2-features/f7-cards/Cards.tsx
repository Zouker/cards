import React, {useEffect} from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button, TableCell} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import s from './card.module.css'
import styles from '../f6-packs/Packs.module.css';
import {CardsPagination} from '../../n1-main/m1-ui/common/c6-Pagination/CardsPagination';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {updatePackTC} from '../../n1-main/m2-bll/reducers/packs-reducer';
import {useAppDispatch, useAppSelector} from '../../n1-main/m2-bll/store';
import {addCardTC, deleteCardTC, getCardsTC} from '../../n1-main/m2-bll/reducers/card-reducer';
import {Preloader} from '../../n1-main/m1-ui/common/loader/Loader';
import {SearchAppBar} from '../../n1-main/m1-ui/common/c5-SearchField/SearchField';
import {useNavigate, useParams} from 'react-router-dom';

export const Cards = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const cards = useAppSelector(state => state.cards.cards)

    const {packsId} = useParams<string>(); //получение id колоды, на которую мы кликнули

    useEffect(() => {
        if (packsId) {
            dispatch(getCardsTC(packsId))
        }
    }, []);

    const addNewCard = () => {
        const question = 'DEFAULT_QUESTION'
        const answer = 'DEFAULT_ANSWER'
        packsId && dispatch(addCardTC({cardsPack_id: packsId, question, answer}))
    }

    const deleteCard = (id: string) => {
        dispatch(deleteCardTC(id))
    }

    const updateCard = (id: string) => {
        const name = 'UPDATED_CARD_NAME'
        dispatch(updatePackTC(id, name))
    }

    const returnToPacks = () => {
        navigate({pathname: '/packs'})
    }

    return (
        <div className={s.tableWrapper}>
            {status === 'loading' && <Preloader/>}
            <Paper className={s.cards} elevation={3}>
                <h2>Cards name</h2>

                <SearchAppBar title={'add new card'} addNewItem={addNewCard} goBack={returnToPacks}/>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 500}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Question</TableCell>
                                <TableCell align="right">Answer</TableCell>
                                <TableCell align="right">Update</TableCell>
                                <TableCell align="right">Grade</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cards?.map((card) => (
                                <TableRow
                                    key={card._id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {card.question}
                                    </TableCell>
                                    <TableCell align="right">{card.answer}</TableCell>
                                    <TableCell align="right">{card.updated.toString()}</TableCell>
                                    <TableCell align="right">{card.grade}</TableCell>
                                    <td className={s.buttonBlock}>
                                        <Button onClick={() => deleteCard(card._id)} color="secondary"
                                                size="small"
                                                startIcon={<DeleteIcon/>}>
                                            Delete
                                        </Button>
                                        <Button onClick={() => updateCard(card._id)} color="secondary" size="small"
                                                startIcon={<BorderColorIcon/>}>
                                            Edit
                                        </Button>
                                    </td>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={styles.paginatorBlock}>
                    <CardsPagination/>
                </div>
            </Paper>
        </div>
    )
};
