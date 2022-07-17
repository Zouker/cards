import * as React from 'react';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../n1-main/m2-bll/store';
import {
    addPackTC,
    deletePackTC,
    getPacksTC,
    isMyPackAC,
    searchAC,
    setMinMaxAC,
    setPageAC,
    setPageCountAC
} from '../../n1-main/m2-bll/reducers/packs-reducer';
import styles from './Packs.module.css'
import {Button, TablePagination} from '@mui/material';
import {RangeSlider} from '../../n1-main/m1-ui/common/c4-RangeSlider/RangeSlider';
import {SearchAppBar} from '../../n1-main/m1-ui/common/c5-SearchField/SearchField';
import {Navigate, useNavigate} from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import {BasicModal} from '../../n1-main/m1-ui/common/c7-Modal/Modal';
import {AddNewItem} from '../../n1-main/m1-ui/common/c7-Modal/AddNewItem';
import {DeleteItem} from '../../n1-main/m1-ui/common/c7-Modal/DeleteItemModal';
import {LearnPage} from '../f8-learn/LearnPage';
import {PacksTable} from './PacksTable';


export const formatDate = (date: Date | string | number) => {
    return new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString()
}

export const Packs = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const page = useAppSelector(state => state.packs.params.page)
    const pageCount = useAppSelector(state => state.packs.params.pageCount)
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const min = useAppSelector(state => state.packs.params.min)
    const max = useAppSelector(state => state.packs.params.max)
    const isMyPack = useAppSelector(state => state.packs.isMyPack)
    const packName = useAppSelector(state => state.packs.params.packName)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const [value, setValue] = React.useState<number | number[]>([min, max]);
    const [openAddNewItemModal, setOpenAddNewItemModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [openLearnModal, setOpenLearnModal] = React.useState(false);
    const [learnId, setLearnId] = React.useState<string | null>(null)
    const [deleteId, setDeleteId] = React.useState<string | null>(null)
    const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
    const [newPackName, setNewPackName] = React.useState('')
    const [isPrivate, setPrivate] = React.useState(false)
    const handleOpen = () => setOpenAddNewItemModal(true);
    const handleClose = () => setOpenAddNewItemModal(false);

    const handleCloseLearnModal = () => setOpenLearnModal(false);

    const debouncedValue = useDebounce<string>(packName, 1000)

    const addNewCardsPack = () => {
        dispatch(addPackTC(newPackName, 'deckCover', isPrivate))
        setOpenAddNewItemModal(false)
        setNewPackName('')
    }

    const deletePack = (id: string) => {
        dispatch(deletePackTC(id))
        setOpenDeleteModal(false)
        setDeleteId(null)
    }

    // All Packs and My Packs
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

    // Min and Max scale of cards in pack
    const handleChangeMinMax = (event: React.SyntheticEvent | Event, value: number | Array<number>) => {
        if (Array.isArray(value)) {
            dispatch(setMinMaxAC(value[0], value[1]));
            setValue([value[0], value[1]])
        }
    };

    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch, debouncedValue, isMyPack, min, max, pageCount, page])

    const returnToProfile = () => {
        navigate('/profile')
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={styles.wrapper}>
            {openAddNewItemModal && <BasicModal open={openAddNewItemModal} setOpen={setOpenAddNewItemModal}>
                <AddNewItem title={'Add new pack'}
                            addNewItem={addNewCardsPack}
                            handleClose={handleClose}
                            value={newPackName}
                            onChangeHandler={(e) => setNewPackName(e.currentTarget.value)}
                            checked={isPrivate}
                            isPrivateHandler={(e) => setPrivate(e.currentTarget.checked)}/>
            </BasicModal>}
            {openLearnModal && learnId &&
                <BasicModal open={openLearnModal} setOpen={setOpenLearnModal}>
                    <LearnPage id={learnId} handleClose={handleCloseLearnModal}/>
                </BasicModal>}
            {/*  {openUpdateModal
                                                ?
                                                <BasicModal open={openUpdateModal} setOpen={setOpenUpdateModal}>
                                                <UpdateItem title={'Add new title'}
                                                            //id={deleteId}
                                                            updateItem={updatePack}
                                                            handleClose={handleClose}
                                                            handleOpen={handleOpen}
                                                />

                                            </BasicModal>
                                                : null}*/}
            {openDeleteModal && deleteId ?
                <BasicModal open={openDeleteModal} setOpen={setOpenDeleteModal}>
                    <DeleteItem title={'Do you really want to delete this pack?'}
                                id={deleteId}
                                handleDelete={deletePack}
                                handleClose={handleClose}
                                handleOpen={handleOpen}
                    />

                </BasicModal> : null}
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <div className={styles.sidebarBlock}>
                        <p>Show packs cards</p>
                        <div>
                            <Button variant={isMyPack ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={myPacksHandler}>
                                My
                            </Button>
                            <Button variant={!isMyPack ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={allPacksHandler}>
                                All
                            </Button>
                        </div>
                    </div>
                    <div>
                        <p className={styles.sidebarBlock}>Number of cards</p>
                        <div className={styles.rangeSlider}>
                            <RangeSlider
                                min={minCardsCount}
                                max={maxCardsCount}
                                value={value}
                                onChange={(e, newValue) => setValue(newValue)}
                                onChangeCommitted={handleChangeMinMax}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className={styles.title}>Packs List</h1>
                    <SearchAppBar title={'add new pack'}
                                  addNewItem={handleOpen}
                                  goBack={returnToProfile}
                                  value={packName}
                                  onChange={(e) => {
                                      dispatch(searchAC(e.currentTarget.value))
                                  }}
                    />
                    <PacksTable
                        setLearnId={setLearnId}
                        setOpenLearnModal={setOpenLearnModal}
                        setDeleteId={setDeleteId}
                        setOpenDeleteModal={setOpenDeleteModal}/>
                    <div className={styles.paginatorBlock}>
                        <TablePagination
                            count={cardPacksTotalCount}
                            page={page - 1}
                            onPageChange={handleChangePage}
                            rowsPerPage={pageCount}
                            onRowsPerPageChange={handleChangeRowsPerPage}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
