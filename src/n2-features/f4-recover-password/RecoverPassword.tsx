import React, {ChangeEvent, useState} from 'react';
import styles from '../f4-recover-password/RecoverPassword.module.css';
import {Button, TextField} from '@mui/material';
import {Link} from 'react-router-dom';
import {recoverTC} from '../../n1-main/m2-bll/reducers/recover-password-reducer';
import {useAppDispatch} from '../../n1-main/m2-bll/store';

export const RecoverPassword = () => {
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState('')

    const emailEnter = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const emailSend = () => {
        dispatch(recoverTC(email))
        setEmail('')
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <div className={styles.title}>Forgot your password?</div>
                <TextField
                    type="email"
                    className={styles.input}
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={emailEnter}
                />
                <div className={styles.instructions}>Enter your email address and we will send you further
                    instructions
                </div>
                <Button variant={'contained'} onClick={emailSend}>Send Instructions</Button>
                Did you remember your password?
                <Link to={'/login'}>Try logging in</Link>
            </div>
        </div>
    );
};