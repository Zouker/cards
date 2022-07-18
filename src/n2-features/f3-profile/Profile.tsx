import React from 'react';
import styles from './Profile.module.css'
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../n1-main/m2-bll/store';
import {logoutTC} from '../../n1-main/m2-bll/reducers/auth-reducer';
import {Button, IconButton} from '@mui/material';
import {updateUserDataTC} from '../../n1-main/m2-bll/reducers/profile-reducer';
import {EditableSpan} from './EditableSpan';
import {InputTypeFile} from './InputTypeFile';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export const Profile = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const userName = useAppSelector(state => state.profile.name)
    const userAvatar = useAppSelector(state => state.profile.avatar)
    const userId = useAppSelector(state => state.profile._id)
    const publicCardPacksCount = useAppSelector(state => state.profile.publicCardPacksCount)

    const changeUserName = (name: string) => {
        dispatch(updateUserDataTC({name: name, avatar: userAvatar, _id: userId, publicCardPacksCount}))
    }

    const changeUser = () => {

    }

    const changeUserAvatar = (avatar: string) => {
        dispatch(updateUserDataTC({name: userName, avatar, _id: userId, publicCardPacksCount}))
    }

    const handleLogout = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <span className={styles.title}>Profile Info</span>
                <div className={styles.container}>
                    <InputTypeFile userAvatar={userAvatar} changeUserAvatar={changeUserAvatar}/>
                    <div className={styles.nickname}>
                        <EditableSpan title={userName} changeTitle={changeUserName}/>
                        <IconButton color={'secondary'}>
                            <BorderColorIcon onClick={changeUser}/>
                        </IconButton>
                    </div>

                    <div className={styles.cardPacksCount}>
                        Card Packs: {publicCardPacksCount}
                    </div>
                </div>
                <Button color={'secondary'} variant={'contained'} onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    )
}
export default Profile;


