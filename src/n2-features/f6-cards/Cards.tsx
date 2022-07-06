import React, {useEffect} from 'react';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Button, Input, TableCell} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import s from './card.module.css'
import styles from "../packs/Packs.module.css";
import {CardsPagination} from "../../n1-main/m1-ui/common/c6-Pagination/CardsPagination";
import {CardsSelect} from "../../n1-main/m1-ui/common/c7-Select/CardsSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { updatePackTC} from "../../n1-main/m2-bll/reducers/packs-reducer";
import {useAppDispatch, useAppSelector} from "../../n1-main/m2-bll/store";
import {deleteСardsTC, getCardsTC} from "../../n1-main/m2-bll/reducers/card-reducer";
import {Preloader} from "../../n1-main/m1-ui/common/loader/Loader";
import {SearchAppBar} from "../../n1-main/m1-ui/common/c5-SearchField/SearchField";
import {useParams} from "react-router-dom";


export const Cards = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const cards = useAppSelector(state => state.cards.cards)

    const {cardsId} = useParams(); //получение id юзера на которого мы кликнули

    useEffect(()=> {
        if(cardsId){
            dispatch(getCardsTC(cardsId))
        }
    },[]);

    const deletePack = (id: string) => {
        dispatch(deleteСardsTC(id))
    }

    const updatePack = (id: string) => {
        const name = 'UPDATED_NAME'
        dispatch(updatePackTC(id, name))
    }
if(!cards.length) {
    return <div><span>LOADING.....</span></div>
}
    // function createData(
    //     Question: string,
    //     Answer: string,
    //     Update: number,
    //     Grade: any,
    //     Actions: string,
    // ) {
    //     return {Question, Answer, Update, Grade, Actions};
    // }
    //
    // const rows = [
    //     createData('вопрос ', 'ответ', 44, 24, id),
    //
    // ];

    return (
        <div className={s.tableWrapper}>
            {status === 'loading' && <Preloader/>}
            <Paper className={s.cards} elevation={3}>
                <h2>Cards name</h2>

                <SearchAppBar title={'add new card'}/>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 500}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Question</TableCell>
                                <TableCell align="right">Answer</TableCell>
                                <TableCell align="right"> Update</TableCell>
                                <TableCell align="right"> Grade</TableCell>
                                <TableCell align="right">Actions</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cards.map((card) => (
                                <TableRow
                                    key={card._id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {card.question}
                                    </TableCell>
                                    <TableCell align="right">{card.answer}</TableCell>
                                    <TableCell align="right">{card.updated}</TableCell>
                                    <TableCell align="right">{card.grade}</TableCell>
                                    <td className={s.buttonBlock}>
                                        <Button onClick={() => deletePack(card._id)} color="secondary"
                                                size="small"
                                                startIcon={<DeleteIcon/>}>
                                            Delete
                                        </Button>
                                        <Button onClick={() => updatePack(card._id)} color="secondary" size="small"
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
                    <div>
                        <CardsPagination/>
                    </div>
                    <div className={styles.selector}>
                        Show
                        <CardsSelect/>
                        per Page
                    </div>
                </div>
            </Paper>
        </div>

    )
};

