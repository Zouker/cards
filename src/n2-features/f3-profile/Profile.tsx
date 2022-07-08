import React, {useState} from 'react';
import styles from './Profile.module.css'
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../n1-main/m2-bll/store';
import {logoutTC} from '../../n1-main/m2-bll/reducers/auth-reducer';
import {Button} from '@mui/material';
import {updateUserDataTC} from '../../n1-main/m2-bll/reducers/profile-reducer';
import {EditableSpan} from './EditableSpan';

export const Profile = () => {
    const [avatarEditMode, setAvatarEditMode] = useState(false)
    const [avatar, setAvatar] = useState<string>('')
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const userName = useAppSelector(state => state.profile.name)
    const userAvatar = useAppSelector(state => state.profile.avatar)
    const userId = useAppSelector(state => state.profile._id)
    const publicCardPacksCount = useAppSelector(state => state.profile.publicCardPacksCount)

    const changeUserName = (title: string) => {
        dispatch(updateUserDataTC({name: title, avatar: userAvatar, _id: userId, publicCardPacksCount}))
    }

    const changeUserAvatar = () => {
        if (avatar !== '') {
            dispatch(updateUserDataTC({name: userName, avatar, _id: userId, publicCardPacksCount}))
        }
        setAvatarEditMode(false)
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
                    <div className={styles.avatar}>
                        {
                            avatarEditMode
                                ? <input className={styles.avatarInput}
                                         onChange={(e) => {
                                             setAvatar(e.currentTarget.value)
                                         }}
                                         autoFocus
                                         placeholder={'Enter url for avatar'}
                                         onBlur={changeUserAvatar}/>

                                : <img
                                    onDoubleClick={() => setAvatarEditMode(true)}
                                    src={userAvatar}
                                    alt="avatar"
                                    className={styles.avatar}
                                />
                        }
                    </div>
                    <div className={styles.nickname}>
                        <EditableSpan title={userName} changeTitle={changeUserName}/>
                    </div>
                </div>
                <Button color={'secondary'} variant={'contained'} onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    )
}
