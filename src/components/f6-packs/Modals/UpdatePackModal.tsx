import React, {useEffect, useState} from 'react';
import {BasicModal} from '../../../common/c7-Modal/Modal';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {updatePackTC} from '../../../bll/reducers/packs-reducer';
import styles from '../../../common/c7-Modal/Modal.module.css';
import {TextField} from '@mui/material';
import {PackType} from '../../../api/packsAPI';

type UpdatePackModalType = {
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
    pack: PackType | null
}


export const UpdatePackModal: React.FC<UpdatePackModalType> = ({
                                                                   pack,
                                                                   isOpenModal,
                                                                   setIsOpenModal,
                                                               }) => {
    const packName = useAppSelector(state => state.packs.params.packName)

    const [newPackName, setNewPackName] = useState<string>(pack ? pack.name : '')
    const dispatch = useAppDispatch()

    useEffect(() => {
        pack && setNewPackName(pack.name)
    }, [pack])

    const updateCardPack = () => {
        pack && dispatch(updatePackTC(pack._id, newPackName))
        setNewPackName(newPackName)
        setIsOpenModal(false)
    }

    return (
        <BasicModal operationTitle={'Update Pack'}
                    buttonName={'Save'}
                    handleOperation={updateCardPack}
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
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
