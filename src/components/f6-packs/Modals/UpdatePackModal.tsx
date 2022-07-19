import React, {ReactNode, useState} from 'react';
import {BasicModal} from '../../../common/c7-Modal/Modal';
import {useAppDispatch} from '../../../bll/store';
import {updatePackTC} from '../../../bll/reducers/packs-reducer';
import styles from '../../../common/c7-Modal/Modal.module.css';
import {TextField} from '@mui/material';

type UpdatePackModalType = {
    packName: string
    updateCardPackButton: ReactNode
    cardPackId: string
}

export const UpdatePackModal: React.FC<UpdatePackModalType> = ({
                                                                   cardPackId,
                                                                   packName,
                                                                   updateCardPackButton
                                                               }) => {
    const [newPackName, setNewPackName] = useState(packName)
    const dispatch = useAppDispatch()

    const updateCardPack = () => {
        dispatch(updatePackTC(cardPackId, newPackName))
        setNewPackName(newPackName)
    }

    return (
        <BasicModal operationTitle={'Update Pack'}
                    buttonName={'Save'}
                    handleOperation={updateCardPack}
                    openModalButton={updateCardPackButton}
        >
            <TextField className={styles.addItemField}
                       label="Title"
                       variant="standard"
                       color="secondary"
                       value={newPackName}
                       onChange={(e) => setNewPackName(e.currentTarget.value)}/>
            <div>Do you really want to change <b>{packName}</b>?</div>
        </BasicModal>
    );
};
