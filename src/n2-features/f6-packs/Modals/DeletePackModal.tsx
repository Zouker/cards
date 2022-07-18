import React, {ReactNode} from 'react';
import {BasicModal} from '../../../n1-main/m1-ui/common/c7-Modal/Modal';
import {useAppDispatch} from '../../../n1-main/m2-bll/store';
import {deletePackTC} from '../../../n1-main/m2-bll/reducers/packs-reducer';

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
