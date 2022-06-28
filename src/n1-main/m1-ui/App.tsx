import React from 'react';
import './App.css';
import {Header} from './header/Header';
import {Pages} from './routes/Pages';
import {HashRouter} from 'react-router-dom';
import {ErrorSnackbar} from './common/ErrorSnackbar/ErrorSnackbar';
import {Preloader} from './common/loader/Loader';
import {useAppSelector} from '../m2-bll/store';

const App = () => {
    const status = useAppSelector((state) => state.app.status)

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
