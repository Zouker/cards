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
import {
    addPackTC,
    deletePackTC,
    getPacksTC,
    isMyPackAC,
    searchAC,
    setPageAC,
    setPageCountAC,
    updatePackTC
} from '../../n1-main/m2-bll/reducers/packs-reducer';
import styles from './Packs.module.css'
import {Button, TablePagination} from '@mui/material';
import {RangeSlider} from '../../n1-main/m1-ui/common/c4-RangeSlider/RangeSlider';
import {SearchAppBar} from '../../n1-main/m1-ui/common/c5-SearchField/SearchField';
import {NavLink, useNavigate} from 'react-router-dom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DeleteIcon from '@mui/icons-material/Delete';
import useDebounce from '../../hooks/useDebounce';

export const Packs = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.packs.cardPacks)
    const userId = useAppSelector(state => state.profile._id)
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const page = useAppSelector(state => state.packs.params.page)
    const pageCount = useAppSelector(state => state.packs.params.pageCount)
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const min = useAppSelector(state => state.packs.params.min)
    const max = useAppSelector(state => state.packs.params.max)
    const isMyPack = useAppSelector(state => state.packs.isMyPack)
    const packName = useAppSelector(state => state.packs.params.packName)

    const [value, setValue] = React.useState<number[]>([min, max]);

    const debouncedValue = useDebounce<string>(packName, 1000)

    const addNewCardsPack = () => {
        dispatch(addPackTC('DEFAULT_NAME', 'deckCover', false))
    }

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

    // ALL Packs and My Packs
    const allPacksHandler = () => {
        dispatch(isMyPackAC(false))
    };

    const myPacksHandler = () => {
        dispatch(isMyPackAC(true))
    }

    // Packs Paginator
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        dispatch(setPageAC(newPage + 1))
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(setPageCountAC(Number(event.target.value)))
        dispatch(setPageAC(1))
    };

    // Min and Max Selector
    const handleChangeMinMax = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - 1), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + 1)]);
        }
    };

    useEffect(() => {
        dispatch(getPacksTC())
    }, [debouncedValue, isMyPack, min, max, pageCount, page])

    const returnToProfile = () => {
        navigate({pathname: '/profile'})
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <div>
                        <p className={styles.title}>Show packs cards</p>
                        <Button variant={isMyPack ? 'contained' : 'outlined'} color="secondary"
                                onClick={myPacksHandler}>
                            My
                        </Button>
                        <Button variant={!isMyPack ? 'contained' : 'outlined'} color="secondary"
                                onClick={allPacksHandler}>
                            All
                        </Button>
                    </div>
                    <div>
                        <p className={styles.title}>Number of cards</p>
                        <div className={styles.rangeSlider}>
                            <RangeSlider value={value} onChange={handleChangeMinMax}/>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Packs List</h1>
                    <SearchAppBar title={'add new pack'} addNewItem={addNewCardsPack} goBack={returnToProfile}
                                  value={packName} onChange={(e) => {
                        dispatch(searchAC(e.currentTarget.value))
                    }}/>
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
                                            <NavLink to={'/cards/' + pack._id}> {pack.name}</NavLink>
                                        </TableCell>
                                        <TableCell align="right">{pack.user_name}</TableCell>
                                        <TableCell align="right">{pack.cardsCount}</TableCell>
                                        <TableCell align="right">{pack.grade}</TableCell>
                                        <TableCell align="right">{pack.created}</TableCell>
                                        <TableCell align="right">{pack.updated}</TableCell>
                                        <td className={styles.buttonBlock}>
                                            <Button disabled={userId !== pack.user_id}
                                                    onClick={() => deletePack(pack._id)}
                                                    color="error"
                                                    size="small"
                                                    startIcon={<DeleteIcon/>}>
                                                Delete
                                            </Button>
                                            <Button disabled={userId !== pack.user_id}
                                                    onClick={() => updatePack(pack._id)} color="secondary" size="small"
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
                        <TablePagination count={cardPacksTotalCount} page={page} onPageChange={handleChangePage}
                                         rowsPerPage={pageCount} onRowsPerPageChange={handleChangeRowsPerPage}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
