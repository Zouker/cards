import React, {ReactNode} from 'react';
import {TextField} from '@mui/material';
import styles from '../../../common/c7-Modal/Modal.module.css'
import {BasicModal} from '../../../common/c7-Modal/Modal';
import {useAppDispatch} from '../../../bll/store';
import {addCardTC} from '../../../bll/reducers/cards-reducer';
import {useParams} from 'react-router-dom';

type AddNewCardType = {
    addNewCardButton: ReactNode
}

export const AddNewCardModal: React.FC<AddNewCardType> = ({addNewCardButton}) => {
    const [newCardQuestion, setNewCardQuestion] = React.useState('')
    const [newCardAnswer, setNewCardAnswer] = React.useState('')
    const dispatch = useAppDispatch()
    const {packId} = useParams<'packId'>();

    const addNewCard = () => {
        if (packId) {
            dispatch(addCardTC({cardsPack_id: packId, question: newCardQuestion, answer: newCardAnswer}))
            setNewCardQuestion('')
            setNewCardAnswer('')
        }
    }

    return (
        <BasicModal
            operationTitle={'Add new Card'}
            buttonName={'Save'}
            handleOperation={addNewCard}
            openModalButton={addNewCardButton}>

            <>
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
            </>
        </BasicModal>
    );
};
