import React, {useEffect} from 'react';
import './App.module.css';
import {Header} from './header/Header';
import {Pages} from './routes/Routes';
import {HashRouter} from 'react-router-dom';
import {ErrorSnackbar} from './common/ErrorSnackbar/ErrorSnackbar';
import {Preloader} from './common/loader/Loader';
import {useAppDispatch, useAppSelector} from '../m2-bll/store';
import {authMeTC} from '../m2-bll/reducers/app-reducer';
import styles from './App.module.css'

const App = () => {
    const status = useAppSelector((state) => state.app.status)
    const isInitialized = useAppSelector((state) => state.app.isInitialized)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authMeTC());
    }, [dispatch]);

    if (!isInitialized) {
        return <div className={styles.isInitialized}>
            <Preloader/>
        </div>
    }

    return (

        <div className="App">
            {status === 'loading' && <div className={styles.isInitialized}><Preloader/></div>}
            <HashRouter>
                <Header/>
                <Pages/>
            </HashRouter>
            <ErrorSnackbar/>

        </div>
    );
}

export default App;
