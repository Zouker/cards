import {NavLink} from 'react-router-dom';
import React from 'react';

export const Header = () => {

    return (
        <>
            <NavLink to={'/profile'}> Profile</NavLink> |
            <NavLink to={'/packs'}> Packs</NavLink>
        </>
    )
}