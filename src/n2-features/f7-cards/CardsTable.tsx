import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button, Rating, TableCell} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import {formatDate} from '../f6-packs/Packs';
import styles from './Cards.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import TableContainer from '@mui/material/TableContainer';
import {useAppDispatch, useAppSelector} from '../../n1-main/m2-bll/store';
import {updateCardTC} from '../../n1-main/m2-bll/reducers/cards-reducer';
import {useParams} from 'react-router-dom';
import {DeleteCardModal} from './Modals/DeleteCardModal';

export const CardsTable = () => {
    const userId = useAppSelector(state => state.profile._id)
    const cards = useAppSelector(state => state.cards.cards)

    const dispatch = useAppDispatch()
    const {packId} = useParams<'packId'>();

    const updateCard = (id: string) => {
        if (packId) {
            dispatch(updateCardTC(id, packId))
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 400}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Question</TableCell>
                        <TableCell align="right">Answer</TableCell>
                        <TableCell align="right">Grade</TableCell>
                        <TableCell align="right">Updated</TableCell>
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
                            <TableCell align="right"><Rating name="read-only" value={card.grade} readOnly/>
                            </TableCell>
                            <TableCell align="right">{formatDate(card.updated)}</TableCell>
                            <TableCell className={styles.buttonBlock}>
                                <DeleteCardModal
                                    cardId={card._id}
                                    packId={card.cardsPack_id}
                                    cardQuestion={card.question}
                                    deleteCardPackButton={
                                        <Button
                                            disabled={userId !== card.user_id}
                                            color="error"
                                            size="small"
                                            startIcon={<DeleteIcon/>}>
                                            Delete
                                        </Button>
                                    }/>

                                <Button
                                    disabled={userId !== card.user_id}
                                    onClick={() => updateCard(card._id)}
                                    color="secondary" size="small"
                                    startIcon={<BorderColorIcon/>}>
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};