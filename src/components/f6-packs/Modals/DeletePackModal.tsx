import React, {ReactNode} from 'react';
import {BasicModal} from '../../../common/c7-Modal/Modal';
import {useAppDispatch} from '../../../bll/store';
import {deletePackTC} from '../../../bll/reducers/packs-reducer';

type DeletePackModalType = {
    packName: string
    deleteCardPackButton: ReactNode
    cardPackId: string
}

export const DeletePackModal: React.FC<DeletePackModalType> = ({
                                                                   cardPackId,
                                                                   packName,
                                                                   deleteCardPackButton
                                                               }) => {
    const dispatch = useAppDispatch()

    const deleteCardPack = () => {
        dispatch(deletePackTC(cardPackId))
    }

    return (
        <BasicModal operationTitle={'Delete Pack'}
                    buttonName={'Delete'}
                    handleOperation={deleteCardPack}
                    openModalButton={deleteCardPackButton}
        >
            <div>Do you really want to remove <b>{packName}</b>?</div>
            <div>All cards will be excluded from this course.</div>
        </BasicModal>
    );
};
