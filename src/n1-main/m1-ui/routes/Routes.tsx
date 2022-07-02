import {Navigate, Route, Routes} from 'react-router-dom';
import React from 'react';
import {Register} from '../../../n2-features/f2-register/Register';
import {RecoverPassword} from '../../../n2-features/f4-recover-password/RecoverPassword';
import {SetNewPassword} from '../../../n2-features/f5-enter-new-password/SetNewPassword';
import {Login} from '../../../n2-features/f1-auth/Login';
import Profile from '../../../n2-features/f3-profile/Profile';
import {Packs} from '../../../n2-features/packs/Packs';

export const Pages = () => {

    return (
        <Routes>
            <Route path={'/'} element={<Navigate to={'/login'}/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/register'} element={<div><Register/></div>}/>
            <Route path={'/profile'} element={<Profile/>}/>
            <Route path={'/recover-password'} element={<div><RecoverPassword/></div>}/>
            <Route path={'/set-new-password/'}>
                <Route index element={<div><SetNewPassword/></div>}/>
                <Route path={':token'} element={<div><SetNewPassword/></div>}/>
            </Route>
            <Route path={'/test'} element={<div>Test</div>}/>
            <Route path={'/packs'} element={<div><Packs/></div>}/>
            <Route path={'/cards'} element={<div>Cards</div>}/>
            <Route path={'/404'} element={<h1 style={{display: 'flex', justifyContent: 'center'}}>
                404: PAGE NOT FOUND
            </h1>}/>
            <Route path={'*'} element={<Navigate to={'404'}/>}/>
        </Routes>
    )
}