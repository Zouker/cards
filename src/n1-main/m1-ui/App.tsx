import React, {useEffect} from 'react';
import './App.css';
import {Header} from './header/Header';
import {Pages} from './routes/Routes';
import {HashRouter} from 'react-router-dom';
import {ErrorSnackbar} from './common/ErrorSnackbar/ErrorSnackbar';
import {Preloader} from './common/loader/Loader';
import {useAppDispatch, useAppSelector} from '../m2-bll/store';
import {authMeTC} from '../m2-bll/reducers/app-reducer';

const App = () => {
    const status = useAppSelector((state) => state.app.status)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authMeTC());
    }, [dispatch]);

    return (

        <div className="App">
            {status === 'loading' && <Preloader/>}
            <HashRouter>
                <Header/>
                <Pages/>
            </HashRouter>
            <ErrorSnackbar/>

        </div>
    );
}

export default App;
