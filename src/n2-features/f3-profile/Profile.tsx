import React from 'react';
import styles from "./Profile.module.css"
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../n1-main/m2-bll/store";

import {EditableSpan} from "./EditableSpan";
import {logoutTC, updateUserDataTC} from "../../n1-main/m2-bll/reducers/auth-reducer";
import {Button, TextField} from "@mui/material";


const Profile = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLogin)
const userName = useAppSelector(state => state.auth.userName )

const changeUserName=(title:string)=>{
        dispatch(updateUserDataTC({name:title, avatar:''}))
}
const handleLogout=()=>{
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
                        src={"https://acomics.ru/upload/avatar/id50526-vkixi31fmm.png"}
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
export default Profile;

/*
<div className={styles.wrapper}>
    <div className={styles.profileImg}>
        <img
            src={"https://dthezntil550i.cloudfront.net/kg/latest/kg1802132010216500004834729/1280_960/557d644f-12f3-49e1-bb66-23c16400540d.png"}
            alt={'Profile Img'}/>
    </div>
    <SuperInputText value={nickName}
                    onChangeText={setNickName}/>
    <div>Cards count:</div>
    <button>Logout</button>
</div>*/
