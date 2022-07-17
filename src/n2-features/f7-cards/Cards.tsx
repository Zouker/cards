import React, {ChangeEvent, useEffect} from 'react';
import {TablePagination} from '@mui/material';
import styles from './Cards.module.css'
import {useAppDispatch, useAppSelector} from '../../n1-main/m2-bll/store';
import {
    addCardTC,
    getCardsTC,
    searchAnswerAC,
    searchQuestionAC,
    setCardsPageAC,
    setCardsPageCountAC
} from '../../n1-main/m2-bll/reducers/cards-reducer';
import {SearchAppBar} from '../../n1-main/m1-ui/common/c5-SearchField/SearchField';
import {useNavigate, useParams} from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import {BasicModal} from '../../n1-main/m1-ui/common/c7-Modal/Modal';
import {AddNewItem} from '../../n1-main/m1-ui/common/c7-Modal/AddNewItem';
import {CardsTable} from './CardsTable';

export const Cards = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.profile._id)
    const cardsTotalCount = useAppSelector(state => state.cards.params.cardsTotalCount)
    const page = useAppSelector(state => state.cards.params.page)
    const pageCount = useAppSelector(state => state.cards.params.pageCount)
    const cardQuestion = useAppSelector(state => state.cards.params.cardQuestion)
    const cardAnswer = useAppSelector(state => state.cards.params.cardAnswer)
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
                <CardsTable/>
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

