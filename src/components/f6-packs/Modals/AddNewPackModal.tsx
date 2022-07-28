import React, {useState} from 'react';
import {Checkbox, IconButton, TextField} from '@mui/material';
import styles from '../../../common/c7-Modal/Modal.module.css'
import {BasicModal} from '../../../common/c7-Modal/Modal';
import {addPackTC} from '../../../bll/reducers/packs-reducer';
import {useAppDispatch} from '../../../bll/store';
import {useNavigate} from 'react-router-dom';
import {InputTypeFile} from '../../f3-profile/InputTypeFile';
import {PhotoCamera} from '@mui/icons-material';

type AddNewPackType = {
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
}

export const AddNewPackModal: React.FC<AddNewPackType> = React.memo(({isOpenModal, setIsOpenModal}) => {
    const [newPackName, setNewPackName] = useState('')
    const [newDeckCover, setNewDeckCover] = useState('')
    const [isPrivate, setPrivate] = React.useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const addNewCardPack = () => {
        dispatch(addPackTC(newPackName, newDeckCover, isPrivate))
        setNewPackName('')
        navigate('/packs')
    }

    const addDeckCover = (data: string) => {
        setNewDeckCover(data)
    }

    return (
        <BasicModal isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    handleCloseOperation={()=>setNewDeckCover('')}
                    operationTitle={'Add new Pack'}
                    buttonName={'Save'}
                    handleOperation={addNewCardPack}>
            <>
                <TextField className={styles.addItemField}
                           label="Title"
                           variant="standard"
                           color="secondary"
                           value={newPackName}
                           onChange={(e) => setNewPackName(e.currentTarget.value)}/>

                <div className={styles.private}>
                    <Checkbox checked={isPrivate}
                              onChange={(e) => setPrivate(e.currentTarget.checked)}
                              color="secondary"/>
                    Private pack
                </div>
                <div className={styles.addDeckButton}>
                    <InputTypeFile uploadImage={addDeckCover}>
                        {newDeckCover !== '' &&
                            <img
                                src={newDeckCover}
                                style={{
                                    width: '100px',
                                }}
                                alt="Deck cover"
                            />}
                        <IconButton component="span" color={'secondary'} sx={{right: '30px', top: '-4px'}}>
                            <PhotoCamera/>
                        </IconButton>
                    </InputTypeFile>
                </div>
            </>
        </BasicModal>
    )
        ;
});
