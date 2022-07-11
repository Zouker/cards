import React, {ChangeEvent} from 'react';
import {Button, Checkbox, IconButton, TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './AddNewItem.module.css'

type AddNewItemPropsType = {
    handleClose: () => void
    addNewItem: () => void
    value: string
    onChangeHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    isPrivateHandler: (e: ChangeEvent<HTMLInputElement>) => void
    checked: boolean
}

export const AddNewItem: React.FC<AddNewItemPropsType> = ({
                                                              handleClose,
                                                              addNewItem,
                                                              value,
                                                              onChangeHandler,
                                                              isPrivateHandler,
                                                              checked
                                                          }) => {

    return (
        <div>
            <div className={styles.title}>
                Add new pack
                <IconButton onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
            </div>

            <TextField className={styles.addItemField} id="standard-basic" label="Title" variant="standard"
                       color="secondary" value={value} onChange={onChangeHandler}/>

            <div className={styles.private}>
                <Checkbox checked={checked} onChange={isPrivateHandler} color="secondary"/>
                Private pack
            </div>
            <div className={styles.buttonsBlock}>
                <Button onClick={handleClose} color="secondary" variant="contained">Cancel</Button>
                <Button onClick={addNewItem} color="secondary" variant="contained">Save</Button>
            </div>
        </div>

    );
};
