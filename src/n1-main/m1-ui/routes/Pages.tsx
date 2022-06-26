import {Navigate, Route, Routes} from 'react-router-dom';
import React from 'react';
import {Register} from '../../../n2-features/f2-register/Register';
import {RecoverPassword} from '../../../n2-features/f4-recover-password/RecoverPassword';

export const Pages = () => {

    return (
        <Routes>
            <Route path={'/'} element={<Navigate to={'/login'}/>}/>
            <Route path={'/login'} element={<div>Login</div>}/>
            <Route path={'/register'} element={<div><Register/></div>}/>
            <Route path={'/profile'} element={<div>Profile</div>}/>
            <Route path={'*'} element={<Navigate to={'404'}/>}/>
            <Route path={'/404'} element={<h1 style={{display: 'flex', justifyContent: 'center'}}>
                404: PAGE NOT FOUND
            </h1>}/>
            <Route path={'/recoverPassword'} element={<div><RecoverPassword/></div>}/>
            <Route path={'/enterNewPassword'} element={<div>Enter New Password</div>}/>
            <Route path={'/test'} element={<div>Test</div>}/>
        </Routes>
    )
}