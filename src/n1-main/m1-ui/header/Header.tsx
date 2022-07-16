import {NavLink} from 'react-router-dom';
import React from 'react';

export const Header = () => {

    return (
        <>
            <NavLink to={'/profile'}> Profile</NavLink> |
            <NavLink to={'/set-new-password'}> Set New Password</NavLink> |
            <NavLink to={'/packs'}> Packs</NavLink> |
            <NavLink to={'/cards'}> Cards</NavLink>
        </>
    )
}