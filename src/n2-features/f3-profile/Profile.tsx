import React from 'react';
import styles from "./Profile.module.css"
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../n1-main/m2-bll/store";



const Profile = () => {
    const dispatch = useAppDispatch()
    const isRegistered = useAppSelector(state => state.register.isRegistered)
    if (!isRegistered) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.profileImg}>
                <img
                    src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/10.png"}
                    alt={'Profile Img'}/>
            </div>
            <div>Name: </div>
            <div>Cards count: </div>
        <button>Logout</button>
        </div>

    );
};

export default Profile;