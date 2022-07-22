import React, {useState} from 'react';
import styles from '../../styles/Authorization.module.css'
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {logoutTC} from '../../bll/reducers/auth-reducer';
import {Button, IconButton} from '@mui/material';
import {updateUserDataTC} from '../../bll/reducers/profile-reducer';
import {EditableSpan} from './EditableSpan';
import {InputTypeFile} from './InputTypeFile';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {Navbar} from '../../navbar/Navbar';

type ProfileType = {
    title?: string
    changeTitle?: (title: string) => void
    disabled?: boolean
    activateEditMode?: () => void
}

export const Profile: React.FC<ProfileType> = React.memo(({disabled}) => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const userName = useAppSelector(state => state.profile.name)
    const userAvatar = useAppSelector(state => state.profile.avatar)
    const userId = useAppSelector(state => state.profile._id)
    const email = useAppSelector(state => state.profile.email)
    const publicCardPacksCount = useAppSelector(state => state.profile.publicCardPacksCount)

    const [editMode, setEditMode] = useState<boolean>(false)

    const activateEditMode = () => {
        if (disabled) {
            return
        } else {
            setEditMode(true)
        }
    }

    const changeUserName = (name: string) => {
        dispatch(updateUserDataTC({name: name, avatar: userAvatar, _id: userId, publicCardPacksCount, email}))
    }

    const changeUserAvatar = (avatar: string) => {
        dispatch(updateUserDataTC({name: userName, avatar, _id: userId, publicCardPacksCount, email}))
    }

    const handleLogout = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div>
            <Navbar/>
            <div className={styles.wrapper}>
                <div className={styles.form}>
                    <span className={styles.title}>Profile Info</span>
                    <div className={styles.container}>
                        <InputTypeFile userAvatar={userAvatar} changeUserAvatar={changeUserAvatar}/>
                        <div className={styles.nickname}>
                            <EditableSpan
                                title={userName}
                                changeTitle={changeUserName}
                                editMode={editMode}
                                setEditMode={setEditMode}
                            />
                            <IconButton color={'secondary'}>
                                <BorderColorIcon onClick={activateEditMode}/>
                            </IconButton>
                        </div>
                        <div className={styles.cardPacksCount}>
                            <div><b>E-mail: </b>{email}</div>
                            <div><b>Card Packs: </b> {publicCardPacksCount}</div>
                        </div>
                    </div>
                    <Button color={'secondary'} variant={'contained'} onClick={handleLogout}>Logout</Button>
                </div>
            </div>
        </div>
    )
})


