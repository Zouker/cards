import React, {ReactNode, useState} from 'react';
import {BasicModal} from '../../../n1-main/m1-ui/common/c7-Modal/Modal';
import {useAppDispatch} from '../../../n1-main/m2-bll/store';
import {updateCardTC} from '../../../n1-main/m2-bll/reducers/cards-reducer';
import {TextField} from '@mui/material';
import styles from '../../../n1-main/m1-ui/common/c7-Modal/Modal.module.css';

type UpdateCardType = {
    cardQuestion: string
    cardAnswer: string
    updateCardButton: ReactNode
    cardId: string
    packId: string
}

export const UpdateCardModal: React.FC<UpdateCardType> = ({
                                                              cardId,
                                                              packId,
                                                              cardQuestion,
                                                              cardAnswer,
                                                              updateCardButton
                                                          }) => {

    const [newCardQuestion, setNewCardQuestion] = useState(cardQuestion)
    const [newCardAnswer, setNewCardAnswer] = useState(cardAnswer)

    const dispatch = useAppDispatch()

    const updateCard = () => {
        if (packId) {
            dispatch(updateCardTC({_id: cardId, question: newCardQuestion, answer: newCardAnswer}, packId))
        }
    }

    return (
        <BasicModal operationTitle={'Update Card'}
                    buttonName={'Save'}
                    handleOperation={updateCard}
                    openModalButton={updateCardButton}
        >
            <TextField
                className={styles.addItemField}
                label="Question"
                variant="standard"
                color="secondary"
                value={newCardQuestion}
                onChange={(e) => setNewCardQuestion(e.currentTarget.value)}/>
            <TextField
                className={styles.addItemField}
                label="Answer"
                variant="standard"
                color="secondary"
                value={newCardAnswer}
                onChange={(e) => setNewCardAnswer(e.currentTarget.value)}/>
            <div>Do you really want to change <b>{cardQuestion}</b> and <b>{cardAnswer}</b>?</div>
        </BasicModal>
    );
};
