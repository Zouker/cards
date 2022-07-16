import React, {ChangeEvent, useEffect} from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button, Rating, TableCell, TablePagination} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import styles from './Cards.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {useAppDispatch, useAppSelector} from '../../n1-main/m2-bll/store';
import {
    addCardTC,
    deleteCardTC,
    getCardsTC,
    searchAnswerAC,
    searchQuestionAC,
    setCardsPageAC,
    setCardsPageCountAC,
    updateCardTC
} from '../../n1-main/m2-bll/reducers/cards-reducer';
import {SearchAppBar} from '../../n1-main/m1-ui/common/c5-SearchField/SearchField';
import {useNavigate, useParams} from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import {BasicModal} from '../../n1-main/m1-ui/common/c7-Modal/Modal';
import {AddNewItem} from '../../n1-main/m1-ui/common/c7-Modal/AddNewItem';
import {formatDate} from '../f6-packs/Packs';

export const Cards = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.cards.cards)
    const cardsTotalCount = useAppSelector(state => state.cards.params.cardsTotalCount)
    const page = useAppSelector(state => state.cards.params.page)
    const pageCount = useAppSelector(state => state.cards.params.pageCount)
    const cardQuestion = useAppSelector(state => state.cards.params.cardQuestion)
    const cardAnswer = useAppSelector(state => state.cards.params.cardAnswer)
    const userId = useAppSelector(state => state.profile._id)
    const packUserId = useAppSelector(state => state.cards.packUserId)

    const {packsId} = useParams<'packsId'>();

    const [open, setOpen] = React.useState(false);
    const [newCardQuestion, setNewCardQuestion] = React.useState('')
    const [newCardAnswer, setNewCardAnswer] = React.useState('')
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);
    const [searchCardValue, setSearchCardValue] = React.useState('Question');
    const handleChangeSearchCardValue = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (searchCardValue === 'Question') {
            dispatch(searchQuestionAC(e.currentTarget.value))
        } else {
            dispatch(searchAnswerAC(e.currentTarget.value))
        }
    };

    const clearValue = (value: string) => {
        if (searchCardValue === 'Question') dispatch(searchQuestionAC(''))
        else dispatch(searchAnswerAC(''))
        setSearchCardValue(value)
    }

    const debouncedValue = useDebounce((searchCardValue === 'Question') ? cardQuestion : cardAnswer, 1000)

    const addNewCard = () => {
        if (packsId) {
            dispatch(addCardTC({cardsPack_id: packsId, question: newCardQuestion, answer: newCardAnswer}))
            setOpen(false)
            setNewCardQuestion('')
            setNewCardAnswer('')
        }
    }

    const deleteCard = (id: string) => {
        if (packsId) {
            dispatch(deleteCardTC(id, packsId))
        }
    }

    const updateCard = (id: string) => {
        if (packsId) {
            dispatch(updateCardTC(id, packsId))
        }
    }

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        dispatch(setCardsPageAC(newPage + 1))
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(setCardsPageCountAC(Number(event.target.value)))
        dispatch(setCardsPageAC(1))
    };

    useEffect(() => {
        if (packsId) {
            dispatch(getCardsTC(packsId))
        }
    }, [dispatch, packsId, page, pageCount, debouncedValue]);

    const returnToPacks = () => {
        navigate('/packs')
    }

    return (
        <div className={styles.tableWrapper}>
            <div className={styles.container}>
                <h1 className={styles.title}>Cards name</h1>
                <SearchAppBar radioValue={searchCardValue}
                              onChangeRadio={clearValue}
                              disabled={packUserId !== userId}
                              title={'add new card'}
                              addNewItem={handleOpen}
                              goBack={returnToPacks}
                              value={searchCardValue === 'Question' ? cardQuestion : cardAnswer}
                              onChange={handleChangeSearchCardValue}
                />
                <BasicModal open={open} setOpen={setOpen}>
                    <AddNewItem
                        title={'Add new card'}
                        handleClose={handleClose}
                        addNewItem={addNewCard}
                        value={newCardQuestion}
                        value2={newCardAnswer}
                        onChangeHandler={(e) => setNewCardQuestion(e.currentTarget.value)}
                        onChangeHandler2={(e) => setNewCardAnswer(e.currentTarget.value)}
                    />
                </BasicModal>
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
                                            disabled={userId !== card.user_id}
                                            onClick={() => deleteCard(card._id)} color="error"
                                            size="small"
                                            startIcon={<DeleteIcon/>}>
                                            Delete
                                        </Button>
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
                <div className={styles.paginatorBlock}>
                    <TablePagination
                        count={cardsTotalCount}
                        page={page - 1}
                        onPageChange={handleChangePage}
                        rowsPerPage={pageCount}
                        onRowsPerPageChange={handleChangeRowsPerPage}/>
                </div>
            </div>
        </div>
    )
};

