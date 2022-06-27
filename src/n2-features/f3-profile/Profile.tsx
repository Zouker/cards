import React from 'react';
import styles from "./Profile.module.css"



const Profile = () => {

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