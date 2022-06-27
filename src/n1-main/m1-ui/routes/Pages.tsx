import {Route, Routes} from 'react-router-dom';
import React from 'react';

export const Pages = () => {

    return (
        <Routes>
            <Route path={'/'} element={<Navigate to={'/login'}/>}/>
            <Route path={'/login'} element={<div>Login</div>}/>
            <Route path={'/register'} element={<div><Register/></div>}/>
            <Route path={'/profile'} element={<div>Profile</div>}/>
            <Route path={'/recover-password'} element={<div><RecoverPassword/></div>}/>
            <Route path={'/set-new-password/'}>
                <Route index element={<div><SetNewPassword/></div>}/>
                <Route path={':token'} element={<div><SetNewPassword/></div>}/>
            </Route>
            <Route path={'/test'} element={<div>Test</div>}/>
            <Route path={'/404'} element={<h1 style={{display: 'flex', justifyContent: 'center'}}>
                404: PAGE NOT FOUND
            </h1>}/>
            <Route path={'*'} element={<Navigate to={'404'}/>}/>
        </Routes>
    )
}