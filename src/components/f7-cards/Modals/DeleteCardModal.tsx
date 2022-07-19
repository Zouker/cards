import React, {ReactNode} from 'react';
import {BasicModal} from '../../../common/c7-Modal/Modal';
import {useAppDispatch} from '../../../bll/store';
import {deleteCardTC} from '../../../bll/reducers/cards-reducer';

type DeleteCardType = {
    cardQuestion: string
    deleteCardButton: ReactNode
    cardId: string
    packId: string
}

export const DeleteCardModal: React.FC<DeleteCardType> = ({
                                                              cardId,
                                                              packId,
                                                              cardQuestion,
                                                              deleteCardButton
                                                          }) => {
    const dispatch = useAppDispatch()

    const deleteCard = () => {
        dispatch(deleteCardTC(cardId, packId))
    }

    return (
        <BasicModal operationTitle={'Delete Card'}
                    buttonName={'Delete'}
                    handleOperation={deleteCard}
                    openModalButton={deleteCardButton}
        >
            <div>Do you really want to remove <b>{cardQuestion}</b>?</div>
            <div>The card will be removed.</div>
        </BasicModal>
    );
};
