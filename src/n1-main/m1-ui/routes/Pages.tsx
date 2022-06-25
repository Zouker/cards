import {Route, Routes} from 'react-router-dom';
import React from 'react';
import {Login} from "../../../n2-features/fi-auth/Login";

export const Pages = () => {

    return (
        <Routes>
            <Route path={'/'} element={<div>Main</div>}></Route>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/register'} element={<div>Register</div>}></Route>
            <Route path={'/profile'} element={<div>Profile</div>}></Route>
            <Route path={'/error404'} element={<div>Error404</div>}></Route>
            <Route path={'/recoverPassword'} element={<div>Recover Password</div>}></Route>
            <Route path={'/enterNewPassword'} element={<div>Enter New Password</div>}></Route>
            <Route path={'/test'} element={<div>Test</div>}></Route>
        </Routes>
    )
}