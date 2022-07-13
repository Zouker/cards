import React, {ChangeEvent} from 'react';
import {Button, Checkbox, IconButton, TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './AddNewItem.module.css'
import {useParams} from 'react-router-dom';

type AddNewItemPropsType = {
    handleClose: () => void
    addNewItem: () => void
    value: string
    value2?: string
    onChangeHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onChangeHandler2?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    isPrivateHandler?: (e: ChangeEvent<HTMLInputElement>) => void
    checked?: boolean
    title: string
}

export const AddNewItem: React.FC<AddNewItemPropsType> = ({
                                                              handleClose,
                                                              addNewItem,
                                                              value,
                                                              value2,
                                                              onChangeHandler,
                                                              onChangeHandler2,
                                                              isPrivateHandler,
                                                              checked,
                                                              title
                                                          }) => {

    const {packsId} = useParams<'packsId'>();

    return (
        <div>
            <div className={styles.title}>
                {title}
                <IconButton onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
            </div>
            {packsId
                ? <>
                    <TextField className={styles.addItemField} id="standard-basic" label="Question" variant="standard"
                               color="secondary" value={value} onChange={onChangeHandler}/>
                    <TextField className={styles.addItemField} id="standard-basic" label="Answer" variant="standard"
                               color="secondary" value={value2} onChange={onChangeHandler2}/>
                </>
                : <>
                    <TextField className={styles.addItemField} id="standard-basic" label="Title" variant="standard"
                               color="secondary" value={value} onChange={onChangeHandler}/>

                    <div className={styles.private}>
                        <Checkbox checked={checked} onChange={isPrivateHandler} color="secondary"/>
                        Private pack
                    </div>
                </>
            }
            <div className={styles.buttonsBlock}>
                <Button onClick={handleClose} color="secondary" variant="contained">Cancel</Button>
                <Button onClick={addNewItem} color="secondary" variant="contained">Save</Button>
            </div>
        </div>
    );
};
