import React from 'react';
import styles from "./DeleteItemModal.module.css";
import {Button, TextField} from "@mui/material";


type DeleteItemPropsType = {
    handleClose: () => void
    handleDelete: (packId: string) => void
    title: string
    handleOpen: () => void
    id: string

}

export const DeleteItem: React.FC<DeleteItemPropsType> = ({handleClose, handleDelete, title, id}) => {

    return (
        <div>
            <div className={styles.title}>
                {title}
            </div>
            <TextField className={styles.deleteItemField} id="standard-basic" variant="standard"
                       color="secondary"/>


            <div className={styles.buttonsBlock}>
                <Button onClick={handleClose} color="secondary" variant="contained">Cancel</Button>
                <Button onClick={() => handleDelete(id)} color="secondary" variant="contained">Confirm</Button>
            </div>
        </div>
    );
};


