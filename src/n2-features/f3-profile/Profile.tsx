import React from 'react';
import styles from './Profile.module.css'
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../n1-main/m2-bll/store';
import {EditableSpan} from './EditableSpan';
import {logoutTC} from '../../n1-main/m2-bll/reducers/auth-reducer';
import {Button} from '@mui/material';
import {updateUserDataTC} from '../../n1-main/m2-bll/reducers/profile-reducer';

export const Profile = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const userName = useAppSelector(state => state.auth.userName)

    const changeUserName = (title: string) => {
        dispatch(updateUserDataTC({name: title, avatar: ''}))
    }
    const handleLogout = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.profile}>
                <span className={styles.title}>Profile Info</span>
                <div className={styles.img}>
                    <img
                        src={'https://acomics.ru/upload/avatar/id50526-vkixi31fmm.png'}
                        alt={'Profile Img'}/>
                    <div className={styles.titleWrap}>
                        <EditableSpan title={userName} changeTitle={changeUserName}/>
                    </div>
                </div>
                <Button variant={'contained'} onClick={handleLogout}>Logout</Button>
            </div>
        </div>


    )
}
