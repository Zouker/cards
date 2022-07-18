import React, {ReactNode} from 'react';
import {BasicModal} from '../../../n1-main/m1-ui/common/c7-Modal/Modal';
import {useAppDispatch} from '../../../n1-main/m2-bll/store';
import {deleteCardTC} from '../../../n1-main/m2-bll/reducers/cards-reducer';

type DeletePackModalType = {
    cardQuestion: string
    deleteCardPackButton: ReactNode
    cardId: string
    packId: string
}

export const DeleteCardModal: React.FC<DeletePackModalType> = ({
                                                                   cardId,
                                                                   packId,
                                                                   cardQuestion,
                                                                   deleteCardPackButton
                                                               }) => {
    const dispatch = useAppDispatch()

    const deleteCardPack = () => {
        dispatch(deleteCardTC(cardId, packId))
    }

    return (
        <BasicModal operationTitle={'Delete Card'}
                    buttonName={'Delete'}
                    handleOperation={deleteCardPack}
                    openModalButton={deleteCardPackButton}
        >
            <div>Do you really want to remove <b>{cardQuestion}</b>?</div>
            <div>The card will be removed.</div>
        </BasicModal>
    );
};
