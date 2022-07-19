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
import {useAppSelector} from '../../bll/store';
import {DeleteCardModal} from './Modals/DeleteCardModal';
import {UpdateCardModal} from './Modals/UpdateCardModal';

export const CardsTable = () => {
    const userId = useAppSelector(state => state.profile._id)
    const cards = useAppSelector(state => state.cards.cards)

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
                                    deleteCardButton={
                                        <Button
                                            disabled={userId !== card.user_id}
                                            color="error"
                                            size="small"
                                            startIcon={<DeleteIcon/>}>
                                            Delete
                                        </Button>
                                    }/>
                                <UpdateCardModal cardId={card._id}
                                                 packId={card.cardsPack_id}
                                                 cardQuestion={card.question}
                                                 cardAnswer={card.answer}
                                                 updateCardButton={
                                                     <Button
                                                         disabled={userId !== card.user_id}
                                                         color="secondary" size="small"
                                                         startIcon={<BorderColorIcon/>}>
                                                         Edit
                                                     </Button>
                                                 }/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};