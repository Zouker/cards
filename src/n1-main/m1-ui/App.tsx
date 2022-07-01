import React, {useEffect} from 'react';
import './App.css';
import {Header} from './header/Header';
import {Pages} from './routes/Pages';
import {HashRouter} from 'react-router-dom';
import {ErrorSnackbar} from './common/ErrorSnackbar/ErrorSnackbar';
import {Preloader} from './common/loader/Loader';
import {useAppDispatch, useAppSelector} from '../m2-bll/store';
import {authMeTC, authReducer} from "../m2-bll/reducers/auth-reducer";

const App = () => {
    const status = useAppSelector((state) => state.app.status)
    const dispatch =useAppDispatch();

    useEffect(()=>{
        dispatch(authMeTC());
    },[]);

    return (

        <div className="App">
            <HashRouter>
                <Header/>
                <Pages/>
            </HashRouter>
            <ErrorSnackbar/>
            {status === 'loading' && <Preloader/>}
        </div>
    );
}

export default App;
