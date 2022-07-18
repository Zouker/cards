import React, {ReactNode, useState} from 'react';
import {Checkbox, TextField} from '@mui/material';
import styles from '../../../n1-main/m1-ui/common/c7-Modal/Modal.module.css'
import {BasicModal} from '../../../n1-main/m1-ui/common/c7-Modal/Modal';
import {addPackTC} from '../../../n1-main/m2-bll/reducers/packs-reducer';
import {useAppDispatch} from '../../../n1-main/m2-bll/store';

type AddNewPackType = {
    addNewCardPackButton: ReactNode
}

export const AddNewPackModal: React.FC<AddNewPackType> = ({addNewCardPackButton}) => {
    const [newPackName, setNewPackName] = useState('')
    const [isPrivate, setPrivate] = React.useState(false)
    const dispatch = useAppDispatch()

    const addNewCardPack = () => {
        dispatch(addPackTC(newPackName, 'deckCover', isPrivate))
        setNewPackName('')
    }

    return (
        <BasicModal
            operationTitle={'Add new Pack'}
            buttonName={'Save'}
            handleOperation={addNewCardPack}
            openModalButton={addNewCardPackButton}>
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
};
