import {Navigate, Route, Routes} from 'react-router-dom';
import React from 'react';
import {Register} from '../components/f2-register/Register';
import {RecoverPassword} from '../components/f4-recover-password/RecoverPassword';
import {SetNewPassword} from '../components/f5-enter-new-password/SetNewPassword';
import {Login} from '../components/f1-auth/Login';
import {Profile} from '../components/f3-profile/Profile';
import {Packs} from '../components/f6-packs/Packs';
import {Error404} from '../common/Error404/Error404';
import {Cards} from '../components/f7-cards/Cards';
import {CheckEmail} from '../components/f4-recover-password/CheckEmail';
import {LearnPage} from '../components/f8-learn/LearnPage';

export const Pages = () => {

    return (
        <Routes>
            <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/register'} element={<div><Register/></div>}/>
            <Route path={'/profile'} element={<Profile/>}/>
            <Route path={'/recover-password'} element={<div><RecoverPassword/></div>}/>
            <Route path={'/check-email/:email'} element={<div><CheckEmail/></div>}/>
            <Route path={'/set-new-password/'}>
                <Route index element={<div><SetNewPassword/></div>}/>
                <Route path={':token'} element={<div><SetNewPassword/></div>}/>
            </Route>
            <Route path={'/test'} element={<div>Test</div>}/>
            <Route path={'/packs'} element={<div><Packs/></div>}/>
            <Route path={'/cards/:packId'} element={<Cards/>}/>
            <Route path={'/learn/:packId'} element={<LearnPage/>}/>
            <Route path={'/404'} element={<div><Error404/></div>}/>
            <Route path={'*'} element={<Navigate to={'404'}/>}/>
        </Routes>
    )
}