import {NavLink} from 'react-router-dom';
import React from 'react';

export const Header = () => {

    return (
        <>
            <NavLink to={'/login'}> Login</NavLink> |
            <NavLink to={'/register'}> Register</NavLink> |
            <NavLink to={'/profile'}> Profile</NavLink> |
            <NavLink to={'/404'}> Error404</NavLink> |
            <NavLink to={'/recoverPassword'}> Recover Password</NavLink> |
            <NavLink to={'/enterNewPassword'}> Enter New Password</NavLink> |
            <NavLink to={'/test'}> Test</NavLink>
        </>
    )
}