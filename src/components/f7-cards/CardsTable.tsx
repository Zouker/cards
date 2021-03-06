import React, {useState} from 'react';
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
import {CardType} from '../../api/cardsAPI';
import {DeleteCardModal} from './Modals/DeleteCardModal';
import {UpdateCardModal} from './Modals/UpdateCardModal';

export const CardsTable = () => {
    const userId = useAppSelector(state => state.profile._id)
    const cards = useAppSelector(state => state.cards.cards)

    const [deleteCardData, setDeleteCardData] = useState<CardType | null>(null);
    const [updateCardData, setUpdateCardData] = useState<CardType | null>(null);
    const [isOpenModalCardDelete, setIsOpenModalCardDelete] = useState(false)
    const [isOpenModalCardUpdate, setIsOpenModalCardUpdate] = useState(false)

    const openModalDeleteCard = (card: CardType) => {
        setIsOpenModalCardDelete(true)
        setDeleteCardData(card)
    }

    const openModalUpdateCard = (card: CardType) => {
        setIsOpenModalCardUpdate(true)
        setUpdateCardData(card)
    }

    return (
        <>
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
                                    <Button
                                        onClick={() => openModalDeleteCard(card)}
                                        disabled={userId !== card.user_id}
                                        color="error"
                                        size="small"
                                        startIcon={<DeleteIcon/>}>
                                        Delete
                                    </Button>
                                    <Button
                                        onClick={() => openModalUpdateCard(card)}
                                        disabled={userId !== card.user_id}
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
            {deleteCardData && <DeleteCardModal
                isOpenModal={isOpenModalCardDelete}
                setIsOpenModal={setIsOpenModalCardDelete}
                cardId={deleteCardData._id}
                packId={deleteCardData.cardsPack_id}
                cardQuestion={deleteCardData.question}
            />}
            {updateCardData && <UpdateCardModal
                isOpenModal={isOpenModalCardUpdate}
                setIsOpenModal={setIsOpenModalCardUpdate}
                cardId={updateCardData._id}
                packId={updateCardData.cardsPack_id}
                cardQuestion={updateCardData.question}
                cardAnswer={updateCardData.answer}
            />}
        </>
    );
};