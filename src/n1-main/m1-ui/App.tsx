import React from 'react';
import './App.css';
import {Header} from './header/Header';
import {Pages} from './routes/Pages';
import {HashRouter} from 'react-router-dom';
import {ErrorSnackbar} from './common/ErrorSnackbar/ErrorSnackbar';

const App = () => {
    return (
        <div className="App">
            <HashRouter>
                <Header/>
                <Pages/>
            </HashRouter>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;
