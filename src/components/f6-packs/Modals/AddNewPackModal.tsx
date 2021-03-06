import React, {useState} from 'react';
import {Checkbox, TextField} from '@mui/material';
import styles from '../../../common/c7-Modal/Modal.module.css'
import {BasicModal} from '../../../common/c7-Modal/Modal';
import {addPackTC} from '../../../bll/reducers/packs-reducer';
import {useAppDispatch} from '../../../bll/store';
import {useNavigate} from 'react-router-dom';

type AddNewPackType = {
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
}

export const AddNewPackModal: React.FC<AddNewPackType> = React.memo(({isOpenModal, setIsOpenModal}) => {
    const [newPackName, setNewPackName] = useState('')
    const [isPrivate, setPrivate] = React.useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const addNewCardPack = () => {
        dispatch(addPackTC(newPackName, 'deckCover', isPrivate))
        setNewPackName('')
        navigate('/packs')
    }

    return (
        <BasicModal isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
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
            </>
        </BasicModal>
    );
});
